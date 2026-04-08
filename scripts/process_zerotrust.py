import re
from pathlib import Path

def anonymize_text(text):
    # Remove identifiable info
    text = re.sub(r'\*\*项目编号\*\*：.*?\n', '', text)
    text = re.sub(r'\*\*依托单位\*\*：.*?\n', '', text)
    text = re.sub(r'\*\*研究周期\*\*：.*?\n', '', text)
    text = re.sub(r'\*\*论文类型\*\*：.*?\n', '', text)
    
    text = re.sub(r'中国人民公安大学', '某高校', text)
    text = re.sub(r'PPSUC', 'XXX', text)
    text = re.sub(r'李昂_基于SICAS', '某作者_基于SICAS', text) # just in case
    
    # Remove appendix B (Ethics approval scan)
    text = re.sub(r'## 附录B：伦理审批件扫描件\n\n> \*\*\[预留位置：某高校伦理委员会审批件扫描件\]\*\*\n>\n> 审批号：XXX-IRB-2025-ZT-017\n> 审批日期：2025年3月15日\n> 有效期：2025年3月15日—2027年10月31日\n\n', '', text)
    
    # Remove appendix D (Budget)
    budget_pattern = r'## 附录D：经费预算表\n\n> \*\*表D-1 项目经费预算表（申请总额：48\.5万元）\*\*.*?\n\n'
    text = re.sub(budget_pattern, '', text, flags=re.DOTALL)
    
    # Remove blockquotes prefix from tables to ensure perfect formatting
    # Find blockquoted tables and remove the '> ' prefix
    lines = text.split('\n')
    new_lines = []
    in_table = False
    for line in lines:
        if re.match(r'^>\s*\|.*\|.*', line):
            new_lines.append(line.lstrip('> ').strip())
        elif re.match(r'^>\s*\*\*表.*', line):
            new_lines.append(line.lstrip('> ').strip())
        else:
            new_lines.append(line)
    text = '\n'.join(new_lines)
    
    return text

def process_file(src_path, dst_path, title, description, tags, date_str, signature):
    text = src_path.read_text(encoding="utf-8")
    
    # 移除文件开头的 `# 标题`
    text = re.sub(r'^#\s+.*?\n+', '', text)
    
    text = anonymize_text(text)
    
    # Replace \[ with $$ if there's any
    text = re.sub(r'\\\[(.*?)\\\]', r'$$\1$$', text, flags=re.DOTALL)
    text = re.sub(r'\\\((.*?)\\\)', r'$\1$', text)
    
    # 添加 Frontmatter
    fm = f"""---
title: "{title}"
date: "{date_str}"
category: "Ecommerce"
tags:
"""
    for tag in tags:
        fm += f"  - {tag}\n"
    fm += f"""description: "{description}"
---

"""
    # 组合 Frontmatter 和正文，添加落款
    final_text = fm + text.strip() + f"\n\n---\n\n*{signature}*\n"
    
    dst_path.write_text(final_text, encoding="utf-8")
    print(f"Saved: {dst_path.name}")

root = Path(r"E:\AI\liang.world")
src = list(Path(r"E:\关系动力学\Pro").glob('*基于零信任*'))[0]
dst = root / "src" / "content" / "posts" / "zero-trust-identity-authentication-robustness.md"

sig = "二〇二六年五月良之写于羊城云汐谷"
tags = ["零信任架构", "数字身份", "身份认证", "网络安全", "受控实验"]
desc = "本文在零信任假设下构建受控实验平台，量化评估现行身份认证链路抵御系统性内部伪造的鲁棒性阈值，揭示内部威胁对跨系统身份链的脆弱性影响。"
title = "基于零信任假设的身份认证链路鲁棒性研究——以模拟数字身份全生命周期为受控实验"

process_file(src, dst, title, desc, tags, "2026-05-01", sig)
