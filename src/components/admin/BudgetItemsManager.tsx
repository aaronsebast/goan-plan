import { useState, useEffect } from "react";
import { Wallet, Plus, Trash2, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface BudgetItem {
  id: string;
  created_at: string;
  updated_at: string;
  category: string | null;
  title: string | null;
  amount: number;
  paid_by: string | null;
  notes: string | null;
  trip_id: string | null;
}

const CATEGORIES = ["Transport", "Food", "Stay", "Activities", "Shopping", "Other"];

const BudgetItemsManager = () => {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", category: "Other", amount: "", paid_by: "", notes: "" });

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("BudgetItems" as any)
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setItems((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("admin-budget-items")
      .on("postgres_changes", { event: "*", schema: "public", table: "BudgetItems" }, () => fetchData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const resetForm = () => {
    setForm({ title: "", category: "Other", amount: "", paid_by: "", notes: "" });
    setEditId(null);
    setShowForm(false);
  };

  const startEdit = (item: BudgetItem) => {
    setForm({
      title: item.title || "",
      category: item.category || "Other",
      amount: String(item.amount || 0),
      paid_by: item.paid_by || "",
      notes: item.notes || "",
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title) { toast({ title: "Error", description: "Title is required.", variant: "destructive" }); return; }
    setSaving(true);

    const payload = {
      title: form.title,
      category: form.category,
      amount: Number(form.amount) || 0,
      paid_by: form.paid_by,
      notes: form.notes,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("BudgetItems" as any).update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("BudgetItems" as any).insert(payload));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: "Failed to save.", variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: editId ? "Budget item updated." : "Budget item added." });
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("BudgetItems" as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Budget item removed." });
    }
  };

  const total = items.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const byCategory = items.reduce((acc, i) => {
    const cat = i.category || "Other";
    acc[cat] = (acc[cat] || 0) + Number(i.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="border-secondary/20 shadow-lg">
      <CardHeader className="border-b bg-secondary/5">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-3 text-secondary">
            <Wallet className="h-6 w-6" />
            Budget Items
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-bold">
              ₹{total.toLocaleString("en-IN")}
            </Badge>
            <Button size="sm" onClick={() => { resetForm(); setShowForm(true); }} className="h-8 gap-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Category Summary */}
        {Object.keys(byCategory).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(byCategory).map(([cat, amt]) => (
              <Badge key={cat} variant="outline" className="text-xs">
                {cat}: ₹{amt.toLocaleString("en-IN")}
              </Badge>
            ))}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <Input type="number" placeholder="Amount (₹)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              <Input placeholder="Paid by" value={form.paid_by} onChange={(e) => setForm({ ...form, paid_by: e.target.value })} />
            </div>
            <Input placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} className="gap-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Save className="h-4 w-4" /> {saving ? "Saving..." : editId ? "Update" : "Add Item"}
              </Button>
              <Button variant="ghost" onClick={resetForm}><X className="h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {/* Items List */}
        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">No budget items yet. Click "Add" to create one.</div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-muted/20 px-4 py-3 hover:bg-muted/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm truncate">{item.title}</span>
                    <Badge variant="outline" className="text-[10px] shrink-0">{item.category}</Badge>
                  </div>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                    {item.paid_by && <span>Paid by {item.paid_by}</span>}
                    {item.notes && <span>· {item.notes}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="font-bold text-sm text-secondary">₹{Number(item.amount).toLocaleString("en-IN")}</span>
                  <Button variant="ghost" size="sm" onClick={() => startEdit(item)} className="h-7 px-2 text-xs">Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="h-7 px-2 text-xs text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetItemsManager;
