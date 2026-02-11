import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Palmtree, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AccommodationManager from "@/components/admin/AccommodationManager";
import TrainTicketsManager from "@/components/admin/TrainTicketsManager";
import SecurityDepositsManager from "@/components/admin/SecurityDepositsManager";
import BorrowExpensesManager from "@/components/admin/BorrowExpensesManager";
import AuditLogManager from "@/components/admin/AuditLogManager";

const ALLOWED_EMAILS = [
  "plangoan@gmail.com",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email || !ALLOWED_EMAILS.includes(session.user.email)) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setUser({
        email: session.user.email,
        name: session.user.user_metadata?.full_name || session.user.email.split("@")[0],
      });
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/admin/login", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "You have been signed out." });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Palmtree className="h-6 w-6 text-secondary" />
            <div>
              <h1 className="font-serif text-lg font-bold text-foreground">Budget Manager</h1>
              <p className="text-xs text-muted-foreground">Welcome, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="mr-1 h-4 w-4" /> Trip Page
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto space-y-8 px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="mb-2 font-serif text-3xl font-bold text-foreground">Trip Budget Dashboard</h2>
          <p className="text-muted-foreground">Manage accommodation, train tickets, and security deposits for Goa 2026.</p>
        </motion.div>

        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <AccommodationManager />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <TrainTicketsManager />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SecurityDepositsManager />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <BorrowExpensesManager />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <AuditLogManager />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
