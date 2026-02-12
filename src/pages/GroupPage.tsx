import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import GroupSection from "@/components/GroupSection";
import Footer from "@/components/Footer";
import northGoaBeach from "@/assets/north-goa-beach.jpg";

const GroupPage = () => (
  <div className="min-h-screen page-enter">
    <Navigation />
    <PageHero
      title="Our"
      titleAccent="Travelers"
      subtitle="Meet the 10 friends making this adventure unforgettable"
      tag="The Squad"
      backgroundImage={northGoaBeach}
    />
    <GroupSection />
    <Footer />
  </div>
);

export default GroupPage;
