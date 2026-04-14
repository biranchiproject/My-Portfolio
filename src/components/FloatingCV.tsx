import { useState, useEffect } from "react";
import { Download, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { forceDownload } from "@/utils/download";

const FloatingCV = () => {
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/cv");
        if (response.ok) {
          const data = await response.json();
          if (data.file_url) {
            setCvUrl(data.file_url);
            setError(false);
          } else {
            console.warn("CV URL is null in database");
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Fetch CV error:", err);
        setError(true);
      }
    };
    fetchCv();
    // Refresh every 10 seconds for real-time update feel
    const interval = setInterval(fetchCv, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    if (!cvUrl) {
      toast.error("Bhai, pehle admin dashboard se CV upload karein!");
      return;
    }
    
    toast.success("Downloading CV...");
    // Dynamically detect extension from URL
    const extension = cvUrl.split(".").pop()?.split("?")[0] || "pdf";
    await forceDownload(cvUrl, `Raja_CV.${extension}`);
  };

  return (
    <div className="absolute left-8 top-[200px] z-[9999]">
      <button
        onClick={handleDownload}
        className={`relative flex items-center bg-dark-bg/60 backdrop-blur-2xl border border-neon-green/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group/btn shadow-neon/10`}
      >
        {/* Left Side: Text Box */}
        <div className="px-5 py-4 bg-neon-green/10 transition-colors">
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-neon-green">
              {cvUrl ? "Resume" : "No CV"}
            </span>
            <span className="text-lg font-black tracking-tighter text-foreground font-tech">
              VIEW<span className="text-neon-green italic"> CV</span>
            </span>
          </div>
        </div>

        {/* Right Side: Icon Box */}
        <div className="p-4 bg-neon-green transition-all duration-500 group-hover:px-6">
          <div className="relative">
            {cvUrl ? (
              <>
                <FileText className="w-7 h-7 text-dark-bg animate-pulse" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg">
                  <FileText className="w-3 h-3 text-neon-green" />
                </div>
              </>
            ) : (
              <AlertCircle className="w-7 h-7 text-dark-bg opacity-80" />
            )}
          </div>
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[30deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out"></div>
      </button>

      {/* Pulsing Dot Status */}
      <div className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cvUrl ? "bg-neon-green" : "bg-red-500"}`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${cvUrl ? "bg-neon-green" : "bg-red-500"}`}></span>
      </div>

      {/* Tooltip */}
      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-dark-surface border border-dark-border px-3 py-1 rounded-lg pointer-events-none">
        <p className="text-xs font-medium text-foreground">
          {cvUrl ? "Click to View My CV" : "Upload CV in Admin Panel"}
        </p>
      </div>
    </div>
  );
};

export default FloatingCV;
