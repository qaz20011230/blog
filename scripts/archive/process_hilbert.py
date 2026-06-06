import re
from pathlib import Path

def process_file(src_path, dst_path, title, description, tags, date_str, signature):
    text = src_path.read_text(encoding="utf-8")
    
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
# Find the specific file
src_dir = Path(r"E:\关系动力学\Pro")
src = list(src_dir.glob('*Hilbert*'))[0]

dst = root / "src" / "content" / "posts" / "hilberts-tenth-problem-overview.md"

sig = "二〇二六年四月良之写于羊城云汐谷"
tags = ["Hilbert's Tenth Problem", "Diophantine Equations", "Computability", "Mathematics"]
desc = "A definitive mathematical survey and theoretical framework of Hilbert's Tenth Problem, from Paris to Computability, the MRDP Theorem, and the latest breakthroughs over finitely generated rings."

process_file(src, dst, "Hilbert’s Tenth Problem Overview", desc, tags, "2026-01-01", sig)
