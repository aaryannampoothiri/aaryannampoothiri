import sys

def count_tags(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    tags = {
        'div': 0,
        'section': 0,
        'main': 0,
        'header': 0,
        'nav': 0,
        'footer': 0,
        'aside': 0,
        'button': 0,
        'span': 0,
        'h1': 0,
        'h2': 0,
        'h3': 0,
        'h4': 0,
        'p': 0,
        'a': 0,
        'img': 0,
    }
    
    import re
    # Simplified tag counting
    for tag in tags.keys():
        open_tags = len(re.findall(rf'<{tag}[^>]*>', content))
        close_tags = len(re.findall(rf'</{tag}>', content))
        tags[tag] = open_tags - close_tags
        print(f"{tag}: {open_tags} open, {close_tags} close (Delta: {tags[tag]})")

if __name__ == "__main__":
    count_tags(sys.argv[1])
