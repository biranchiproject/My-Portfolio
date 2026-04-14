from fastapi import FastAPI, HTTPException, Depends, Header, UploadFile, File
from fastapi.responses import StreamingResponse
import urllib.request
import io
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Any
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import jwt
from datetime import datetime, timedelta, UTC

# Load .env from project root
if os.path.exists(".env"):
    load_dotenv(".env")
elif os.path.exists("../.env"):
    load_dotenv("../.env")
else:
    load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

# Use SERVICE_KEY if provided (supporting both legacy JWT and new format)
if SERVICE_KEY and (SERVICE_KEY.startswith("eyJ") or SERVICE_KEY.startswith("sb_")):
    SUPABASE_KEY = SERVICE_KEY
    print("Using Service Role Key for Supabase.")
else:
    SUPABASE_KEY = ANON_KEY
    print("Using Anon Key for Supabase (Service Role Key missing or invalid format).")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Admin credentials
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
JWT_SECRET = os.getenv("JWT_SECRET")
if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET environment variable is not set!")

class LoginRequest(BaseModel):
    username: str
    password: str

class Project(BaseModel):
    model_config = ConfigDict(extra='ignore')
    
    id: Optional[Any] = None
    title: str
    description: str
    live_link: str
    github_link: str
    image_url: Optional[str] = None
    tags: Optional[List[str]] = []

def verify_token(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired, please login again")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Unauthorized access")

@app.post("/login")
async def login(request: LoginRequest):
    if request.username == ADMIN_USERNAME and request.password == ADMIN_PASSWORD:
        token = jwt.encode({
            "sub": ADMIN_USERNAME,
            "exp": datetime.now(UTC) + timedelta(hours=24)
        }, JWT_SECRET, algorithm="HS256")
        return {"token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/projects")
async def get_projects():
    try:
        res = supabase.table("projects").select("*").execute()
        return res.data
    except Exception as e:
        print(f"Error fetching projects: {e}")
        return []

@app.post("/projects")
async def create_project(project: Project):
    try:
        res = supabase.table("projects").insert(project.dict(exclude={"id"})).execute()
        if res.data:
            return res.data[0]
        return {"error": "No data returned from insert"}
    except Exception as e:
        print(f"Error creating project: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/projects/{project_id}")
