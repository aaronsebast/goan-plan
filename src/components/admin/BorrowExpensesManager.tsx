import { useState, useEffect } from "react";
import { HandCoins, Save, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface BorrowRow {
  id: string;
  borrower_name: string;
  lender_name: string;
  amount: number;
  reason: string;
  isNew?: boolean;
}

interface AuditEntry {
  section: string;
  action: string;
  field_name: string;
  previous_value: string;
  new_value: string;
  changed_by: string;
}

const BorrowExpensesManager = () => {
  const [borrows, setBorrows] = useState<BorrowRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase
      .from("budget_borrows" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setBorrows(
        (data as any[]).map((d) => ({
          id: d.id,
          borrower_name: d.borrower_name,
          lender_name: d.lender_name,
          amount: Number(d.amount) || 0,
          reason: d.reason || "",
        }))
      );
    }
  };

  const addRow = () => {
    setBorrows((prev) => [
      {
        id: crypto.randomUUID(),
        borrower_name: "",
        lender_name: "",
        amount: 0,
        reason: "",
        isNew: true,
      },
      ...prev,
    ]);
  };

  const removeRow = (id: string, isNew?: boolean) => {
    if (!isNew) setDeletedIds((prev) => [...prev, id]);
    setBorrows((prev) => prev.filter((b) => b.id !== id));
  };

  const updateField = (id: string, field: keyof BorrowRow, value: any) => {
    setBorrows((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    const auditEntries: AuditEntry[] = [];

    // Delete removed rows
    for (const id of deletedIds) {
      await supabase.from("budget_borrows" as any).delete().eq("id", id);
      auditEntries.push({
        section: "Borrow/Expenses",
        action: "delete",
        field_name: "entry",
        previous_value: id,
        new_value: "",
        changed_by: "admin",
      });
    }

    // Upsert rows
    for (const b of borrows) {
      if (b.isNew) {
        const { error } = await supabase.from("budget_borrows" as any).insert({
          borrower_name: b.borrower_name,
          lender_name: b.lender_name,
          amount: b.amount,
          reason: b.reason,
        });
        if (!error) {
          auditEntries.push({
            section: "Borrow/Expenses",
            action: "insert",
            field_name: `${b.borrower_name} from ${b.lender_name}`,
            previous_value: "",
            new_value: `₹${b.amount}`,
            changed_by: "admin",
          });
        }
      } else {
        await supabase
          .from("budget_borrows" as any)
          .update({
            borrower_name: b.borrower_name,
            lender_name: b.lender_name,
            amount: b.amount,
            reason: b.reason,
            updated_at: new Date().toISOString(),
          })
          .eq("id", b.id);
      }
    }

    // Write audit log
    if (auditEntries.length > 0) {
      await supabase.from("budget_audit_log" as any).insert(auditEntries);
    }

    setDeletedIds([]);
    setSaving(false);
    await fetchData();
    toast({ title: "Saved!", description: "Borrow/Expenses updated successfully." });
  };

  // Calculate balances
  const balances: Record<string, number> = {};
  borrows.forEach((b) => {
    if (b.borrower_name) balances[b.borrower_name] = (balances[b.borrower_name] || 0) - b.amount;
    if (b.lender_name) balances[b.lender_name] = (balances[b.lender_name] || 0) + b.amount;
  });

  const totalBorrowed = borrows.reduce((s, b) => s + b.amount, 0);

  return (
    <Card className="border-orange-500/20 shadow-lg">
      <CardHeader className="border-b bg-orange-500/5">
        <CardTitle className="flex items-center gap-3 text-orange-600">
          <HandCoins className="h-6 w-6" />
          Borrow / Extra Expenses
        </CardTitle>
        <p className="text-sm text-muted-foreground">Track who borrowed from whom</p>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-orange-500/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Borrowed</p>
            <p className="text-xl font-bold text-orange-600">₹{totalBorrowed.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-xl bg-muted/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">Entries</p>
            <p className="text-xl font-bold text-foreground">{borrows.length}</p>
          </div>
        </div>

        {/* Balance summary */}
        {Object.keys(balances).length > 0 && (
          <div className="rounded-xl bg-muted/30 p-4">
            <p className="mb-2 text-sm font-medium text-foreground">Net Balances</p>
            <div className="space-y-1">
              {Object.entries(balances).map(([name, bal]) => (
                <div key={name} className="flex justify-between text-sm">
                  <span>{name}</span>
                  <span className={bal >= 0 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                    {bal >= 0 ? "+" : ""}₹{bal.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={addRow} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" /> Add Entry
        </Button>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Borrower</TableHead>
                <TableHead>Lender</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrows.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <Input
                      value={b.borrower_name}
                      onChange={(e) => updateField(b.id, "borrower_name", e.target.value)}
                      placeholder="Who borrowed"
                      className="w-28"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={b.lender_name}
                      onChange={(e) => updateField(b.id, "lender_name", e.target.value)}
                      placeholder="Who paid"
                      className="w-28"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={b.amount}
                      onChange={(e) => updateField(b.id, "amount", Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={b.reason}
                      onChange={(e) => updateField(b.id, "reason", e.target.value)}
                      placeholder="Reason"
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(b.id, b.isNew)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {borrows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No entries yet. Click "Add Entry" to start.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full gap-2 rounded-xl bg-orange-600 py-5 text-white hover:bg-orange-700"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Update Borrow/Expenses"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BorrowExpensesManager;
