import os
import glob
import re

weekly_files = glob.glob('src/content/posts/weekly-issue-*.md')

# Sort files by the original issue number in the filename so we can space them out sequentially
def extract_issue_num(filename):
    match = re.search(r'weekly-issue-(\d+)\.md', filename)
    return int(match.group(1)) if match else 0

weekly_files.sort(key=extract_issue_num)

# "重新安排时间线"
# I'll assign dates from Jan 2025 onwards, one every week or so.
# Issue 1 -> 2025-01-01
# Issue 2 -> 2025-01-08, etc.
# Or better, just keep their dates but make sure they don't overlap awkwardly with current ones.
# Actually, the user says "删除杂项标题中的“周刊第x期”，重新安排博客文章的时间线"
# Maybe they just mean re-arranging the dates of these 16 weekly files so they spread out nicely?
# Or maybe renaming the files to not have "weekly-issue-" in the name.
# Let's rename the files first so they just look like normal posts, and their dates can be preserved or slightly adjusted.

import shutil

for file in weekly_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract title to use as slug
    title_match = re.search(r'^title:\s*["\']?(.*?)["\']?$', content, flags=re.MULTILINE)
    title = title_match.group(1) if title_match else "post"
    
    # Simple slugify
    slug = re.sub(r'[^\w\s-]', '', title).strip().lower()
    slug = re.sub(r'[\s_-]+', '-', slug)
    if not slug:
        slug = f"misc-post-{extract_issue_num(file)}"
    
    new_path = os.path.join('src/content/posts', f"{slug}.md")
    
    # Ensure no duplicates
    counter = 1
    while os.path.exists(new_path):
        new_path = os.path.join('src/content/posts', f"{slug}-{counter}.md")
        counter += 1
        
    shutil.move(file, new_path)

print("Renamed files and removed weekly prefixes from filenames.")
