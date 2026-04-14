import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AdminLoginProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminLogin = ({ isOpen, onOpenChange }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
          const data = await response.json();
          localStorage.setItem("admin_token", data.token);
          toast.success("Login successful!");
          onOpenChange(false);
          navigate("/admin");
      } else {
          toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to connect to backend");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark-surface border-dark-border text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-tech text-center">
            Admin <span className="text-neon-green">Login</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-text">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-dark-bg border-dark-border focus:border-neon-green text-foreground"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-text">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-dark-bg border-dark-border focus:border-neon-green text-foreground"
              placeholder="Enter password"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neon-green text-dark-bg hover:shadow-neon font-semibold py-2 text-lg transition-all duration-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
