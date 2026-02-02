import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import GroupSection from "@/components/GroupSection";
import TravelSection from "@/components/TravelSection";
import RouteMapSection from "@/components/RouteMapSection";
import ItinerarySection from "@/components/ItinerarySection";
import TrekkingSection from "@/components/TrekkingSection";
import DailyBudgetSection from "@/components/DailyBudgetSection";
import PackingChecklist from "@/components/PackingChecklist";
import WeatherWidget from "@/components/WeatherWidget";
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
      <RouteMapSection />
      <ItinerarySection />
      <TrekkingSection />
      <DailyBudgetSection />
      <PackingChecklist />
      <WeatherWidget />
      <BudgetSection />
      <SuggestionBox />
      <Footer />
    </div>
  );
};

export default Index;
