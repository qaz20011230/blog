import re
from pathlib import Path
from datetime import datetime

def clean_markdown(text):
    # Replace \[ ... \] with $$ ... $$
    text = re.sub(r'\\\[(.*?)\\\]', r'$$\1$$', text, flags=re.DOTALL)
    # Replace \( ... \) with $ ... $
    text = re.sub(r'\\\((.*?)\\\)', r'$\1$', text)
    return text

def add_frontmatter(text, title, description, tags, date_str):
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
    return fm + text

root = Path(r"E:\AI\liang.world")
src1 = root / "_imports" / "riemann_part1.md"
src2 = root / "_imports" / "riemann_part2.md"

out1 = root / "src" / "content" / "posts" / "21st-century-riemann-hypothesis-research-blueprint-computable-paths-arithmetic-inequalities.md"
out2 = root / "src" / "content" / "posts" / "21st-century-riemann-hypothesis-research-blueprint-analytic-constants-spectral-metamathematics.md"

date_str = datetime.now().strftime("%Y-%m-%d")

# Process Part 1
text1 = src1.read_text(encoding="utf-8")
text1 = clean_markdown(text1)
fm1 = add_frontmatter(
    text1, 
    "21世纪黎曼猜想研究蓝图：可计算路径与算术不等式攻势", 
    "梳理黎曼猜想的等价条件，评估Π₁⁰算术不等式（如Robin准则）的计算可行性，并提出一个分布式验证的十年研究计划。", 
    ["黎曼猜想", "数论", "计算理论", "算法"], 
    date_str
)
out1.write_text(fm1, encoding="utf-8")

# Process Part 2
text2 = src2.read_text(encoding="utf-8")
text2 = clean_markdown(text2)
fm2 = add_frontmatter(
    text2, 
    "21世纪黎曼猜想研究蓝图：解析常数、谱与元数学的幽深之境", 
    "深入探讨黎曼猜想的非计算等价条件，包括de Bruijn–Newman常数、Hilbert–Pólya谱理论、丢番图表示及元数学的逻辑独立性问题。", 
    ["黎曼猜想", "数论", "元数学", "谱理论"], 
    date_str
)
out2.write_text(fm2, encoding="utf-8")

print("Successfully processed and saved both files.")
