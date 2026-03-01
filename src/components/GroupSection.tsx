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
// rahulProfile removed - using placeholder

const groupMembers: { name: string; fullName: string; initial: string; image: string }[] = [
  { name: "Aaron", fullName: "Aaron Sebastian", initial: "A", image: aaronProfile },
  { name: "Aldrena", fullName: "Ann Mary Aldrena", initial: "A", image: aldrenaProfile },
  { name: "Francis", fullName: "Francis Xavier", initial: "F", image: francisProfile },
  { name: "Sinoj", fullName: "Sinoj P J", initial: "S", image: sinojProfile },
  { name: "Henosh", fullName: "Henosh Antony Jacob", initial: "H", image: henoshProfile },
  { name: "Nithin", fullName: "Nithin Antony", initial: "N", image: nithinProfile },
  { name: "Sonu", fullName: "Antony Sonu K S", initial: "S", image: sonuProfile },
  { name: "Hayden", fullName: "Hayden Fernandez", initial: "H", image: haydenProfile },
  { name: "Megha", fullName: "Megha C A", initial: "M", image: meghaProfile },
  { name: "Alter", fullName: "Alter John Marian", initial: "A", image: alterProfile },
  { name: "Rahul", fullName: "Rahul Reji", initial: "R", image: "" },
];

interface GroupSectionProps {
  preview?: boolean;
}

const GroupSection = ({ preview = false }: GroupSectionProps) => {
  return (
    <section id="group" className={`relative ${preview ? "py-12" : "py-24 md:py-32"}`}>
      <div className="container mx-auto px-6">
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
            Our Group of <span className="italic text-primary">Eleven</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">11 Members – All Confirmed</p>
        </motion.div>

        <div className={`mx-auto grid max-w-5xl ${preview ? "grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 md:gap-6"}`}>
          {groupMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative"
            >
              <div className="glass-card card-hover-lift flex flex-col items-center rounded-2xl p-4 md:p-5">
                <div className="mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary/30 md:h-20 md:w-20">
                  {member.image ? (
                    <img src={member.image} alt={member.fullName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-2xl font-bold text-muted-foreground">
                      {member.initial}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-foreground md:text-base">
                  {member.name}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">{member.fullName}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {!preview && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center text-muted-foreground"
          >
            <User className="mr-2 inline h-4 w-4" />
            11 friends, 4 days, 1 unforgettable adventure
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default GroupSection;
