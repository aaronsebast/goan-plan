import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import RouteMapSection from "@/components/RouteMapSection";
import Footer from "@/components/Footer";
import goaFort from "@/assets/goa-fort.jpg";

const RoutesPage = () => (
  <div className="min-h-screen page-enter">
    <Navigation />
    <PageHero
      title="Travel"
      titleAccent="Routes"
      subtitle="Planned routes with distance and travel time estimates"
      tag="Navigation"
      backgroundImage={goaFort}
    />
    <RouteMapSection />
    <Footer />
  </div>
);

export default RoutesPage;
