import { motion } from "framer-motion";
import { Wallet, Utensils, Bike, Fuel, Bed, Beer, Camera, Ticket, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetItem {
  category: string;
  icon: React.ElementType;
  estimate: string;
  notes: string;
}

interface DayBudget {
  day: string;
  date: string;
  total: string;
  items: BudgetItem[];
}

const dailyBudgets: DayBudget[] = [
  {
    day: "Day 1",
    date: "24 April",
    total: "₹1,500 - ₹2,500",
    items: [
      { category: "Food", icon: Utensils, estimate: "₹400-600", notes: "Breakfast + Lunch (thali) + Street food dinner" },
      { category: "Scooter Rent", icon: Bike, estimate: "₹350-450", notes: "Per scooter/day (split between 2)" },
      { category: "Petrol", icon: Fuel, estimate: "₹150-200", notes: "~40-50 km coverage" },
      { category: "Nightlife", icon: Beer, estimate: "₹500-1000", notes: "Drinks + entry (optional)" },
      { category: "Miscellaneous", icon: Camera, estimate: "₹100-250", notes: "Water, snacks, photos" },
    ],
  },
  {
    day: "Day 2",
    date: "25 April",
    total: "₹1,200 - ₹2,000",
    items: [
      { category: "Food", icon: Utensils, estimate: "₹350-500", notes: "Breakfast + Lunch (fish curry) + Dinner" },
      { category: "Scooter Rent", icon: Bike, estimate: "₹350-450", notes: "Already rented (Day 1 rate applies)" },
      { category: "Petrol", icon: Fuel, estimate: "₹250-350", notes: "~80-100 km South Goa coverage" },
      { category: "Activities", icon: Ticket, estimate: "₹200-400", notes: "Waterfall entry, tips" },
      { category: "Miscellaneous", icon: Camera, estimate: "₹100-300", notes: "Tea, Maggi, snacks" },
    ],
  },
  {
    day: "Day 2 Alt",
    date: "Dudhsagar Option",
    total: "₹1,800 - ₹2,800",
    items: [
      { category: "Food", icon: Utensils, estimate: "₹350-500", notes: "Breakfast + Packed lunch + Dinner" },
      { category: "Scooter/Transport", icon: Bike, estimate: "₹350-450", notes: "Ride to Collem (60km)" },
      { category: "Petrol", icon: Fuel, estimate: "₹300-400", notes: "~130 km round trip" },
      { category: "Jeep Safari", icon: Ticket, estimate: "₹400-500", notes: "Mandatory jeep to waterfall" },
      { category: "Miscellaneous", icon: Camera, estimate: "₹200-350", notes: "Waterproof bags, snacks" },
    ],
  },
  {
    day: "Day 3",
    date: "26 April",
    total: "₹800 - ₹1,200",
    items: [
      { category: "Food", icon: Utensils, estimate: "₹300-450", notes: "Breakfast + Lunch (last meal)" },
      { category: "Scooter Return", icon: Bike, estimate: "₹0", notes: "Return by 5 PM" },
      { category: "Petrol", icon: Fuel, estimate: "₹100-150", notes: "~30 km to station" },
      { category: "Fort Entry", icon: Ticket, estimate: "₹50-100", notes: "Aguada Fort (if applicable)" },
      { category: "Miscellaneous", icon: Camera, estimate: "₹100-200", notes: "Last minute shopping, water" },
    ],
  },
];

const accommodationEstimate = {
  perNight: "₹500-800",
  total: "₹1,000-1,600",
  notes: "2 nights in Arpora (shared room, 4-5 per room)",
};

const DailyBudgetSection = () => {
  return (
    <section id="budget" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-secondary">
            Plan Your Expenses
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Daily <span className="italic">Budget</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Estimated per-person costs for each day. Actual costs may vary based on choices.
          </p>
        </motion.div>

        {/* Accommodation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-4xl"
        >
          <div className="rounded-2xl bg-gradient-ocean p-6 text-ocean-foreground">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <Bed className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold">Accommodation</h3>
                  <p className="text-sm text-ocean-foreground/80">{accommodationEstimate.notes}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-ocean-foreground/80">Per night</p>
                <p className="font-serif text-xl font-semibold">{accommodationEstimate.perNight}</p>
                <p className="mt-1 text-sm">
                  Total: <span className="font-semibold">{accommodationEstimate.total}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Budget Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {dailyBudgets.map((dayBudget, index) => (
            <motion.div
              key={dayBudget.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className={`h-full ${dayBudget.day === "Day 2 Alt" ? "border-accent/50 bg-accent/5" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        dayBudget.day === "Day 2 Alt" 
                          ? "bg-accent/20 text-accent" 
                          : "bg-secondary/20 text-secondary"
                      }`}>
                        {dayBudget.day}
                      </span>
                      <CardTitle className="mt-2 font-serif text-lg">{dayBudget.date}</CardTitle>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Estimated Total</p>
                      <p className="flex items-center gap-1 font-serif text-xl font-semibold text-foreground">
                        {dayBudget.total}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dayBudget.items.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-background p-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.category}</p>
                              <p className="text-xs text-muted-foreground">{item.notes}</p>
                            </div>
                          </div>
                          <span className="shrink-0 text-sm font-semibold text-foreground">
                            {item.estimate}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Total Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 max-w-4xl"
        >
          <div className="rounded-2xl border border-palm/30 bg-palm/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-palm/20 p-3">
                  <Wallet className="h-6 w-6 text-palm" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Estimated Trip Total
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Per person (excluding train tickets)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-right">
                <IndianRupee className="h-6 w-6 text-palm" />
                <span className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  4,500 - 7,500
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyBudgetSection;