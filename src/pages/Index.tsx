import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import GroupSection from "@/components/GroupSection";
import TravelSection from "@/components/TravelSection";
import AccommodationSection from "@/components/AccommodationSection";
import RouteMapSection from "@/components/RouteMapSection";
import ItinerarySection from "@/components/ItinerarySection";
import PlaceInfoSection from "@/components/PlaceInfoSection";
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
      <AccommodationSection />
      <RouteMapSection />
      <ItinerarySection />
      <PlaceInfoSection />
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
