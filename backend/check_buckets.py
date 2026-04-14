import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    buckets = supabase.storage.list_buckets()
    print("Available buckets:")
    for bucket in buckets:
        print(f"- {bucket.name}")
except Exception as e:
    print(f"Error: {e}")
