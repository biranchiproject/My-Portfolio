import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

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
      // 1. Fetch the admin record by username from the "admins" table
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        toast.error("Invalid credentials");
        setIsLoading(false);
        return;
      }

      // 2. Compare the entered password with the stored hashed password using bcrypt
      // (Added fallback just in case the password was saved as plain text directly in the database UI)
      let isPasswordValid = false;
      if (data.password.startsWith("$2a$") || data.password.startsWith("$2b$") || data.password.startsWith("$2y$")) {
        isPasswordValid = bcrypt.compareSync(password, data.password);
      } else {
        isPasswordValid = (password === data.password);
      }

      if (isPasswordValid) {
        // 3. Store session flag in localStorage
        localStorage.setItem("isAdminLoggedIn", "true");
        toast.success("Login successful!");
        onOpenChange(false);
        navigate("/admin");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login");
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
