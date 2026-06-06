import os
import glob
import re
from datetime import datetime, timedelta

# 获取所有杂项文章，也就是 category 为 "Others" 的文章
post_files = glob.glob('src/content/posts/*.md')

others_files = []

for file in post_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        if re.search(r'category:\s*["\']?Others["\']?', content):
            # 获取原先的日期
            date_match = re.search(r'^date:\s*["\']?(.*?)["\']?$', content, flags=re.MULTILINE)
            old_date = date_match.group(1) if date_match else "2025-01-01"
            others_files.append((file, old_date, content))

# 按原先的日期排序
others_files.sort(key=lambda x: x[1])

# 从 2025年12月1日开始，每隔一周排一篇，或者就保持在2025年到2026年之间分布
start_date = datetime(2025, 12, 1)

for i, (file, old_date, content) in enumerate(others_files):
    new_date = (start_date + timedelta(days=7*i)).strftime('%Y-%m-%d')
    
    # 替换日期
    content = re.sub(r'^(date:\s*["\']?).*?(["\']?)$', rf'\g<1>{new_date}\g<2>', content, flags=re.MULTILINE)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Re-arranged timeline for {len(others_files)} posts.")
