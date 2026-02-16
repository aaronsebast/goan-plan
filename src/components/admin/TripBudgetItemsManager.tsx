import { useState, useEffect } from "react";
import { Wallet, Plus, Trash2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { writeAuditLog } from "@/lib/auditLog";

interface BudgetItem { id: string; item_name: string; estimated_amount: number; actual_amount: number; status: string; note: string | null; }

const STATUSES = ["Planned", "Paid", "Cancelled"];

const TripBudgetItemsManager = () => {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ item_name: "", estimated_amount: 0, actual_amount: 0, status: "Planned", note: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<BudgetItem>>({});

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from("trip_budget_items").select("*").order("created_at");
    if (data) setItems(data);
    setLoading(false);
  };

  const addItem = async () => {
    if (!form.item_name.trim()) return;
    const { data, error } = await supabase.from("trip_budget_items").insert({ item_name: form.item_name, estimated_amount: form.estimated_amount, actual_amount: form.actual_amount, status: form.status, note: form.note || null }).select().single();
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    await writeAuditLog({ actionType: "CREATE", tableName: "trip_budget_items", recordId: data.id, afterValue: data });
    setForm({ item_name: "", estimated_amount: 0, actual_amount: 0, status: "Planned", note: "" });
    setShowForm(false);
    fetchItems();
    toast({ title: "Added" });
  };

  const saveEdit = async (item: BudgetItem) => {
    const update = { ...editForm, updated_at: new Date().toISOString() };
    await supabase.from("trip_budget_items").update(update).eq("id", item.id);
    await writeAuditLog({ actionType: "UPDATE", tableName: "trip_budget_items", recordId: item.id, beforeValue: item, afterValue: { ...item, ...update } });
    setEditingId(null);
    fetchItems();
    toast({ title: "Updated" });
  };

  const deleteItem = async (item: BudgetItem) => {
    if (!confirm(`Delete "${item.item_name}"?`)) return;
    await writeAuditLog({ actionType: "DELETE", tableName: "trip_budget_items", recordId: item.id, beforeValue: item });
    await supabase.from("trip_budget_items").delete().eq("id", item.id);
    fetchItems();
    toast({ title: "Deleted" });
  };

  const totalEstimated = items.reduce((s, i) => s + i.estimated_amount, 0);
  const totalActual = items.reduce((s, i) => s + i.actual_amount, 0);
  const diff = totalEstimated - totalActual;

  const statusColor = (s: string) => s === "Paid" ? "bg-green-500/20 text-green-600" : s === "Cancelled" ? "bg-red-500/20 text-red-600" : "bg-blue-500/20 text-blue-600";

  return (
    <Card className="border-blue-500/20 shadow-lg">
      <CardHeader className="border-b bg-blue-500/5">
        <CardTitle className="flex items-center gap-3 text-blue-600">
          <Wallet className="h-6 w-6" /> Budget Items
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-blue-500/10 p-3 text-center">
            <p className="text-xs text-muted-foreground">Estimated</p>
            <p className="text-lg font-bold text-blue-600">₹{totalEstimated.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-lg bg-green-500/10 p-3 text-center">
            <p className="text-xs text-muted-foreground">Actual</p>
            <p className="text-lg font-bold text-green-600">₹{totalActual.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Difference</p>
            <p className={`text-lg font-bold ${diff >= 0 ? "text-green-600" : "text-red-600"}`}>{diff >= 0 ? "+" : ""}₹{diff.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <Button onClick={() => setShowForm(!showForm)} variant="outline" className="gap-1 w-full"><Plus className="h-4 w-4" /> Add Item</Button>

        {showForm && (
          <div className="rounded-xl border p-4 bg-muted/20 space-y-3">
            <Input placeholder="Item name..." value={form.item_name} onChange={e => setForm(f => ({ ...f, item_name: e.target.value }))} className="h-8 text-sm" />
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Estimated (₹)</label>
                <Input type="number" value={form.estimated_amount} onChange={e => setForm(f => ({ ...f, estimated_amount: Number(e.target.value) }))} className="h-8 text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Actual (₹)</label>
                <Input type="number" value={form.actual_amount} onChange={e => setForm(f => ({ ...f, actual_amount: Number(e.target.value) }))} className="h-8 text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Status</label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Input placeholder="Notes..." value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} className="h-8 text-sm" />
            <Button onClick={addItem} className="w-full" size="sm">Save Item</Button>
          </div>
        )}

        {/* Items List */}
        {loading ? <div className="py-4 text-center text-muted-foreground animate-pulse">Loading...</div> : (
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="rounded-lg border p-3 bg-muted/20">
                {editingId === item.id ? (
                  <div className="space-y-2">
                    <Input value={editForm.item_name || ""} onChange={e => setEditForm(f => ({ ...f, item_name: e.target.value }))} className="h-8 text-sm" />
                    <div className="grid grid-cols-3 gap-2">
                      <Input type="number" value={editForm.estimated_amount || 0} onChange={e => setEditForm(f => ({ ...f, estimated_amount: Number(e.target.value) }))} className="h-8 text-sm" />
                      <Input type="number" value={editForm.actual_amount || 0} onChange={e => setEditForm(f => ({ ...f, actual_amount: Number(e.target.value) }))} className="h-8 text-sm" />
                      <Select value={editForm.status || "Planned"} onValueChange={v => setEditForm(f => ({ ...f, status: v }))}>
                        <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => saveEdit(item)} className="gap-1"><Save className="h-3.5 w-3.5" /> Save</Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{item.item_name}</span>
                        <Badge className={`text-xs ${statusColor(item.status)}`}>{item.status}</Badge>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span>Est: ₹{item.estimated_amount.toLocaleString("en-IN")}</span>
                        <span>Act: ₹{item.actual_amount.toLocaleString("en-IN")}</span>
                        {item.note && <span className="truncate">Note: {item.note}</span>}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => { setEditingId(item.id); setEditForm(item); }}>Edit</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteItem(item)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                )}
              </div>
            ))}
            {items.length === 0 && <p className="text-center text-muted-foreground py-4">No budget items yet.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TripBudgetItemsManager;
