import os
import glob
import re
import shutil

weekly_files = glob.glob('src/content/weekly/*.md')
posts_dir = 'src/content/posts'

if not os.path.exists(posts_dir):
    os.makedirs(posts_dir)

for file in weekly_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove issueNumber
    content = re.sub(r'^issueNumber:.*?\n', '', content, flags=re.MULTILINE)
    
    # Add category: "Others" if not exists
    if not re.search(r'^category:.*?\n', content, flags=re.MULTILINE):
        # Insert category after title or date
        content = re.sub(r'^(date:.*?)\n', r'\1\ncategory: "Others"\n', content, flags=re.MULTILINE)
    
    filename = os.path.basename(file)
    new_path = os.path.join(posts_dir, f'weekly-{filename}')
    
    with open(new_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    os.remove(file)

print("Weekly files moved and updated successfully.")
