import { useState, useEffect } from "react";
import { Receipt, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { writeAuditLog } from "@/lib/auditLog";

interface Member { id: string; name: string; }
interface Expense { id: string; expense_date: string; expense_type: string; description: string | null; amount: number; paid_by_member_id: string | null; paid_by_label: string | null; }

const ExtraExpensesManager = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ expense_date: new Date().toISOString().split("T")[0], expense_type: "Borrow", description: "", amount: 0, paid_by_member_id: "", paid_by_label: "" });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [eRes, mRes] = await Promise.all([
      supabase.from("extra_expenses").select("*").order("expense_date", { ascending: false }),
      supabase.from("trip_members").select("id, name").eq("is_active", true).order("name"),
    ]);
    if (eRes.data) setExpenses(eRes.data);
    if (mRes.data) setMembers(mRes.data);
    setLoading(false);
  };

  const getName = (id: string | null) => id ? members.find(m => m.id === id)?.name || "Unknown" : null;

  const addExpense = async () => {
    const payload: any = {
      expense_date: form.expense_date,
      expense_type: form.expense_type,
      description: form.description || null,
      amount: form.amount,
      paid_by_member_id: form.paid_by_member_id || null,
      paid_by_label: form.paid_by_label || (form.paid_by_member_id ? null : "Group"),
    };
    const { data, error } = await supabase.from("extra_expenses").insert(payload).select().single();
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    await writeAuditLog({ actionType: "CREATE", tableName: "extra_expenses", recordId: data.id, afterValue: data });
    setForm({ expense_date: new Date().toISOString().split("T")[0], expense_type: "Borrow", description: "", amount: 0, paid_by_member_id: "", paid_by_label: "" });
    setShowForm(false);
    fetchAll();
    toast({ title: "Added" });
  };

  const deleteExpense = async (e: Expense) => {
    if (!confirm("Delete this expense?")) return;
    await writeAuditLog({ actionType: "DELETE", tableName: "extra_expenses", recordId: e.id, beforeValue: e });
    await supabase.from("extra_expenses").delete().eq("id", e.id);
    fetchAll();
    toast({ title: "Deleted" });
  };

  const totalBorrow = expenses.filter(e => e.expense_type === "Borrow").reduce((s, e) => s + e.amount, 0);
  const totalExtra = expenses.filter(e => e.expense_type === "Extra").reduce((s, e) => s + e.amount, 0);

  return (
    <Card className="border-orange-500/20 shadow-lg">
      <CardHeader className="border-b bg-orange-500/5">
        <CardTitle className="flex items-center gap-3 text-orange-600">
          <Receipt className="h-6 w-6" /> Borrow / Extra Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-orange-500/10 p-3 text-center">
            <p className="text-xs text-muted-foreground">Borrows</p>
            <p className="text-lg font-bold text-orange-600">₹{totalBorrow.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-3 text-center">
            <p className="text-xs text-muted-foreground">Extras</p>
            <p className="text-lg font-bold text-amber-600">₹{totalExtra.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-foreground">₹{(totalBorrow + totalExtra).toLocaleString("en-IN")}</p>
          </div>
        </div>

        <Button onClick={() => setShowForm(!showForm)} variant="outline" className="gap-1 w-full"><Plus className="h-4 w-4" /> Add Entry</Button>

        {showForm && (
          <div className="rounded-xl border p-4 bg-muted/20 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Date</label>
                <Input type="date" value={form.expense_date} onChange={e => setForm(f => ({ ...f, expense_date: e.target.value }))} className="h-8 text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Type</label>
                <Select value={form.expense_type} onValueChange={v => setForm(f => ({ ...f, expense_type: v }))}>
                  <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Borrow">Borrow</SelectItem>
                    <SelectItem value="Extra">Extra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Input placeholder="Description..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="h-8 text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Amount (₹)</label>
                <Input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} className="h-8 text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Paid By</label>
                <Select value={form.paid_by_member_id} onValueChange={v => setForm(f => ({ ...f, paid_by_member_id: v, paid_by_label: "" }))}>
                  <SelectTrigger className="h-8"><SelectValue placeholder="Group" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group">Group</SelectItem>
                    {members.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addExpense} className="w-full" size="sm">Save Entry</Button>
          </div>
        )}

        {/* Expense List */}
        {loading ? <div className="py-4 text-center text-muted-foreground animate-pulse">Loading...</div> : (
          <div className="space-y-2">
            {expenses.map(e => (
              <div key={e.id} className="flex items-center gap-3 rounded-lg border p-3 bg-muted/20">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${e.expense_type === "Borrow" ? "bg-orange-500/20 text-orange-600" : "bg-amber-500/20 text-amber-600"}`}>{e.expense_type}</span>
                    <span className="text-xs text-muted-foreground">{e.expense_date}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{e.description || "—"}</p>
                  <p className="text-xs text-muted-foreground">Paid by: {e.paid_by_member_id && e.paid_by_member_id !== "group" ? getName(e.paid_by_member_id) : e.paid_by_label || "Group"}</p>
                </div>
                <span className="font-bold text-foreground whitespace-nowrap">₹{e.amount.toLocaleString("en-IN")}</span>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteExpense(e)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            {expenses.length === 0 && <p className="text-center text-muted-foreground py-4">No entries yet.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExtraExpensesManager;
