import { motion } from "framer-motion";
import { User } from "lucide-react";
import haydenProfile from "@/assets/hayden-profile.jpg";
import meghaProfile from "@/assets/megha-profile.jpg";
import alterProfile from "@/assets/alter-profile.jpg";

const groupMembers: { name: string; initial: string; image?: string }[] = [
  { name: "Aaron", initial: "A" },
  { name: "Aldrena", initial: "A" },
  { name: "Francis", initial: "F" },
  { name: "Sinoj", initial: "S" },
  { name: "Henosh", initial: "H" },
  { name: "Nithin", initial: "N" },
  { name: "Sonu", initial: "S" },
  { name: "Hayden", initial: "H", image: haydenProfile },
  { name: "Megha", initial: "M", image: meghaProfile },
  { name: "Alter", initial: "A", image: alterProfile },
];

const GroupSection = () => {
  return (
    <section id="group" className="relative py-24 md:py-32">
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
            The Travelers
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Our Group of <span className="italic">Ten</span>
          </h2>
        </motion.div>

        {/* Group Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 md:grid-cols-5 md:gap-6">
          {groupMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-card relative flex flex-col items-center rounded-2xl p-4 md:p-6 transition-all hover:scale-105">
              {/* Avatar */}
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary md:h-16 md:w-16 overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xl font-semibold text-secondary-foreground md:text-2xl">
                      {member.initial}
                    </span>
                  )}
                </div>
                
                {/* Name */}
                <span className="text-sm font-medium text-foreground md:text-base">
                  {member.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-muted-foreground"
        >
          <User className="mr-2 inline h-4 w-4" />
          10 friends, 3 days, 1 unforgettable adventure
        </motion.p>
      </div>
    </section>
  );
};

export default GroupSection;