import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import ISTClock from "@/components/ISTClock";
import GroupSection from "@/components/GroupSection";
import HomeHighlights from "@/components/HomeHighlights";
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
      <GroupSection preview />
      <HomeHighlights />
      <Footer />
    </div>
  );
};

export default Index;
