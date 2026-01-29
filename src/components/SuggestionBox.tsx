import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Send, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Suggestion {
  id: string;
  name: string;
  text: string;
  timestamp: number;
}

const STORAGE_KEY = "goa-trip-suggestions";
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const SuggestionBox = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load suggestions from localStorage and filter expired ones
  useEffect(() => {
    const loadSuggestions = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Suggestion[] = JSON.parse(stored);
        const now = Date.now();
        const validSuggestions = parsed.filter(
          (s) => now - s.timestamp < EXPIRY_TIME
        );
        setSuggestions(validSuggestions);
        // Update storage with only valid suggestions
        localStorage.setItem(STORAGE_KEY, JSON.stringify(validSuggestions));
      }
    };

    loadSuggestions();
    // Check for expired suggestions every minute
    const interval = setInterval(loadSuggestions, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Please enter a suggestion");
      return;
    }

    setIsSubmitting(true);

    const newSuggestion: Suggestion = {
      id: crypto.randomUUID(),
      name: name.trim() || "Anonymous",
      text: text.trim(),
      timestamp: Date.now(),
    };

    const updatedSuggestions = [newSuggestion, ...suggestions];
    setSuggestions(updatedSuggestions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSuggestions));

    setName("");
    setText("");
    setIsSubmitting(false);
    toast.success("Thank you for your suggestion!");
  };

  const getTimeRemaining = (timestamp: number) => {
    const remaining = EXPIRY_TIME - (Date.now() - timestamp);
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <section id="suggestions" className="relative bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-secondary">
            Your Voice Matters
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Suggestion <span className="italic">Box</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Share your ideas, improvements, or feedback for the trip or website.
            All suggestions are visible and will be automatically removed after 24 hours.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {/* Submission Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Submit a Suggestion
                  </h3>
                </div>
                
                <Input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3 border-border/50 bg-background/50"
                  maxLength={50}
                />
                
                <Textarea
                  placeholder="Share your ideas or suggestions here…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[120px] resize-none border-border/50 bg-background/50"
                  maxLength={500}
                />
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {text.length}/500 characters
                  </span>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !text.trim()}
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Suggestions List */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {suggestions.length > 0 ? (
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                  <span>Recent Suggestions</span>
                  <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium text-secondary">
                    {suggestions.length}
                  </span>
                </h3>
                
                <AnimatePresence mode="popLayout">
                  {suggestions.map((suggestion) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl border border-border bg-card p-5 shadow-sm"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <span className="font-medium text-foreground">
                          {suggestion.name}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{getTimeRemaining(suggestion.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {suggestion.text}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
                <Lightbulb className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  No suggestions yet. Be the first to share your ideas!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuggestionBox;
