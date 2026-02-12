import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import PlaceInfoSection from "@/components/PlaceInfoSection";
import WeatherWidget from "@/components/WeatherWidget";
import Footer from "@/components/Footer";
import northGoaBeach from "@/assets/north-goa-beach.jpg";

const PlacesPage = () => (
  <div className="min-h-screen page-enter">
    <Navigation />
    <PageHero
      title="Place"
      titleAccent="Guide"
      subtitle="Essential information about each destination"
      tag="Know Before You Go"
      backgroundImage={northGoaBeach}
    />
    <PlaceInfoSection />
    <WeatherWidget />
    <Footer />
  </div>
);

export default PlacesPage;
