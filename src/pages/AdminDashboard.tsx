import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Palmtree, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Finance module (new)
import TripMembersManager from "@/components/admin/TripMembersManager";
import AccommodationFinanceManager from "@/components/admin/AccommodationFinanceManager";
import SecurityDepositsFinanceManager from "@/components/admin/SecurityDepositsFinanceManager";
import TrainTicketFaresManager from "@/components/admin/TrainTicketFaresManager";
import ExtraExpensesManager from "@/components/admin/ExtraExpensesManager";
import TripBudgetItemsManager from "@/components/admin/TripBudgetItemsManager";
import AdminAuditLogManager from "@/components/admin/AdminAuditLogManager";

// Existing (untouched)
import TravelIDSubmissionsManager from "@/components/admin/TravelIDSubmissionsManager";

const checkIsAdmin = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc("is_admin_email", { check_email: email });
  if (error) return false;
  return !!data;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email) { navigate("/admin/login", { replace: true }); return; }
      const isAdmin = await checkIsAdmin(session.user.email);
      if (!isAdmin) { navigate("/admin/login", { replace: true }); return; }
      setUser({ email: session.user.email, name: session.user.user_metadata?.full_name || session.user.email.split("@")[0] });
      setLoading(false);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/admin/login", { replace: true });
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
              <h1 className="font-serif text-lg font-bold text-foreground">Trip Coordinator</h1>
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
      <main className="container mx-auto px-4 py-6 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
          <h2 className="mb-1 font-serif text-3xl font-bold text-foreground">Trip Finance Dashboard</h2>
          <p className="text-muted-foreground">Goa 2026 — Accommodation, Deposits, Tickets, Expenses & Budget</p>
        </motion.div>

        <Tabs defaultValue="accommodation" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="accommodation" className="text-xs sm:text-sm">Accommodation</TabsTrigger>
            <TabsTrigger value="deposits" className="text-xs sm:text-sm">Deposits</TabsTrigger>
            <TabsTrigger value="train" className="text-xs sm:text-sm">Train Tickets</TabsTrigger>
            <TabsTrigger value="expenses" className="text-xs sm:text-sm">Expenses</TabsTrigger>
            <TabsTrigger value="budget" className="text-xs sm:text-sm">Budget Items</TabsTrigger>
            <TabsTrigger value="members" className="text-xs sm:text-sm">Members</TabsTrigger>
            <TabsTrigger value="travel-id" className="text-xs sm:text-sm">Travel ID</TabsTrigger>
            <TabsTrigger value="audit" className="text-xs sm:text-sm">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="accommodation"><AccommodationFinanceManager /></TabsContent>
          <TabsContent value="deposits"><SecurityDepositsFinanceManager /></TabsContent>
          <TabsContent value="train"><TrainTicketFaresManager /></TabsContent>
          <TabsContent value="expenses"><ExtraExpensesManager /></TabsContent>
          <TabsContent value="budget"><TripBudgetItemsManager /></TabsContent>
          <TabsContent value="members"><TripMembersManager /></TabsContent>
          <TabsContent value="travel-id"><TravelIDSubmissionsManager /></TabsContent>
          <TabsContent value="audit"><AdminAuditLogManager /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
