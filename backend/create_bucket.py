import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    print("Creating bucket 'portfolio-files'...")
    # Attempt to create the bucket
    # Note: anon key might fail, but let's try
    response = supabase.storage.create_bucket("portfolio-files", options={"public": True})
    print(f"Bucket created successfully: {response}")
except Exception as e:
    print(f"Failed to create bucket: {e}")
    print("\nIMPORTANT: Please create a PUBLIC bucket named 'portfolio-files' in your Supabase Dashboard.")
