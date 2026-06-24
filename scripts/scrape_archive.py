import os
import re
import json
import urllib.request
from bs4 import BeautifulSoup
from datetime import datetime

# Setup headers to bypass user-agent blocks
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def clean_archive_url(url):
    """Remove Wayback Machine prefix from URLs if present."""
    if not url:
        return ""
    # Matches patterns like https://web.archive.org/web/20260121184655/https://www.vozdebrasilia.com.br/...
    match = re.search(r'https?://web\.archive\.org/web/\d+/(https?://.*)', url)
    if match:
        return match.group(1)
    return url

def fetch_soup(url):
    """Fetch URL and return BeautifulSoup object."""
    print(f"Fetching: {url}")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read()
            return BeautifulSoup(html, 'html.parser')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def extract_article_urls():
    """Scrape article URLs from root and category pages on Wayback Machine."""
    seed_urls = [
        'https://web.archive.org/web/20260121184655/https://www.vozdebrasilia.com.br/',
        'https://web.archive.org/web/20260121184655/https://www.vozdebrasilia.com.br/category/entrevista/'
    ]
    
    article_urls = set()
    
    for seed in seed_urls:
        soup = fetch_soup(seed)
        if not soup:
            continue
            
        for a in soup.find_all('a'):
            href = a.get('href', '')
            if not href:
                continue
                
            # Filter out non-article links
            # We want links that contain vozdebrasilia.com.br/something-slug-here/
            # Exclude contacts, category pages, tags, author, feed, about-us, services etc.
            clean_href = clean_archive_url(href)
            
            # Pattern check: must be a direct child subpage of vozdebrasilia.com.br
            # example: https://www.vozdebrasilia.com.br/slug-name/
            # but not: category/, tag/, author/, page/, feed/
            if 'vozdebrasilia.com.br' in clean_href:
                parts = [p for p in clean_href.replace('https://', '').replace('http://', '').split('/') if p]
                if len(parts) == 2:  # domain and slug
                    slug = parts[1]
                    # Exclude typical WordPress page routes
                    if slug not in ['contato', 'sobre-nos', 'servicos', 'publicacoes', 'category', 'tag', 'author', 'feed', 'search']:
                        article_urls.add(href)
                        
    return list(article_urls)

def scrape_article(url):
    """Scrape title, content, image, date, and category from a single article page."""
    soup = fetch_soup(url)
    if not soup:
        return None
        
    # Strip archive.org elements
    for s in soup(['script', 'style']):
        s.decompose()
    for wm in soup.find_all(id=lambda x: x and x.startswith('wm')):
        wm.decompose()
        
    # 1. Title
    title_el = soup.find('h1')
    if not title_el:
        title_el = soup.find(class_='entry-title')
    title = title_el.get_text(strip=True) if title_el else "Sem título"
    
    # 2. Slug
    clean_url = clean_archive_url(url)
    parts = [p for p in clean_url.replace('https://', '').replace('http://', '').split('/') if p]
    slug = parts[-1] if parts else title.lower().replace(' ', '-')
    
    # 3. Content
    content_el = soup.find(class_='entry-content') or soup.find(class_='post-content') or soup.find('article')
    if not content_el:
        return None
        
    # Clean links in content from Wayback Machine prefix
    for a in content_el.find_all('a'):
        a['href'] = clean_archive_url(a.get('href', ''))
    for img in content_el.find_all('img'):
        img_src = img.get('src', '')
        # Clean image source url
        img['src'] = clean_archive_url(img_src)
        
    content_html = str(content_el)
    content_text = content_el.get_text(strip=True)
    excerpt = content_text[:300] + "..." if len(content_text) > 300 else content_text
    
    # 4. Featured Image
    featured_image = ""
    # Try finding main thumbnail
    thumb_img = soup.select_one('.post-thumbnail img, .wp-post-image, img[class*="wp-image"]')
    if thumb_img:
        featured_image = clean_archive_url(thumb_img.get('src', ''))
    else:
        # Fallback to first image in content
        first_img = content_el.find('img')
        if first_img:
            featured_image = clean_archive_url(first_img.get('src', ''))
            
    # Default fallback placeholder image
    if not featured_image:
        featured_image = 'https://images.unsplash.com/photo-1495020689067-958852a6565d?w=800&auto=format&fit=crop&q=80'
        
    # 5. Category
    category = "Distrito Federal"
    category_slug = "distrito-federal"
    category_color = "bg-blue-600"
    
    # Check if 'entrevista' is in URL or page text
    if 'entrevista' in clean_url or 'entrevista' in slug or 'entrevista' in title.lower():
        category = "Entrevistas"
        category_slug = "entrevistas"
        category_color = "bg-purple-600"
    else:
        # Try finding category elements
        cat_links = soup.select('.cat-links a, .meta-category a')
        for cat_link in cat_links:
            cat_name = cat_link.get_text(strip=True)
            if cat_name:
                category = cat_name
                # Map standard ones
                name_lower = category.lower()
                if 'polít' in name_lower or 'polit' in name_lower:
                    category = "Política"
                    category_slug = "politica"
                    category_color = "bg-red-600"
                elif 'turis' in name_lower:
                    category = "Turismo"
                    category_slug = "turismo"
                    category_color = "bg-green-600"
                elif 'saúd' in name_lower or 'saud' in name_lower:
                    category = "Saúde"
                    category_slug = "saude"
                    category_color = "bg-purple-600"
                elif 'tecno' in name_lower:
                    category = "Tecnologia"
                    category_slug = "tecnologia"
                    category_color = "bg-blue-500"
                elif 'espor' in name_lower:
                    category = "Esportes"
                    category_slug = "esportes"
                    category_color = "bg-orange-600"
                elif 'econ' in name_lower:
                    category = "Economia"
                    category_slug = "economia"
                    category_color = "bg-yellow-600"
                elif 'ambie' in name_lower:
                    category = "Meio Ambiente"
                    category_slug = "meio-ambiente"
                    category_color = "bg-green-700"
                elif 'inter' in name_lower or 'mundo' in name_lower:
                    category = "Internacional"
                    category_slug = "internacional"
                    category_color = "bg-indigo-600"
                break
                
    # 6. Published Date
    published_at = "2026-01-21T18:46:55"
    time_el = soup.find('time')
    if time_el and time_el.get('datetime'):
        published_at = time_el.get('datetime')
    else:
        # Try parsing from text or class
        entry_date = soup.select_one('.entry-date, .published')
        if entry_date:
            published_at = entry_date.get_text(strip=True)
            
    # Normalize ISO format date if possible
    # We want ISO format: YYYY-MM-DDTHH:MM:SS
    if 'T' not in published_at:
        published_at = "2026-01-21T18:46:55"
        
    return {
        "id": str(hash(slug) % 100000),
        "title": title,
        "slug": slug,
        "content": content_html,
        "excerpt": excerpt,
        "category": category,
        "categorySlug": category_slug,
        "categoryColor": category_color,
        "featured_image": featured_image,
        "author": "Voz de Brasília",
        "tags": [],
        "status": "published",
        "views": int(100 + (hash(slug) % 2000)),
        "published_at": published_at,
        "created_at": published_at,
        "updated_at": published_at
    }

def main():
    print("Iniciando varredura do arquivo do site Voz de Brasília...")
    
    # 1. Collect article URLs
    urls = extract_article_urls()
    print(f"Encontrados {len(urls)} links de artigos no arquivo.")
    
    # 2. Scrape each article
    scraped_posts = []
    for idx, url in enumerate(urls):
        print(f"[{idx+1}/{len(urls)}] Raspando dados...")
        post = scrape_article(url)
        if post:
            scraped_posts.append(post)
            print(f"Sucesso: {post['title']}")
            
    print(f"Raspagem concluída. Total de posts raspados com sucesso: {len(scraped_posts)}")
    
    # 3. Read existing news.json
    news_file_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'news.json')
    existing_news = []
    if os.path.exists(news_file_path):
        try:
            with open(news_file_path, 'r', encoding='utf-8') as f:
                existing_news = json.load(f)
            print(f"Carregados {len(existing_news)} posts existentes de news.json.")
        except Exception as e:
            print(f"Erro ao ler news.json existente: {e}")
            
    # Create dict map by slug to merge avoiding duplicates
    news_map = {post['slug']: post for post in existing_news}
    
    # Add scraped posts to map (overwriting or adding new ones)
    new_added = 0
    for post in scraped_posts:
        if post['slug'] not in news_map:
            news_map[post['slug']] = post
            new_added += 1
        else:
            # Overwrite content but keep views and custom configurations
            existing = news_map[post['slug']]
            existing['content'] = post['content']
            existing['title'] = post['title']
            existing['featured_image'] = post['featured_image']
            existing['category'] = post['category']
            existing['categorySlug'] = post['categorySlug']
            existing['categoryColor'] = post['categoryColor']
            
    merged_news = list(news_map.values())
    
    # Sort merged news by published date descending
    def get_published_time(post):
        try:
            return datetime.fromisoformat(post.get('published_at', '2026-01-21T18:46:55'))
        except:
            return datetime.min

    merged_news.sort(key=get_published_time, reverse=True)
    
    # 4. Save merged posts to news.json
    with open(news_file_path, 'w', encoding='utf-8') as f:
        json.dump(merged_news, f, ensure_ascii=False, indent=2)
        
    print(f"Sucesso! {new_added} novos posts adicionados. Total de posts em news.json: {len(merged_news)}")

if __name__ == '__main__':
    main()
