import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, MapPin, X, MessageCircle, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MEMBERS = [
  "Aaron", "Aldrena", "Francis", "Sinoj", "Henosh",
  "Nithin", "Sonu", "Hayden", "Megha", "Alter",
];

const REASONS = ["Lost", "Unsafe", "Injured", "Other"] as const;

const ADMIN_PHONE = "919633351696";

const EmergencyHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [reason, setReason] = useState("");
  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locError, setLocError] = useState("");
  const [sent, setSent] = useState(false);
  const isMobile = useIsMobile();

  const grabLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported");
      return;
    }
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocError("Location access denied. You can still send without it.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setSent(false);
    grabLocation();
  };

  const getMessage = () => {
    const now = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    const locationLine = coords
      ? `https://maps.google.com/?q=${coords.lat},${coords.lng}`
      : "Location unavailable";
    return encodeURIComponent(
      `🚨 EMERGENCY ALERT\n\nName: ${selectedName}\nReason: ${reason || "Not specified"}\n\nCurrent Location:\n${locationLine}\n\nTime: ${now}\n\nI will share live location next.`
    );
  };

  const sendAlert = () => {
    if (!selectedName) return;
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${getMessage()}`, "_blank");
    setSent(true);
  };

  const openMaps = () => {
    if (coords) {
      window.open(`https://maps.google.com/?q=${coords.lat},${coords.lng}`, "_blank");
    } else {
      window.open("https://www.google.com/maps/@15.4909,73.8278,13z", "_blank");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSent(false);
    setSelectedName("");
    setReason("");
    setCoords(null);
    setLocError("");
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
          onClick={handleClose}
          className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {sent ? (
        /* Post-send instructions */
        <div className="space-y-4">
          <div className="rounded-xl bg-green-600/20 border border-green-500/30 p-4 text-center">
            <p className="text-green-300 font-semibold text-base mb-1">✅ Alert Sent</p>
            <p className="text-sm text-white/70">Now share your live location in WhatsApp:</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-sm text-white/80 space-y-2">
            <p className="font-medium text-white/90">📍 Share Live Location:</p>
            <ol className="list-decimal list-inside space-y-1 text-white/70">
              <li>Open the WhatsApp chat with Admin</li>
              <li>Tap <strong className="text-white/90">📎 Attach → Location</strong></li>
              <li>Select <strong className="text-white/90">Share Live Location</strong></li>
              <li>Choose <strong className="text-white/90">15 min / 1 hour / 8 hours</strong></li>
            </ol>
          </div>
          <button
            onClick={handleClose}
            className="w-full rounded-xl bg-white/10 hover:bg-white/15 py-3 text-sm font-medium transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        /* Form */
        <>
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

          {/* Reason (optional) */}
          <label className="block text-sm font-medium text-white/80 mb-2">
            Reason <span className="text-white/40">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {REASONS.map((r) => (
              <button
                key={r}
                onClick={() => setReason(reason === r ? "" : r)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
                  reason === r
                    ? "bg-red-600/30 border-red-500/50 text-red-200"
                    : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Location status */}
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 mb-4 text-sm">
            {locating ? (
              <span className="flex items-center gap-2 text-yellow-300">
                <Loader2 className="h-4 w-4 animate-spin" /> Getting your location…
              </span>
            ) : coords ? (
              <span className="flex items-center gap-2 text-green-300">
                <MapPin className="h-4 w-4" /> Location captured ({coords.lat.toFixed(4)}, {coords.lng.toFixed(4)})
              </span>
            ) : locError ? (
              <span className="text-yellow-300 text-xs">{locError}</span>
            ) : null}
          </div>

          {/* Preview message */}
          {selectedName && (
            <div className="rounded-lg bg-white/5 border border-white/10 p-3 mb-4 text-sm text-white/70 leading-relaxed">
              🚨 EMERGENCY ALERT<br />
              Name: {selectedName}<br />
              Reason: {reason || "Not specified"}<br />
              Location: {coords ? "📍 Attached" : "Unavailable"}<br />
              I will share live location next.
            </div>
          )}

          {/* Send Alert CTA */}
          <button
            onClick={sendAlert}
            disabled={!selectedName}
            className="w-full rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed py-4 text-lg font-bold transition-colors flex items-center justify-center gap-2 mb-4"
          >
            <MessageCircle className="h-5 w-5" />
            Send Emergency Alert via WhatsApp
          </button>

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
            Location access requires user permission. Live location must be shared manually via WhatsApp. For immediate danger, contact 112.
          </p>
        </>
      )}
    </motion.div>
  );

  return (
    <>
      {/* Floating button */}
      <button
        onClick={handleOpen}
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
              onClick={handleClose}
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
