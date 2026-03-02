import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Save, X, Receipt, User, Calendar as CalendarIcon,
  DollarSign, Tag, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const SPENDERS = ["Aaron", "Aldrena", "Alter"] as const;
const CATEGORIES = ["Food", "Transport", "Entry", "Shopping", "Misc"] as const;

interface Expense {
  id: string;
  spender_name: string;
  expense_date: string;
  reason: string;
  amount: number;
  category: string;
}

const SponsorExpensesManager = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [form, setForm] = useState({
    spender_name: "Aaron",
    expense_date: new Date().toISOString().split("T")[0],
    reason: "",
    amount: 0,
    category: "Misc",
  });

  const [editForm, setEditForm] = useState({ ...form });

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from("sponsor_expenses")
      .select("*")
      .order("expense_date", { ascending: false });
    if (!error && data) setExpenses(data as Expense[]);
    setLoading(false);
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleAdd = async () => {
    if (!form.reason.trim() || form.amount <= 0) {
      toast({ title: "Validation", description: "Reason and amount are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("sponsor_expenses").insert({
      spender_name: form.spender_name,
      expense_date: form.expense_date,
      reason: form.reason.trim(),
      amount: form.amount,
      category: form.category,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Expense added" });
    setForm({ spender_name: "Aaron", expense_date: new Date().toISOString().split("T")[0], reason: "", amount: 0, category: "Misc" });
    setShowAdd(false);
    fetchExpenses();
  };

  const handleEdit = async () => {
    if (!editForm.reason.trim() || editForm.amount <= 0) {
      toast({ title: "Validation", description: "Reason and amount are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("sponsor_expenses")
      .update({
        spender_name: editForm.spender_name,
        expense_date: editForm.expense_date,
        reason: editForm.reason.trim(),
        amount: editForm.amount,
        category: editForm.category,
      })
      .eq("id", editingId!);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Expense updated" });
    setEditingId(null);
    fetchExpenses();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("sponsor_expenses").delete().eq("id", deleteTarget.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Expense deleted" });
      fetchExpenses();
    }
    setDeleteTarget(null);
  };

  const startEdit = (e: Expense) => {
    setEditForm({
      spender_name: e.spender_name,
      expense_date: e.expense_date,
      reason: e.reason,
      amount: e.amount,
      category: e.category || "Misc",
    });
    setEditingId(e.id);
  };

  const totals = SPENDERS.reduce((acc, s) => {
    acc[s] = expenses.filter((e) => e.spender_name === s).reduce((sum, e) => sum + Number(e.amount), 0);
    return acc;
  }, {} as Record<string, number>);
  const combinedTotal = Object.values(totals).reduce((a, b) => a + b, 0);

  const categoryColor = (c: string) => {
    const map: Record<string, string> = {
      Food: "bg-orange-500/20 text-orange-300",
      Transport: "bg-blue-500/20 text-blue-300",
      Entry: "bg-purple-500/20 text-purple-300",
      Shopping: "bg-pink-500/20 text-pink-300",
      Misc: "bg-gray-500/20 text-gray-300",
    };
    return map[c] || map.Misc;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SPENDERS.map((s) => (
          <Card key={s} className="border-border/50 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">{s}</p>
              <p className="text-xl font-bold text-foreground">₹{totals[s]?.toLocaleString() || 0}</p>
            </CardContent>
          </Card>
        ))}
        <Card className="border-secondary/30 bg-secondary/10 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-secondary">Combined Total</p>
            <p className="text-xl font-bold text-secondary">₹{combinedTotal.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Header + Add */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Receipt className="h-5 w-5 text-secondary" /> Sponsor Expense Board
          </CardTitle>
          <Button size="sm" onClick={() => setShowAdd(true)}>
            <Plus className="mr-1 h-4 w-4" /> Add Expense
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading…</p>
          ) : expenses.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No expenses yet. Add your first entry.</p>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Spender</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {expenses.map((e) => (
                        <motion.tr
                          key={e.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-border/30 transition-colors hover:bg-muted/30"
                        >
                          <TableCell className="text-xs">{e.expense_date}</TableCell>
                          <TableCell className="font-medium">{e.spender_name}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{e.reason}</TableCell>
                          <TableCell>
                            <span className={`rounded-full px-2 py-0.5 text-xs ${categoryColor(e.category)}`}>
                              {e.category || "Misc"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-semibold">₹{Number(e.amount).toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEdit(e)}>
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteTarget(e)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 sm:hidden">
                {expenses.map((e) => (
                  <Card key={e.id} className="border-border/30 bg-muted/20">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">{e.reason}</p>
                          <p className="text-xs text-muted-foreground">{e.spender_name} · {e.expense_date}</p>
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${categoryColor(e.category)}`}>
                            {e.category || "Misc"}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{Number(e.amount).toLocaleString()}</p>
                          <div className="mt-1 flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEdit(e)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteTarget(e)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> Add Expense</DialogTitle>
            <DialogDescription>Add a new sponsor expense entry.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> Spender</Label>
              <Select value={form.spender_name} onValueChange={(v) => setForm({ ...form, spender_name: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{SPENDERS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1"><CalendarIcon className="h-3.5 w-3.5" /> Date</Label>
              <Input type="date" value={form.expense_date} onChange={(e) => setForm({ ...form, expense_date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> Reason *</Label>
              <Input placeholder="e.g. Lunch – Baga" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> Amount (₹) *</Label>
              <Input type="number" min={0} value={form.amount || ""} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" /> Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={saving}>
              <Save className="mr-1 h-4 w-4" /> {saving ? "Saving…" : "Save Expense"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingId} onOpenChange={(o) => { if (!o) setEditingId(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Pencil className="h-5 w-5" /> Edit Expense</DialogTitle>
            <DialogDescription>Modify this expense entry.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Spender</Label>
              <Select value={editForm.spender_name} onValueChange={(v) => setEditForm({ ...editForm, spender_name: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{SPENDERS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input type="date" value={editForm.expense_date} onChange={(e) => setEditForm({ ...editForm, expense_date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Reason *</Label>
              <Input value={editForm.reason} onChange={(e) => setEditForm({ ...editForm, reason: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Amount (₹) *</Label>
              <Input type="number" min={0} value={editForm.amount || ""} onChange={(e) => setEditForm({ ...editForm, amount: Number(e.target.value) })} />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={editForm.category} onValueChange={(v) => setEditForm({ ...editForm, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
            <Button onClick={handleEdit} disabled={saving}>
              <Save className="mr-1 h-4 w-4" /> {saving ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default SponsorExpensesManager;
