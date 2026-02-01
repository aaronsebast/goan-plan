import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Luggage, Sun, Shirt, Zap, Shield, Droplets, Pill, ShoppingBag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const packingItems = [
  { id: "beachwear", label: "Beachwear & Swimsuit", icon: Shirt, category: "clothing" },
  { id: "flipflops", label: "Flip-flops", icon: ShoppingBag, category: "clothing" },
  { id: "sunscreen", label: "Sunscreen (SPF 50+)", icon: Sun, category: "essentials" },
  { id: "sunglasses", label: "Sunglasses", icon: Sun, category: "essentials" },
  { id: "chargers", label: "Chargers & Power Bank", icon: Zap, category: "electronics" },
  { id: "helmet", label: "Bike Gear (Helmet, Gloves)", icon: Shield, category: "gear" },
  { id: "rainjacket", label: "Light Rain Jacket", icon: Droplets, category: "clothing" },
  { id: "medicines", label: "Basic Medicines", icon: Pill, category: "essentials" },
  { id: "camera", label: "Camera / GoPro", icon: Sun, category: "electronics" },
  { id: "cashcard", label: "Cash & Cards", icon: ShoppingBag, category: "essentials" },
  { id: "idproof", label: "ID Proofs", icon: Shield, category: "essentials" },
  { id: "towel", label: "Quick-dry Towel", icon: Shirt, category: "essentials" },
];

const STORAGE_KEY = "goa-packing-checklist";

const PackingChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const markAllAsPacked = () => {
    const allChecked = packingItems.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setCheckedItems(allChecked);
  };

  const clearAll = () => {
    setCheckedItems({});
  };

  const packedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = (packedCount / packingItems.length) * 100;

  return (
    <section id="packing" className="relative py-24 md:py-32">
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
            Get Ready
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Packing <span className="italic">Checklist</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Make sure you don't forget the essentials for the trip
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Luggage className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">
                {packedCount} of {packingItems.length} items packed
              </span>
            </div>
            <span className="text-sm font-semibold text-accent">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-gradient-sunset"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 flex max-w-2xl justify-center gap-4"
        >
          <Button
            onClick={markAllAsPacked}
            className="gap-2 rounded-full bg-palm text-palm-foreground hover:bg-palm/90"
          >
            <Check className="h-4 w-4" />
            Mark All as Packed
          </Button>
          <Button
            variant="outline"
            onClick={clearAll}
            className="rounded-full"
          >
            Clear All
          </Button>
        </motion.div>

        {/* Checklist Grid */}
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packingItems.map((item, index) => {
            const Icon = item.icon;
            const isChecked = checkedItems[item.id] || false;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => toggleItem(item.id)}
                className={`glass-card flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all hover:scale-[1.02] ${
                  isChecked ? "bg-palm/10 ring-2 ring-palm" : ""
                }`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="h-5 w-5"
                />
                <Icon className={`h-5 w-5 ${isChecked ? "text-palm" : "text-muted-foreground"}`} />
                <span
                  className={`text-sm font-medium transition-all ${
                    isChecked ? "text-palm line-through" : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PackingChecklist;
