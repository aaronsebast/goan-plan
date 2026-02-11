import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Save, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const SPONSOR_OPTIONS = ["Aaron", "Aldrena", "Hayden"];

const AccommodationManager = () => {
  const [totalAmount, setTotalAmount] = useState(15750);
  const [sponsors, setSponsors] = useState<string[]>(["Aaron", "Aldrena", "Hayden"]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("budget_accommodation" as any)
      .select("*")
      .limit(1)
      .maybeSingle();

    if (data) {
      const row = data as any;
      setRecordId(row.id);
      setTotalAmount(Number(row.total_amount) || 15750);
      setSponsors(Array.isArray(row.sponsors) ? row.sponsors : ["Aaron", "Aldrena", "Hayden"]);
      setNotes(row.notes || "");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      total_amount: totalAmount,
      sponsors: JSON.stringify(sponsors),
      notes,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (recordId) {
      ({ error } = await supabase
        .from("budget_accommodation" as any)
        .update(payload)
        .eq("id", recordId));
    } else {
      const { data, error: insertError } = await supabase
        .from("budget_accommodation" as any)
        .insert(payload)
        .select()
        .single();
      error = insertError;
      if (data) setRecordId((data as any).id);
    }

    // Write audit log
    await supabase.from("budget_audit_log" as any).insert({
      section: "Accommodation",
      action: "update",
      field_name: "total_amount, sponsors, notes",
      previous_value: "",
      new_value: `₹${totalAmount} | ${sponsors.join(", ")}`,
      changed_by: "admin",
    });

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: "Failed to save. Try again.", variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Accommodation data updated successfully." });
    }
  };

  const toggleSponsor = (name: string) => {
    setSponsors((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const perPerson = sponsors.length > 0 ? totalAmount / sponsors.length : 0;

  return (
    <Card className="border-secondary/20 shadow-lg">
      <CardHeader className="border-b bg-secondary/5">
        <CardTitle className="flex items-center gap-3 text-secondary">
          <Building2 className="h-6 w-6" />
          Accommodation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Total Amount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Total Amount (₹)</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              className="pl-9 text-lg font-semibold"
            />
          </div>
        </div>

        {/* Sponsors */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Sponsored By</label>
          <div className="flex flex-wrap gap-3">
            {SPONSOR_OPTIONS.map((name) => (
              <button
                key={name}
                onClick={() => toggleSponsor(name)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  sponsors.includes(name)
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        {sponsors.length > 0 && (
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="mb-3 text-sm font-medium text-foreground">Cost Breakdown</p>
            <div className="space-y-3">
              {sponsors.map((name) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{name}</span>
                  <span className="text-sm font-bold text-secondary">₹{perPerson.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t pt-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-accent">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Notes</label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes..."
            className="text-sm"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full gap-2 rounded-xl bg-secondary py-5 text-secondary-foreground hover:bg-secondary/90"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Update Accommodation"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccommodationManager;
