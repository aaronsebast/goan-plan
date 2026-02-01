import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import GroupSection from "@/components/GroupSection";
import TravelSection from "@/components/TravelSection";
import ItinerarySection from "@/components/ItinerarySection";
import BudgetSection from "@/components/BudgetSection";
import SuggestionBox from "@/components/SuggestionBox";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CountdownTimer />
      <GroupSection />
      <TravelSection />
      <ItinerarySection />
      <BudgetSection />
      <SuggestionBox />
      <Footer />
    </div>
  );
};

export default Index;