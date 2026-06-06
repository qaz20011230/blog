import re
from pathlib import Path

def process_file(src_path, dst_path, title, description, tags, date_str, signature):
    text = src_path.read_text(encoding="utf-8")
    
    # 移除文件开头的 `# 标题`
    text = re.sub(r'^#\s+.*?\n+', '', text)
    
    # 移除全文完的标记
    text = re.sub(r'\n*\*\*[（\(]全文完[）\)]\*\*', '', text)
    text = re.sub(r'\n*[（\(]全文完[）\)]', '', text)
    
    # 添加 Frontmatter
    fm = f"""---
title: "{title}"
date: "{date_str}"
category: "Philosophy"
tags:
"""
    for tag in tags:
        fm += f"  - {tag}\n"
    fm += f"""description: "{description}"
---

"""
    # 组合 Frontmatter 和正文，去除原有结尾空白，添加落款
    final_text = fm + text.strip() + f"\n\n---\n\n*{signature}*\n"
    
    dst_path.write_text(final_text, encoding="utf-8")
    print(f"Saved: {dst_path.name}")

root = Path(r"E:\AI\liang.world")
src = Path(r"E:\关系动力学\Pro\关系的遗忘与回归（下）.md")
dst = root / "src" / "content" / "posts" / "relational-oblivion-and-return-part-3.md"

sig = "良之写于羊城云汐谷"
tags = ["关系动力学", "哲学史", "本体论", "当代异化"]
desc = "本文为《关系的遗忘与回归》下篇，深入诊断西方哲学两千年来对关系保持沉默的形而上学根源，剖析当代技术社会中关系被算法量化所导致的深刻异化，并最终提出“关系动力学”作为回应的理论纲领。"

process_file(src, dst, "关系的遗忘与回归：西方哲学史的一次诊断性重构（下）", desc, tags, "2026-04-09", sig)
