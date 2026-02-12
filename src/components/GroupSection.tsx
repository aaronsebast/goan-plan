import { motion } from "framer-motion";
import { User } from "lucide-react";
import haydenProfile from "@/assets/hayden-profile.jpg";
import meghaProfile from "@/assets/megha-profile.jpg";
import alterProfile from "@/assets/alter-profile.jpg";
import sinojProfile from "@/assets/sinoj-profile.jpg";
import nithinProfile from "@/assets/nithin-profile.jpg";
import francisProfile from "@/assets/francis-profile.jpg";
import sonuProfile from "@/assets/sonu-profile.jpg";
import aaronProfile from "@/assets/aaron-profile.jpg";
import aldrenaProfile from "@/assets/aldrena-profile.jpg";
import henoshProfile from "@/assets/henosh-profile.jpg";

const groupMembers: { name: string; initial: string; image: string }[] = [
  { name: "Aaron", initial: "A", image: aaronProfile },
  { name: "Aldrena", initial: "A", image: aldrenaProfile },
  { name: "Francis", initial: "F", image: francisProfile },
  { name: "Sinoj", initial: "S", image: sinojProfile },
  { name: "Henosh", initial: "H", image: henoshProfile },
  { name: "Nithin", initial: "N", image: nithinProfile },
  { name: "Sonu", initial: "S", image: sonuProfile },
  { name: "Hayden", initial: "H", image: haydenProfile },
  { name: "Megha", initial: "M", image: meghaProfile },
  { name: "Alter", initial: "A", image: alterProfile },
];

interface GroupSectionProps {
  preview?: boolean;
}

const GroupSection = ({ preview = false }: GroupSectionProps) => {
  const displayMembers = preview ? groupMembers.slice(0, 5) : groupMembers;

  return (
    <section id="group" className={`relative ${preview ? "py-12" : "py-24 md:py-32"}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The Travelers
          </span>
          <h2 className="luxury-heading text-3xl font-semibold text-foreground md:text-4xl">
            Our Group of <span className="italic text-primary">Ten</span>
          </h2>
        </motion.div>

        {/* Group Grid */}
        <div className={`mx-auto grid max-w-4xl ${preview ? "grid-cols-5 gap-4" : "grid-cols-3 gap-4 md:grid-cols-5 md:gap-6"}`}>
          {displayMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative"
            >
              <div className="glass-card card-hover-lift flex flex-col items-center rounded-2xl p-4 md:p-5">
                {/* Avatar */}
                <div className="mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary/30 md:h-20 md:w-20">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                </div>

                {/* Name */}
                <span className="text-sm font-medium text-foreground md:text-base">
                  {member.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {preview && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            +5 more travelers
          </motion.p>
        )}

        {!preview && (
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
        )}
      </div>
    </section>
  );
};

export default GroupSection;
