import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import LoadingScreen from "@/components/LoadingScreen";
import DynamicBackground from "@/components/DynamicBackground";
import Index from "./pages/Index";
import GroupPage from "./pages/GroupPage";
import StayPage from "./pages/StayPage";
import RoutesPage from "./pages/RoutesPage";
import ItineraryPage from "./pages/ItineraryPage";
import TicketsPage from "./pages/TicketsPage";
import PlacesPage from "./pages/PlacesPage";
import BudgetPage from "./pages/BudgetPage";
import PackingPage from "./pages/PackingPage";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            {loading && <LoadingScreen onFinish={handleFinish} />}
          </AnimatePresence>
          {!loading && (
            <BrowserRouter>
              <DynamicBackground>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/group" element={<GroupPage />} />
                  <Route path="/stay" element={<StayPage />} />
                  <Route path="/routes" element={<RoutesPage />} />
                  <Route path="/itinerary" element={<ItineraryPage />} />
                  <Route path="/tickets" element={<TicketsPage />} />
                  <Route path="/places" element={<PlacesPage />} />
                  <Route path="/budget" element={<BudgetPage />} />
                  <Route path="/packing" element={<PackingPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DynamicBackground>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
