import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import ISTClock from "@/components/ISTClock";
import GroupSection from "@/components/GroupSection";
import HomeHighlights from "@/components/HomeHighlights";
import LiveWeatherWidget from "@/components/LiveWeatherWidget";
import Footer from "@/components/Footer";
import EmergencyHelp from "@/components/EmergencyHelp";

const Index = () => {
  return (
    <div className="min-h-screen page-enter">
      <Navigation />
      <EmergencyHelp />
      <HeroSection />
      <CountdownTimer />
      <ISTClock />
      <GroupSection />
      <LiveWeatherWidget />
      <HomeHighlights />
      <Footer />
    </div>
  );
};

export default Index;
