import os
from dotenv import load_dotenv

env_path = os.path.join(os.getcwd(), ".env")
print(f"Current working directory: {os.getcwd()}")
print(f"Checking for .env at: {env_path}")
print(f"Exists: {os.path.exists(env_path)}")

load_dotenv()
print(f"SUPABASE_URL: {os.getenv('SUPABASE_URL')}")
