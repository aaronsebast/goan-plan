import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, MapPin, X, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MEMBERS = [
  "Aaron", "Aldrena", "Francis", "Sinoj", "Henosh",
  "Nithin", "Sonu", "Hayden", "Megha", "Alter",
];

const ADMIN_PHONE = "919633351696";

const EmergencyHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const isMobile = useIsMobile();

  const getMessage = () =>
    encodeURIComponent(
      `🚨 EMERGENCY ALERT\n\nName: ${selectedName}\n\nI need immediate help.\nI will share my live location now.`
    );

  const sendAlert = () => {
    if (!selectedName) return;
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${getMessage()}`, "_blank");
  };

  const openMaps = () => {
    window.open("https://www.google.com/maps/@15.4909,73.8278,13z", "_blank");
  };

  const panelContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`${
        isMobile
          ? "fixed inset-x-0 bottom-0 z-[60] rounded-t-2xl"
          : "fixed bottom-24 right-6 z-[60] w-[420px] rounded-2xl"
      } border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl p-6 text-white`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <h2 className="text-lg font-bold tracking-tight">Emergency Help</h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Who needs help */}
      <label className="block text-sm font-medium text-white/80 mb-2">
        Who needs help? <span className="text-red-400">*</span>
      </label>
      <select
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white text-base mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
      >
        <option value="" className="bg-gray-900">Select a person</option>
        {MEMBERS.map((m) => (
          <option key={m} value={m} className="bg-gray-900">{m}</option>
        ))}
      </select>

      {/* Preview message */}
      {selectedName && (
        <div className="rounded-lg bg-white/5 border border-white/10 p-3 mb-4 text-sm text-white/70 leading-relaxed">
          🚨 EMERGENCY ALERT<br />
          Name: {selectedName}<br />
          I need immediate help.<br />
          I will share my live location now.
        </div>
      )}

      {/* Send Alert CTA */}
      <button
        onClick={sendAlert}
        disabled={!selectedName}
        className="w-full rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed py-4 text-lg font-bold transition-colors flex items-center justify-center gap-2 mb-4"
      >
        <MessageCircle className="h-5 w-5" />
        Send Emergency Alert
      </button>

      {/* Location guidance */}
      <p className="text-xs text-white/50 mb-5 text-center leading-relaxed">
        After sending the message, please share <strong className="text-white/70">Live Location</strong> via WhatsApp (1 hour / 8 hours).
      </p>

      {/* Quick contacts */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <a
          href={`tel:+${ADMIN_PHONE}`}
          className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 py-3 px-2 transition-colors text-center"
        >
          <Phone className="h-5 w-5 text-green-400" />
          <span className="text-xs font-medium">Call Admin</span>
        </a>
        <a
          href="tel:112"
          className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 py-3 px-2 transition-colors text-center"
        >
          <Phone className="h-5 w-5 text-yellow-400" />
          <span className="text-xs font-medium">Call 112</span>
        </a>
        <button
          onClick={openMaps}
          className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 py-3 px-2 transition-colors text-center"
        >
          <MapPin className="h-5 w-5 text-blue-400" />
          <span className="text-xs font-medium">My Location</span>
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-white/40 text-center leading-relaxed">
        This feature alerts the trip admin. For immediate danger, contact local emergency services (112).
      </p>
    </motion.div>
  );

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-700 text-white px-5 py-3.5 shadow-lg shadow-red-900/30 transition-colors animate-[pulse_3s_ease-in-out_infinite]"
        style={{ animationName: "emergencyPulse" }}
      >
        <AlertTriangle className="h-5 w-5" />
        <span className="font-semibold text-sm">Emergency Help</span>
      </button>

      {/* Overlay + Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
            />
            {panelContent}
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes emergencyPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
        }
      `}</style>
    </>
  );
};

export default EmergencyHelp;
