import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import ItinerarySection from "@/components/ItinerarySection";
import TravelSection from "@/components/TravelSection";
import Footer from "@/components/Footer";
import heroSunset from "@/assets/hero-goa-sunset.jpg";

const ItineraryPage = () => (
  <div className="min-h-screen page-enter">
    <Navigation />
    <PageHero
      title="Trip"
      titleAccent="Itinerary"
      subtitle="A detailed 3-day plan through the best of Goa"
      tag="3-Day Adventure"
      backgroundImage={heroSunset}
    />
    <TravelSection />
    <ItinerarySection />
    <Footer />
  </div>
);

export default ItineraryPage;
