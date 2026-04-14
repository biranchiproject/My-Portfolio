import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, Upload, ExternalLink, Github, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [cvData, setCvData] = useState<{id: string, file_url: string} | null>(null);
    const [profilePhotoData, setProfilePhotoData] = useState<{id: string, file_url: string} | null>(null);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [editingProject, setEditingProject] = useState<any | null>(null);
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        live_link: "",
        github_link: "",
        image_url: ""
    });
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("admin_token");

    useEffect(() => {
        if (!token) {
            navigate("/");
            toast.error("Please login to access admin dashboard");
        } else {
            fetchProjects();
            fetchCv();
            fetchProfilePhoto();
            
            // Live polling for real-time feel
            const interval = setInterval(() => {
                fetchProjects();
                fetchCv();
                fetchProfilePhoto();
            }, 10000); // Poll every 10 seconds
            
            return () => clearInterval(interval);
        }
    }, [token]);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/projects");
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Fetch projects error:", error);
        }
    };

    const fetchCv = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/cv");
            const data = await response.json();
            if (data.id && data.file_url) {
                setCvData(data);
            } else {
                setCvData(null);
            }
        } catch (error) {
            console.error("Fetch CV error:", error);
        }
    };

    const fetchProfilePhoto = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/profile-photo");
            const data = await response.json();
            if (data.id && data.file_url) {
                setProfilePhotoData(data);
            } else {
                setProfilePhotoData(null);
            }
        } catch (error) {
            console.error("Fetch Profile Photo error:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        navigate("/");
        toast.info("Logged out");
    };

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newProject)
            });
            if (response.ok) {
                toast.success("Project added!");
                setIsAddingProject(false);
                setNewProject({ title: "", description: "", live_link: "", github_link: "", image_url: "" });
                fetchProjects();
            }
        } catch (error) {
            toast.error("Failed to add project");
        }
    };

    const handleUpdateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Remove internal metadata (id, created_at) before sending to backend
            const { id, created_at, ...updateData } = editingProject;
            
            const response = await fetch(`http://127.0.0.1:8000/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });
            if (response.ok) {
                toast.success("Project Updated Successfully!");
                setEditingProject(null);
                setLocalPreview(null);
                fetchProjects();
            } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.detail || "Failed to update project"}`);
            }
        } catch (error) {
            toast.error("Network Error: Could not reach the server");
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/projects/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                toast.success("Project deleted");
                fetchProjects();
            }
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("Uploading file:", file.name);
            const response = await fetch("http://127.0.0.1:8000/upload-cv", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            console.log("Upload response:", data);
            
            if (response.ok && data.url) {
                fetchCv();
                toast.success("CV uploaded successfully!");
            } else {
                throw new Error(data.error || "Upload failed");
            }
        } catch (error: any) {
            console.error("CV Upload Error:", error);
            toast.error(error.message || "Failed to upload CV");
        }
    };

    const handleDeleteCv = async () => {
        if (!cvData?.id || !confirm("Are you sure you want to delete the current CV?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/cv/${cvData.id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setCvData(null);
                toast.success("CV deleted successfully");
            } else {
                toast.error("Failed to delete CV");
            }
        } catch (error) {
            console.error("Delete CV error:", error);
            toast.error("Error deleting CV");
        }
    };

    const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/upload-profile-photo", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            
            if (response.ok && data.url) {
                fetchProfilePhoto();
                toast.success("Profile Photo updated successfully!");
            } else {
                throw new Error(data.error || "Upload failed");
            }
        } catch (error: any) {
            console.error("Profile Photo Upload Error:", error);
            toast.error(error.message || "Failed to upload Profile Photo");
        }
    };

    const handleDeleteProfilePhoto = async () => {
        if (!profilePhotoData?.id || !confirm("Are you sure you want to delete the current profile photo?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/profile-photo/${profilePhotoData.id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setProfilePhotoData(null);
                toast.success("Profile photo deleted successfully");
            } else {
                toast.error("Failed to delete profile photo");
            }
        } catch (error) {
            console.error("Delete profile photo error:", error);
            toast.error("Error deleting profile photo");
        }
    };

    const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Set local preview instantly
        const preview = URL.createObjectURL(file);
        setLocalPreview(preview);
        setIsUploadingImage(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/upload-project-image", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                if (editingProject) {
                    setEditingProject({ ...editingProject, image_url: data.file_url });
                } else {
                    setNewProject({ ...newProject, image_url: data.file_url });
                }
                toast.success("Image uploaded to server!");
            }
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setIsUploadingImage(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                     <div className="flex items-center space-x-4">
                        <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-text hover:text-neon-green">
                            <ArrowLeft className="w-5 h-5 mr-2" /> Back
                        </Button>
                        <h1 className="text-4xl font-bold font-tech text-neon-green">Admin <span className="text-foreground">Dashboard</span></h1>
                    </div>
                    <Button variant="destructive" onClick={handleLogout} className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* CV Management */}
                    <Card className="bg-dark-surface border-dark-border lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Files & Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Profile Photo Section */}
                            <div className="p-4 border-2 border-dark-border rounded-xl bg-dark-bg/50">
                                <h4 className="text-sm font-bold text-neon-green mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-neon-green rounded-full mr-2"></span>
                                    Profile Photo
                                </h4>
                                {profilePhotoData ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-center">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neon-green/30">
                                                <img src={profilePhotoData.file_url} alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 h-8 text-xs" onClick={handleDeleteProfilePhoto}>
                                                <Trash2 className="w-3 h-3 mr-2" /> Remove Image
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[10px] text-gray-text text-center mb-4 italic">Using default system photo</p>
                                )}
                                <label className="cursor-pointer group block mt-2">
                                    <div className="flex items-center justify-center space-x-2 py-2 bg-neon-green/10 text-neon-green border border-dashed border-neon-green/30 rounded-lg group-hover:bg-neon-green/20 transition-all">
                                        <Upload className="w-4 h-4" />
                                        <span className="text-xs font-bold">{profilePhotoData ? "Replace Photo" : "Upload New Photo"}</span>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleProfilePhotoUpload} />
                                </label>
                            </div>

                            {/* CV Section */}
                            <div className="p-4 border-2 border-dark-border rounded-xl bg-dark-bg/50">
                                <h4 className="text-sm font-bold text-neon-green mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-neon-green rounded-full mr-2"></span>
                                    CV (Resumé)
                                </h4>
                                {cvData ? (
                                    <div className="space-y-4">
                                        <Button className="w-full bg-neon-green/10 text-neon-green hover:bg-neon-green/20 h-10" onClick={() => window.open(cvData.file_url, "_blank")}>
                                            View Current CV
                                        </Button>
                                        <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 h-8 text-xs" onClick={handleDeleteCv}>
                                            <Trash2 className="w-3 h-3 mr-2" /> Delete CV
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-[10px] text-gray-text text-center mb-4 italic">No resume uploaded</p>
                                )}
                                <label className="cursor-pointer group block mt-4">
                                    <div className="flex items-center justify-center space-x-2 py-3 bg-dark-surface border border-dashed border-dark-border rounded-lg group-hover:border-neon-green/50 transition-all">
                                        <Upload className="w-5 h-5 text-gray-text/50 group-hover:text-neon-green" />
                                        <span className="text-xs font-semibold text-gray-text group-hover:text-neon-green">{cvData ? "Replace CV" : "Upload CV File"}</span>
                                    </div>
                                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleCvUpload} />
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Project Management */}
                    <Card className="bg-dark-surface border-dark-border lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-xl font-bold">Project Management</CardTitle>
                            <Button onClick={() => setIsAddingProject(true)} className="bg-neon-green text-dark-bg hover:shadow-neon font-semibold">
                                <Plus className="w-4 h-4 mr-2" /> Add Project
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {(isAddingProject || editingProject) && (
                                <div className="bg-dark-bg p-6 rounded-2xl border border-neon-green/30 space-y-4 animate-in fade-in slide-in-from-top-4">
                                    <h3 className="text-lg font-bold text-neon-green">{editingProject ? "Edit Project" : "New Project"}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-sm text-gray-text">Title</label>
                                            <Input
                                                value={editingProject ? editingProject.title : newProject.title}
                                                onChange={(e) => editingProject ? setEditingProject({...editingProject, title: e.target.value}) : setNewProject({...newProject, title: e.target.value})}
                                                className="bg-dark-surface border-dark-border"
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-sm text-gray-text">Description</label>
                                            <Textarea
                                                value={editingProject ? editingProject.description : newProject.description}
                                                onChange={(e) => editingProject ? setEditingProject({...editingProject, description: e.target.value}) : setNewProject({...newProject, description: e.target.value})}
                                                className="bg-dark-surface border-dark-border"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-text">Live Link</label>
                                            <Input
                                                value={editingProject ? editingProject.live_link : newProject.live_link}
                                                onChange={(e) => editingProject ? setEditingProject({...editingProject, live_link: e.target.value}) : setNewProject({...newProject, live_link: e.target.value})}
                                                className="bg-dark-surface border-dark-border"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-text">GitHub Link</label>
                                            <Input
                                                value={editingProject ? editingProject.github_link : newProject.github_link}
                                                onChange={(e) => editingProject ? setEditingProject({...editingProject, github_link: e.target.value}) : setNewProject({...newProject, github_link: e.target.value})}
                                                className="bg-dark-surface border-dark-border"
                                            />
                                        </div>
                                        <div className="space-y-4 col-span-2 mt-4">
                                            <div className="flex flex-col space-y-2">
                                                <label className="text-sm font-semibold text-neon-green/80 uppercase tracking-wider">Project Demo Preview</label>
                                                <div className="relative group overflow-hidden rounded-xl border-2 border-dark-border bg-dark-bg aspect-video flex items-center justify-center">
                                                    {(localPreview || editingProject?.image_url || newProject.image_url) ? (
                                                        <img 
                                                            src={localPreview || editingProject?.image_url || newProject.image_url} 
                                                            alt="Preview" 
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="text-center p-8">
                                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-surface flex items-center justify-center border border-dashed border-dark-border">
                                                                <Upload className="w-8 h-8 text-gray-text/40" />
                                                            </div>
                                                            <p className="text-sm text-gray-text">No image selected</p>
                                                        </div>
                                                    )}
                                                    
                                                    {isUploadingImage && (
                                                        <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-sm flex flex-col items-center justify-center">
                                                            <div className="w-8 h-8 border-4 border-neon-green border-t-transparent rounded-full animate-spin mb-2"></div>
                                                            <p className="text-xs font-bold text-neon-green">UPLOADING...</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="relative">
                                                <label className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-neon-green/5 hover:bg-neon-green/10 border-2 border-dashed border-neon-green/30 hover:border-neon-green/60 rounded-xl cursor-pointer transition-all group">
                                                    <Upload className="w-5 h-5 text-neon-green group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-semibold text-neon-green">{editingProject?.image_url || newProject.image_url ? "Change Image" : "Select Project Image"}</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleProjectImageUpload}
                                                        disabled={isUploadingImage}
                                                        className="hidden"
                                                    />
                                                </label>
                                                {isUploadingImage && <p className="text-[10px] text-neon-green/60 text-center mt-2 animate-pulse font-mono tracking-tighter">SECURING DATA PIPELINE...</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-2">
                                        <Button 
                                            onClick={editingProject ? handleUpdateProject : handleAddProject} 
                                            className="flex-1 bg-neon-green text-dark-bg font-bold shadow-neon-strong hover:scale-[1.02] transition-transform"
                                            disabled={isUploadingImage}
                                        >
                                            {isUploadingImage ? "Wait..." : (editingProject ? "Update Project" : "Create Project")}
                                        </Button>
                                        <Button variant="outline" onClick={() => { setIsAddingProject(false); setEditingProject(null); }} className="flex-1 border-dark-border">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((project) => (
                                    <div key={project.id} className="p-4 bg-dark-bg rounded-xl border border-dark-border flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-foreground">{project.title}</h4>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingProject(project)} className="text-gray-text hover:text-neon-green transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDeleteProject(project.id)} className="text-gray-text hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-text line-clamp-2 mb-4">{project.description}</p>
                                        </div>
                                        <div className="flex gap-4">
                                             <a href={project.live_link} target="_blank" className="text-xs text-neon-green flex items-center hover:underline"><ExternalLink className="w-3 h-3 mr-1" /> Live</a>
                                             <a href={project.github_link} target="_blank" className="text-xs text-gray-text flex items-center hover:underline"><Github className="w-3 h-3 mr-1" /> Repo</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
