import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import AccommodationSection from "@/components/AccommodationSection";
import Footer from "@/components/Footer";
import marvellaVilla from "@/assets/marvella-villa.jpg";

const StayPage = () => (
  <div className="min-h-screen page-enter">
    <Navigation />
    <PageHero
      title="Our"
      titleAccent="Stay"
      subtitle="Where we'll call home during our Goa adventure"
      tag="Accommodation"
      backgroundImage={marvellaVilla}
    />
    <AccommodationSection />
    <Footer />
  </div>
);

export default StayPage;
