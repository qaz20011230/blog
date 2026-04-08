import re
from pathlib import Path

def process_file(src_path, dst_path, title, description, tags, date_str, signature):
    text = src_path.read_text(encoding="utf-8")
    
    # 移除文件开头的 `# 标题`，因为我们会用 frontmatter
    text = re.sub(r'^#\s+.*?\n+', '', text)
    
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
src1 = Path(r"E:\关系动力学\Pro\关系的遗忘与回归（上）.md")
src2 = Path(r"E:\关系动力学\Pro\关系的遗忘与回归（中）.md")

dst1 = root / "src" / "content" / "posts" / "relational-oblivion-and-return-part-1.md"
dst2 = root / "src" / "content" / "posts" / "relational-oblivion-and-return-part-2.md"

sig = "良之写于羊城云汐谷"
tags = ["关系动力学", "哲学史", "本体论", "现象学"]

desc1 = "西方哲学追问“存在”两千余年，却系统性地遗忘了“之间”。本文通过思想史的诊断性考察，揭示实体中心论如何塑造了我们对自我、他人与世界的理解，并追问通往关系动力学的道路。"
process_file(src1, dst1, "关系的遗忘与回归：西方哲学史的一次诊断性重构（上）", desc1, tags, "2026-04-07", sig)

desc2 = "现象学运动是西方哲学对关系的第一声呼唤。本篇追踪胡塞尔、海德格尔、萨特与梅洛-庞蒂的思想轨迹，探讨他们在突破实体形而上学、走向关系本体论过程中的贡献与内在张力。"
process_file(src2, dst2, "关系的遗忘与回归：西方哲学史的一次诊断性重构（中）", desc2, tags, "2026-04-08", sig)
