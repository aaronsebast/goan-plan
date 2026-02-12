import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import PackingChecklist from "@/components/PackingChecklist";
import Footer from "@/components/Footer";
import goaFort from "@/assets/goa-fort.jpg";

const PackingPage = () => (
  <div className="min-h-screen page-enter">
    <Navigation />
    <PageHero
      title="Packing"
      titleAccent="Checklist"
      subtitle="Make sure you don't forget the essentials"
      tag="Get Ready"
      backgroundImage={goaFort}
    />
    <PackingChecklist />
    <Footer />
  </div>
);

export default PackingPage;
