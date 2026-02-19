import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Projects = () => {
    const navigate = useNavigate();

    // Define neon colors
    const colors = [
        "rgba(34, 197, 94, 0.6)",   // Neon Green
        "rgba(234, 179, 8, 0.6)",   // Yellow
        "rgba(219, 39, 119, 0.6)",  // Pink
        "rgba(147, 51, 234, 0.6)",  // Purple
        "rgba(59, 130, 246, 0.6)",  // Blue
        "rgba(6, 182, 212, 0.6)",   // Cyan
    ];

    // Generate random cubes
    const cubes = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        // Larger sizes for "3d" feel
        size: Math.random() * 80 + 40, // 40px to 120px
        left: Math.random() * 95, // %
        top: Math.random() * 95, // %
        duration: Math.random() * 8 + 12, // 12-20s duration (slow)
        delay: Math.random() * 5, // s
        color: colors[Math.floor(Math.random() * colors.length)],
        rotationDuration: Math.random() * 10 + 10, // s
    }));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">

            {/* Dark Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0"></div>

            {/* Floating Cubes Background */}
            <div className="floating-cubes-container pointer-events-none">
                {cubes.map((cube) => (
                    <div
                        key={cube.id}
                        className="cube"
                        style={{
                            width: `${cube.size}px`,
                            height: `${cube.size}px`,
                            left: `${cube.left}%`,
                            top: `${cube.top}%`,
                            // Neon Border & Glow
                            border: `2px solid ${cube.color}`,
                            boxShadow: `0 0 15px ${cube.color}, inset 0 0 10px ${cube.color}`,
                            // Animation
                            animationDuration: `${cube.duration}s`,
                            animationDelay: `${cube.delay}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 text-center px-4 backdrop-blur-sm p-10 rounded-3xl bg-black/20 border border-white/5 shadow-2xl">
                {/* Animated Multi-Color Text */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 animate-gradient-x bg-gradient-to-r from-neon-green via-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent leading-tight drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    Project Coming Soon...
                </h1>

                <p className="text-xl md:text-2xl text-gray-text mb-12 max-w-2xl mx-auto animate-fade-in opacity-90 font-light">
                    Something extraordinary is being built. <br /> Stay tuned for the reveal.
                </p>

                {/* Back Button */}
                <Button
                    onClick={() => navigate("/")}
                    className="bg-black/50 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black font-semibold px-10 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] group backdrop-blur-md"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default Projects;
