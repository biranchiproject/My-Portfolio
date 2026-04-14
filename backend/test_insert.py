import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

# Choose key
if SERVICE_KEY and SERVICE_KEY.startswith("eyJ"):
    SUPABASE_KEY = SERVICE_KEY
    print("Testing with SERVICE_ROLE_KEY...")
else:
    SUPABASE_KEY = ANON_KEY
    print("Testing with ANON_KEY...")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    print("Attempting to insert a test project...")
    data = {
        "title": "Test Project",
        "description": "Diagnostic Test",
        "live_link": "https://example.com",
        "github_link": "https://github.com",
        "tags": ["test"]
    }
    response = supabase.table("projects").insert(data).execute()
    print(f"Success! Inserted row: {response.data}")
except Exception as e:
    print(f"ERROR: {e}")
