import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import GroupSection from "@/components/GroupSection";
import TravelSection from "@/components/TravelSection";
import ItinerarySection from "@/components/ItinerarySection";
import CruiseSection from "@/components/CruiseSection";
import BudgetSection from "@/components/BudgetSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <GroupSection />
      <TravelSection />
      <ItinerarySection />
      <CruiseSection />
      <BudgetSection />
      <Footer />
    </div>
  );
};

export default Index;