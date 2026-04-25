import os
import glob
import re

weekly_files = glob.glob('src/content/posts/weekly-issue-*.md')

for file in weekly_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 匹配类似于 title: 周刊第X期：XXXX 或 title: "周刊第X期：XXXX"
    # 并将其替换为 title: XXXX 或 title: "XXXX"
    
    # 首先处理带引号的情况
    content = re.sub(r'^(title:\s*["\'])周刊第\d+期[：|:]\s*(.*?["\'])$', r'\1\2', content, flags=re.MULTILINE)
    # 再处理不带引号的情况
    content = re.sub(r'^(title:\s*)周刊第\d+期[：|:]\s*(.*?)$', r'\1\2', content, flags=re.MULTILINE)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Processed {len(weekly_files)} weekly files.")
