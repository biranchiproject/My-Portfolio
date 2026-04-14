import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    print("Checking table 'cv'...")
    response = supabase.table("cv").select("*").limit(1).execute()
    print("Table 'cv' exists.")
except Exception as e:
    print(f"Error: {e}")
    print("\nIMPORTANT: Please create a table named 'cv' with a column 'file_url' (text).")
