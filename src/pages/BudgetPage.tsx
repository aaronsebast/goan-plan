import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import DailyBudgetSection from "@/components/DailyBudgetSection";
import BudgetSection from "@/components/BudgetSection";
import SuggestionBox from "@/components/SuggestionBox";
import Footer from "@/components/Footer";
import cruiseDinner from "@/assets/cruise-dinner.jpg";

const BudgetPage = () => (
  <div className="min-h-screen page-enter">
    <Navigation />
    <PageHero
      title="Budget &"
      titleAccent="Decisions"
      subtitle="Estimated costs and group decision process"
      tag="Plan Your Expenses"
      backgroundImage={cruiseDinner}
    />
    <DailyBudgetSection />
    <BudgetSection />
    <SuggestionBox />
    <Footer />
  </div>
);

export default BudgetPage;
