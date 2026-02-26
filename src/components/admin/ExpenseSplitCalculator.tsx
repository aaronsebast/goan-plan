import { useState, useEffect } from "react";
import { Calculator, Users, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { writeAuditLog } from "@/lib/auditLog";

interface Member { id: string; name: string; }

const ExpenseSplitCalculator = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data } = await supabase.from("trip_members").select("id, name").eq("is_active", true).order("name");
      if (data) {
        setMembers(data);
        setSelectedMembers(new Set(data.map(m => m.id)));
      }
      setLoading(false);
    };
    fetchMembers();
  }, []);

  const toggleMember = (id: string) => {
    setSelectedMembers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedMembers(new Set(members.map(m => m.id)));
  const deselectAll = () => setSelectedMembers(new Set());

  const perPerson = selectedMembers.size > 0 ? totalExpense / selectedMembers.size : 0;

  const handleSave = async () => {
    if (totalExpense <= 0 || selectedMembers.size === 0) {
      toast({ title: "Invalid", description: "Enter amount and select members", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        expense_date: new Date().toISOString().split("T")[0],
        expense_type: "Extra" as const,
        description: description || `Split expense (${selectedMembers.size} members)`,
        amount: totalExpense,
        paid_by_label: "Group",
      };
      const { data, error } = await supabase.from("extra_expenses").insert(payload).select().single();
      if (error) throw error;
      await writeAuditLog({
        actionType: "CREATE",
        tableName: "extra_expenses",
        recordId: data.id,
        afterValue: {
          ...data,
          split_among: Array.from(selectedMembers).map(id => members.find(m => m.id === id)?.name),
          per_person: Math.round(perPerson),
        },
      });
      toast({ title: "Saved!", description: `₹${Math.round(perPerson)} per person for ${selectedMembers.size} members` });
      setTotalExpense(0);
      setDescription("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse text-muted-foreground p-4">Loading...</div>;

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="border-b bg-primary/5">
        <CardTitle className="flex items-center gap-3 text-primary">
          <Calculator className="h-6 w-6" /> Auto Expense Split Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        {/* Total Expense Input */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Total Expense (₹)</label>
          <Input
            type="number"
            value={totalExpense || ""}
            onChange={e => setTotalExpense(Number(e.target.value))}
            placeholder="Enter total amount"
            className="text-lg font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Description (optional)</label>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g. Scooter rental, Dinner"
          />
        </div>

        {/* Member Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> Select Members ({selectedMembers.size}/{members.length})
            </label>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2" onClick={selectAll}>All</Button>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2" onClick={deselectAll}>None</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {members.map(m => (
              <label
                key={m.id}
                className={`flex items-center gap-2 rounded-lg border p-2.5 cursor-pointer transition-all ${
                  selectedMembers.has(m.id) ? "border-primary/50 bg-primary/10" : "border-border bg-muted/20"
                }`}
              >
                <Checkbox
                  checked={selectedMembers.has(m.id)}
                  onCheckedChange={() => toggleMember(m.id)}
                />
                <span className="text-sm font-medium text-foreground">{m.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Split Result */}
        {totalExpense > 0 && selectedMembers.size > 0 && (
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Per Person Share</p>
            <p className="text-3xl font-bold text-primary">₹{Math.round(perPerson).toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ₹{totalExpense.toLocaleString("en-IN")} ÷ {selectedMembers.size} members
            </p>
          </div>
        )}

        <Button onClick={handleSave} disabled={saving || totalExpense <= 0 || selectedMembers.size === 0} className="w-full gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Split Expense"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExpenseSplitCalculator;
