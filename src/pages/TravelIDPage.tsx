import { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, Clock, ShieldCheck, FileText, Phone, User, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroSunset from "@/assets/hero-goa-sunset.jpg";

const MEMBERS = ["Aaron", "Aldrena", "Alter", "Francis", "Hayden", "Henosh", "Megha", "Nithin", "Sinoj", "Sonu"];
const ID_TYPES = ["Aadhaar", "Passport", "Driving Licence", "Other"];
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;

interface Submission {
  member_name: string;
  submitted: boolean;
  submitted_at: string | null;
}

const TravelIDPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [closed, setClosed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [idType, setIdType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    const [{ data: subs }, { data: settings }] = await Promise.all([
      supabase.from("travel_id_status").select("member_name, submitted, submitted_at").order("member_name") as any,
      supabase.from("app_settings").select("value").eq("key", "travel_id_collection_closed").single(),
    ]);
    if (subs) setSubmissions(subs as Submission[]);
    if (settings) setClosed(settings.value === true || settings.value === "true");
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("travel-id-tracker")
      .on("postgres_changes", { event: "*", schema: "public", table: "travel_id_submissions" }, () => fetchData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchData]);

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!ALLOWED_TYPES.includes(f.type)) { setError("Only PDF, JPG, and PNG files are allowed."); return; }
    if (f.size > MAX_SIZE) { setError("File must be under 5MB."); return; }
    setError("");
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !idType || !file) { setError("Please fill all fields."); return; }
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("memberName", name);
      formData.append("phone", phone);
      formData.append("idType", idType);

      const { data, error: fnError } = await supabase.functions.invoke("upload-travel-id", {
        body: formData,
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setSuccess(true);
      setFile(null);
      fetchData();
    } catch (err: any) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submittedMember = submissions.find((s) => s.member_name === name);
  const alreadySubmitted = submittedMember?.submitted;

  return (
    <div className="min-h-screen page-enter">
      <Navigation />
      <PageHero title="Travel" titleAccent="ID" subtitle="Securely submit your travel identification document" tag="Secure Upload" backgroundImage={heroSunset} />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {closed ? (
                  <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 text-center rounded-2xl">
                    <AlertCircle className="mx-auto mb-4 h-12 w-12 text-secondary" />
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">Collection Closed</h3>
                    <p className="text-muted-foreground">Travel ID collection is currently closed.</p>
                  </motion.div>
                ) : success ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center rounded-2xl">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-primary" />
                    </motion.div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">Securely Submitted</h3>
                    <p className="text-muted-foreground mb-4">Your Travel ID has been securely submitted.</p>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Your document is securely uploaded to a private folder and is not publicly accessible.
                    </div>
                    <button onClick={() => { setSuccess(false); setName(""); setPhone(""); setIdType(""); }} className="mt-6 rounded-xl bg-primary/10 px-6 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-all">
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
                    <h3 className="font-serif text-xl font-semibold text-foreground">Submit Your Travel ID</h3>

                    {/* Name */}
                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                        <User className="h-4 w-4 text-primary" /> Member Name
                      </label>
                      <select value={name} onChange={(e) => { setName(e.target.value); setError(""); }} className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Select your name</option>
                        {MEMBERS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                      {alreadySubmitted && (
                        <p className="mt-1 text-xs text-primary flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Already submitted — uploading will replace your previous file.</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Phone className="h-4 w-4 text-primary" /> Phone Number
                      </label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>

                    {/* ID Type */}
                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                        <FileText className="h-4 w-4 text-primary" /> ID Type
                      </label>
                      <select value={idType} onChange={(e) => setIdType(e.target.value)} className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Select ID type</option>
                        {ID_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="mb-1.5 text-sm font-medium text-foreground">Upload Document</label>
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                        onClick={() => document.getElementById("file-input")?.click()}
                        className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${dragOver ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/50 hover:bg-primary/5"}`}
                      >
                        <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                        {file ? (
                          <p className="text-sm font-medium text-foreground">{file.name}</p>
                        ) : (
                          <>
                            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                            <p className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG · Max 5MB</p>
                          </>
                        )}
                        <input id="file-input" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile(e.target.files?.[0] || null)} className="hidden" />
                      </div>
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <button type="submit" disabled={loading} className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? "Uploading..." : "Submit Securely"}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                      Your document is securely uploaded to a private folder and is not publicly accessible.
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Tracker */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Submission Tracker</h3>
                <div className="space-y-3">
                  {submissions.map((s) => (
                    <div key={s.member_name} className="flex items-center justify-between rounded-xl bg-muted/20 px-4 py-3">
                      <span className="text-sm font-medium text-foreground">{s.member_name}</span>
                      {s.submitted ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                          <CheckCircle2 className="h-4 w-4" /> Submitted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <Clock className="h-4 w-4" /> Pending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TravelIDPage;
