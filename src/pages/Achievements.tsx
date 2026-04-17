import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, ZoomIn, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
}

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")} 
              className="text-gray-text hover:text-neon-green transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold font-tech text-neon-green">
              My <span className="text-foreground">Achievements</span>
            </h1>
          </div>
          <p className="text-gray-text font-medium border-l-2 border-neon-green pl-4 max-w-md">
            A collection of my professional milestones and certifications.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="w-12 h-12 text-neon-green animate-spin" />
            <p className="text-neon-green font-mono animate-pulse">RETRIVING CERTIFICATION DATA...</p>
          </div>
        ) : achievements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-dark-surface rounded-2xl overflow-hidden border border-dark-border hover:border-neon-green/50 transition-all duration-500 shadow-lg hover:shadow-neon/20 cursor-pointer"
                onClick={() => setSelectedImage(achievement.image_url)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={achievement.image_url}
                    alt={achievement.title || "Achievement"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-neon-green/20 rounded-full border border-neon-green/40">
                      <ZoomIn className="text-neon-green w-8 h-8" />
                    </div>
                  </div>
                </div>
                {achievement.title && (
                  <div className="p-4 bg-dark-bg/80 backdrop-blur-sm border-t border-dark-border">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-neon-green transition-colors line-clamp-1">
                      {achievement.title}
                    </h3>
                  </div>
                )}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-green/20 rounded-2xl pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-dark-border rounded-3xl">
            <p className="text-xl text-gray-text">No achievements uploaded yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-dark-bg/50 border border-neon-green/30 text-neon-green rounded-full hover:bg-neon-green/20 transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative group w-full h-full flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Achievement Fullscreen"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-white/20 rounded-lg"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;
