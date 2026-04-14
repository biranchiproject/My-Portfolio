import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load .env
load_dotenv(dotenv_path="../.env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SERVICE_KEY:
    SERVICE_KEY = os.getenv("SUPABASE_ANON_KEY")

supabase: Client = create_client(SUPABASE_URL, SERVICE_KEY)

projects = [
    {
        "title": "Sona Store",
        "description": "A dynamic app store platform featuring a vast library of applications, seamless downloads, and an intuitive, modern interface similar to the Play Store.",
        "live_link": "https://sona-store.pages.dev/",
        "github_link": "#",
        "image_url": "https://wjgoeojxgvggnrkmcuum.supabase.co/storage/v1/object/public/project-images/projects/project-2.png",
        "tags": ["App Store", "React", "Web App"]
    },
    {
        "title": "Hacker Store",
        "description": "A modern cyber-themed app store platform designed with a hacker-style UI. It features a sleek dark interface, secure download system, categorized applications, and a fast, responsive experience.",
        "live_link": "https://hacker-store.pages.dev/",
        "github_link": "#",
        "image_url": "https://wjgoeojxgvggnrkmcuum.supabase.co/storage/v1/object/public/project-images/projects/hacker-store.png",
        "tags": ["Cybersecurity", "React", "Web App", "Full Stack"]
    }
]

def sync():
    print("Syncing projects to Supabase...")
    for p in projects:
        # Check if already exists
        res = supabase.table("projects").select("*").eq("title", p["title"]).execute()
        if not res.data:
            print(f"Adding {p['title']}...")
            supabase.table("projects").insert(p).execute()
        else:
            print(f"{p['title']} already exists, skipping.")
    print("Sync complete!")

if __name__ == "__main__":
    sync()
