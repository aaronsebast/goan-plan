import { motion } from "framer-motion";
import { Ship, IndianRupee, Star, Clock, Users, HelpCircle } from "lucide-react";
import cruiseImage from "@/assets/cruise-dinner.jpg";

const CruiseSection = () => {
  return (
    <section id="cruise" className="relative overflow-hidden py-24 md:py-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cruiseImage})` }}
      />
      <div className="section-overlay" />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Special Experience
          </span>
          <h2 className="luxury-heading mb-6 text-4xl font-semibold text-primary md:text-5xl">
            Dinner <span className="italic">Cruise</span>
          </h2>
          <p className="mb-12 text-lg text-primary/80">
            A memorable evening dining on the waters of North Goa, watching the sunset 
            paint the sky in shades of gold and crimson.
          </p>
        </motion.div>

        {/* Cruise Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div className="glass-card rounded-3xl p-8">
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-sunset">
                <Ship className="h-8 w-8 text-accent-foreground" />
              </div>
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 flex items-center justify-center gap-1">
                  <IndianRupee className="h-5 w-5 text-accent" />
                  <span className="text-2xl font-bold text-foreground">1,000</span>
                </div>
                <p className="text-sm text-muted-foreground">Per Person Budget</p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex items-center justify-center gap-1">
                  <Users className="h-5 w-5 text-secondary" />
                  <span className="text-2xl font-bold text-foreground">9</span>
                </div>
                <p className="text-sm text-muted-foreground">Group Members</p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 text-palm" />
                  <span className="text-2xl font-bold text-foreground">4.5+</span>
                </div>
                <p className="text-sm text-muted-foreground">Rating Required</p>
              </div>
            </div>

            <div className="rounded-2xl bg-accent/10 p-6 text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <HelpCircle className="h-5 w-5 text-accent" />
                <span className="font-semibold text-foreground">Selection Status</span>
              </div>
              <p className="text-muted-foreground">
                The final cruise selection is pending and will be updated based on 
                group voting and availability. We're looking for the best reviews 
                within our budget.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-secondary/20 px-4 py-2 text-sm font-medium text-secondary">
                Sunset Views
              </span>
              <span className="rounded-full bg-palm/20 px-4 py-2 text-sm font-medium text-palm">
                Buffet Dinner
              </span>
              <span className="rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
                Live Music
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CruiseSection;