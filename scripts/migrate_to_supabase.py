import json
import urllib.request
import urllib.error

SUPABASE_URL = "https://fxpaswfhrwynwvfpiixa.supabase.co"
SUPABASE_KEY = "sb_publishable_o3lfNgVcusuenKvYe0YEOg_GZAAjfto"

def migrate():
    try:
        with open("public/data/news.json", "r", encoding="utf-8") as f:
            news_list = json.load(f)
    except Exception as e:
        print("Error reading news.json:", e)
        return

    print(f"Loaded {len(news_list)} news items from news.json.")

    # Format items for Supabase news table (using lowercase for PostgreSQL column names)
    supabase_data = []
    for item in news_list:
        category_slug = item.get("categorySlug", "distrito-federal")
        category_colors = {
            'Política': 'bg-red-600',
            'Distrito Federal': 'bg-blue-600',
            'Turismo': 'bg-green-600',
            'Saúde': 'bg-purple-600',
            'Tecnologia': 'bg-blue-500',
            'Esportes': 'bg-orange-600',
            'Economia': 'bg-yellow-600',
            'Meio Ambiente': 'bg-green-700',
            'Internacional': 'bg-indigo-600'
        }
        category_color = category_colors.get(item.get("category", "Distrito Federal"), "bg-blue-600")

        post_data = {
            "title": item.get("title", ""),
            "slug": item.get("slug", ""),
            "content": item.get("content", ""),
            "excerpt": item.get("excerpt", ""),
            "category": item.get("category", "Distrito Federal"),
            "categoryslug": category_slug,
            "categorycolor": category_color,
            "featured_image": item.get("featured_image", ""),
            "author": item.get("author", "Voz de Brasília"),
            "status": "published",
            "views": item.get("views", 0),
            "published_at": item.get("published_at") or item.get("created_at"),
            "created_at": item.get("created_at"),
            "updated_at": item.get("updated_at")
        }
        supabase_data.append(post_data)

    url = f"{SUPABASE_URL}/rest/v1/news"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }

    batch_size = 10
    for i in range(0, len(supabase_data), batch_size):
        batch = supabase_data[i:i + batch_size]
        payload = json.dumps(batch).encode("utf-8")
        
        req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req) as response:
                print(f"Successfully migrated batch {i//batch_size + 1}/{((len(supabase_data)-1)//batch_size) + 1} ({len(batch)} items)")
        except urllib.error.HTTPError as e:
            print(f"HTTP Error on batch {i//batch_size + 1}: {e.code} - {e.read().decode('utf-8')}")
        except Exception as e:
            print(f"Error migrating batch {i//batch_size + 1}: {e}")

if __name__ == "__main__":
    migrate()
