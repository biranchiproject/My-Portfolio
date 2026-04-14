import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

supabase: Client = create_client(SUPABASE_URL, ANON_KEY)

try:
    print("Checking if 'projects' table exists by attempting a select...")
    response = supabase.table("projects").select("*").limit(1).execute()
    print(f"Success! Table found. Sample data: {response.data}")
except Exception as e:
    print(f"ERROR: {e}")

try:
    print("\nChecking 'cv' table as well...")
    response = supabase.table("cv").select("*").limit(1).execute()
    print(f"Success! 'cv' table found. Sample data: {response.data}")
except Exception as e:
    print(f"ERROR: {e}")
