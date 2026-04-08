import re
from pathlib import Path

def process_file(src_dir, dst_path, title, description, tags, date_str, signature):
    # Find the target file by globbing since the filename is long and has special chars
    files = list(Path(src_dir).glob('*Complete Chronicle*'))
    if not files:
        print("Error: Target file not found.")
        return
    src_path = files[0]
    
    text = src_path.read_text(encoding="utf-8")
    
    # 移除开头的标题 `# ...`
    text = re.sub(r'^#\s+.*?\n+', '', text)
    
    # 替换 Obsidian 特有的公式块 \[ \] 为 $$ $$ 和 \( \) 为 $ $
    text = re.sub(r'\\\[(.*?)\\\]', r'$$\1$$', text, flags=re.DOTALL)
    text = re.sub(r'\\\((.*?)\\\)', r'$\1$', text)
    
    # 添加 Frontmatter
    fm = f"""---
title: "{title}"
date: "{date_str}"
category: "Logic"
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
src_dir = r"E:\关系动力学\Pro"
dst = root / "src" / "content" / "posts" / "hilberts-tenth-problem-complete-chronicle.md"

sig = "二〇二六年三月良之写于羊城云汐谷"
tags = ["Hilbert's Tenth Problem", "Logic", "Diophantine Equations", "Computability", "Mathematics"]
desc = "A Complete Chronicle, Modern Proofs, and the Open Frontier: From the Entscheidungsproblem to the Undecidability of All Finitely Generated Rings."
title = "Hilbert’s Tenth Problem: From the Entscheidungsproblem to the Undecidability of All Finitely Generated Rings"

process_file(src_dir, dst, title, desc, tags, "2026-03-01", sig)
