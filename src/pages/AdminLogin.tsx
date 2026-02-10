import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Palmtree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "@/hooks/use-toast";

const ALLOWED_EMAILS = [
  "aaron.latvia22@gmail.com",
  "annmaryaldrena1225@gmail.com",
  "francisx799@gmail.com",
];

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email && ALLOWED_EMAILS.includes(session.user.email)) {
        navigate("/admin/dashboard", { replace: true });
      }
      setChecking(false);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user?.email) {
        if (ALLOWED_EMAILS.includes(session.user.email)) {
          navigate("/admin/dashboard", { replace: true });
        } else {
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "Your Google account is not authorized to access the admin panel.",
            variant: "destructive",
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/admin/login",
      });
      if (result.error) {
        toast({
          title: "Login Failed",
          description: result.error.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Checking session...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-4 w-full max-w-md"
      >
        <div className="glass-card rounded-2xl p-8 text-center shadow-2xl">
          {/* Logo */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <Palmtree className="h-8 w-8 text-secondary" />
            <span className="font-serif text-2xl font-bold text-foreground">Goa 2026</span>
          </div>

          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
              <Shield className="h-8 w-8 text-secondary" />
            </div>
          </div>

          <h1 className="mb-2 font-serif text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Budget management is restricted to trip organizers only.
          </p>

          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full gap-3 rounded-xl bg-secondary py-6 text-base font-medium text-secondary-foreground hover:bg-secondary/90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>

          <p className="mt-6 text-xs text-muted-foreground">
            Only authorized admin accounts can access this panel.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-muted-foreground transition-colors hover:text-secondary">
            ← Back to trip page
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