async def update_project(project_id: str, project: Project):
    try:
        res = supabase.table("projects").update(project.dict(exclude={"id"})).eq("id", project_id).execute()
        if res.data:
            return res.data[0]
        return {"error": "No data returned from update"}
    except Exception as e:
        print(f"Error updating project: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    try:
        supabase.table("projects").delete().eq("id", project_id).execute()
        return {"message": "Project deleted"}
    except Exception as e:
        print(f"Error deleting project: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload-cv")
async def upload_cv(file: UploadFile = File(...)):
    try:
        print(f"Uploading CV: {file.filename}")
        file_bytes = await file.read()
        file_path = f"cv/{file.filename}"

        # Upload to Supabase Storage
        supabase.storage.from_("cv-files").upload(
            file_path,
            file_bytes,
            {"content-type": file.content_type, "upsert": "true"}
        )

        # Get public URL
        public_url = supabase.storage.from_("cv-files").get_public_url(file_path)
        print(f"Public URL: {public_url}")

        # Insert into DB
        supabase.table("cv").insert({
            "file_url": public_url
        }).execute()

        return {"success": True, "url": public_url}

    except Exception as e:
        error_msg = str(e)
        print(f"Error uploading CV: {error_msg}")
        return {"error": error_msg}

@app.post("/upload-profile-photo")
async def upload_profile_photo(file: UploadFile = File(...)):
    try:
        print(f"Uploading Profile Photo: {file.filename}")
        file_bytes = await file.read()
        file_path = f"profile/{file.filename}"

        # Upload to Supabase Storage
        supabase.storage.from_("profile-images").upload(
            file_path,
            file_bytes,
            {"content-type": file.content_type, "upsert": "true"}
        )

        # Get public URL
        public_url = supabase.storage.from_("profile-images").get_public_url(file_path)
        print(f"Public URL: {public_url}")

        # Remove old entries to keep only one active
        supabase.table("profile_photo").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()

        # Insert into DB
        supabase.table("profile_photo").insert({
            "file_url": public_url
        }).execute()

        return {"success": True, "url": public_url}

    except Exception as e:
        error_msg = str(e)
        print(f"Error uploading Profile Photo: {error_msg}")
        return {"error": error_msg}

@app.get("/profile-photo")
async def get_profile_photo():
    try:
        res = supabase.table("profile_photo").select("id, file_url").order("created_at", desc=True).limit(1).execute()
        if res.data:
            return res.data[0]
    except Exception as e:
        print(f"Error fetching Profile Photo: {e}")
    return {"id": None, "file_url": None}

@app.delete("/profile-photo/{photo_id}")
async def delete_profile_photo(photo_id: str):
    try:
        # 1. Get details to find file path
        res = supabase.table("profile_photo").select("file_url").eq("id", photo_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Photo not found")
        
        file_url = res.data[0]["file_url"]
        file_name = file_url.split("/")[-1]
        file_path = f"profile/{file_name}"

        # 2. Delete from Storage
        supabase.storage.from_("profile-images").remove([file_path])

        # 3. Delete from DB
        supabase.table("profile_photo").delete().eq("id", photo_id).execute()

        return {"success": True, "message": "Profile photo deleted successfully"}
    except Exception as e:
        print(f"Error deleting profile photo: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload-project-image")
async def upload_project_image(file: UploadFile = File(...)):
    try:
        print(f"Uploading Project Image: {file.filename}")
        file_content = await file.read()
        file_name = f"projects/{file.filename}"

        # Upload to Supabase Storage
        supabase.storage.from_("project-images").upload(
            file_name, 
            file_content, 
            {"content-type": file.content_type, "upsert": "true"}
        )
        
        # Get public URL
        file_url = supabase.storage.from_("project-images").get_public_url(file_name)
        
        return {"file_url": file_url}
    except Exception as e:
        print(f"Error uploading image: {e}")
        return {"error": str(e)}

@app.get("/cv")
async def get_cv():
    try:
        # Get latest CV
        res = supabase.table("cv").select("id, file_url").order("created_at", desc=True).limit(1).execute()
        if res.data:
            return res.data[0]
    except Exception as e:
        print(f"Error fetching CV: {e}")
    return {"id": None, "file_url": None}

@app.get("/download-cv")
async def download_cv():
    try:
        # 1. Get current CV URL
        res = supabase.table("cv").select("file_url").order("created_at", desc=True).limit(1).execute()
        if not res.data or not res.data[0]["file_url"]:
            raise HTTPException(status_code=404, detail="CV not found")
        
        url = res.data[0]["file_url"]
        
        # 2. Extract extension and determine media type
        extension = url.split(".")[-1].split("?")[0].lower()
        if extension in ["doc", "docx"]:
            media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            filename = f"Raja_CV.{extension}"
        else:
            media_type = "application/pdf"
            filename = "Raja_CV.pdf"

        # 3. Fetch the file content
        with urllib.request.urlopen(url) as response:
            content = response.read()
            
        # 4. Return as a stream with forced download headers
        return StreamingResponse(
            io.BytesIO(content),
            media_type=media_type,
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"'
            }
        )
    except Exception as e:
        print(f"Download CV error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/cv/{cv_id}")
async def delete_cv(cv_id: str):
    try:
        # 1. Get CV details to find file path
        res = supabase.table("cv").select("file_url").eq("id", cv_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="CV not found")
        
        file_url = res.data[0]["file_url"]
        # Extract filename from URL (e.g., .../cv/filename.pdf)
        file_name = file_url.split("/")[-1]
        file_path = f"cv/{file_name}"

        # 2. Delete from Storage
        res_storage = supabase.storage.from_("cv-files").remove([file_path])
        print(f"Storage delete response: {res_storage}")

        # 3. Delete from DB
        res_db = supabase.table("cv").delete().eq("id", cv_id).execute()
        print(f"DB delete response: {res_db}")

        return {"success": True, "message": "CV deleted successfully"}
    except Exception as e:
        print(f"Error deleting CV: {e}")
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
