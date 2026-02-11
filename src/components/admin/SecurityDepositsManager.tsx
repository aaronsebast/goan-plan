import { useState, useEffect } from "react";
import { ShieldCheck, Save, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface DepositRow {
  id: string;
  participant_name: string;
  amount: number;
  status: "collected" | "pending" | "refunded";
}

const STATUS_CYCLE: Record<string, "collected" | "pending" | "refunded"> = {
  pending: "collected",
  collected: "refunded",
  refunded: "pending",
};

const SecurityDepositsManager = () => {
  const [deposits, setDeposits] = useState<DepositRow[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase
      .from("budget_security_deposits" as any)
      .select("*")
      .order("participant_name");

    if (data) {
      setDeposits(
        (data as any[]).map((d) => ({
          id: d.id,
          participant_name: d.participant_name,
          amount: Number(d.amount) || 2000,
          status: d.status || "pending",
        }))
      );
    }
  };

  const toggleStatus = (id: string) => {
    setDeposits((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: STATUS_CYCLE[d.status] } : d
      )
    );
  };

  const updateAmount = (id: string, amount: number) => {
    setDeposits((prev) =>
      prev.map((d) => (d.id === id ? { ...d, amount } : d))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    const promises = deposits.map((d) =>
      supabase
        .from("budget_security_deposits" as any)
        .update({
          amount: d.amount,
          status: d.status,
          collected_at: d.status === "collected" ? new Date().toISOString() : null,
          refunded_at: d.status === "refunded" ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", d.id)
    );

    const results = await Promise.all(promises);
    const hasError = results.some((r) => r.error);

    // Write audit log
    const collectedCount = deposits.filter((d) => d.status === "collected").length;
    const pendingCount = deposits.filter((d) => d.status === "pending").length;
    await supabase.from("budget_audit_log" as any).insert({
      section: "Security Deposits",
      action: "update",
      field_name: "statuses",
      previous_value: "",
      new_value: `Collected: ${collectedCount}, Pending: ${pendingCount}`,
      changed_by: "admin",
    });

    setSaving(false);

    if (hasError) {
      toast({ title: "Error", description: "Some updates failed. Try again.", variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Security deposits updated successfully." });
    }
  };

  const collected = deposits.filter((d) => d.status === "collected");
  const pending = deposits.filter((d) => d.status === "pending");
  const refunded = deposits.filter((d) => d.status === "refunded");
  const totalCollected = collected.reduce((s, d) => s + d.amount, 0);
  const totalPending = pending.reduce((s, d) => s + d.amount, 0);
  const totalRefunded = refunded.reduce((s, d) => s + d.amount, 0);

  const statusIcon = (status: string) => {
    switch (status) {
      case "collected": return <CheckCircle2 className="h-4 w-4" />;
      case "refunded": return <RotateCcw className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "collected": return "bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20";
      case "refunded": return "bg-blue-500/10 text-blue-600 border-blue-500/30 hover:bg-blue-500/20";
      default: return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30 hover:bg-yellow-500/20";
    }
  };

  return (
    <Card className="border-green-500/20 shadow-lg">
      <CardHeader className="border-b bg-green-500/5">
        <CardTitle className="flex items-center gap-3 text-green-600">
          <ShieldCheck className="h-6 w-6" />
          Security Deposits
        </CardTitle>
        <p className="text-sm text-muted-foreground">₹2,000 per person · Refundable on departure</p>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-green-500/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Collected</p>
            <p className="text-xl font-bold text-green-600">₹{totalCollected.toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground">{collected.length} people</p>
          </div>
          <div className="rounded-xl bg-yellow-500/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-xl font-bold text-yellow-600">₹{totalPending.toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground">{pending.length} people</p>
          </div>
          <div className="rounded-xl bg-blue-500/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Refunded</p>
            <p className="text-xl font-bold text-blue-600">₹{totalRefunded.toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground">{refunded.length} people</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Participant</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deposits.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.participant_name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={d.amount}
                      onChange={(e) => updateAmount(d.id, Number(e.target.value))}
                      className="w-28"
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleStatus(d.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${statusColor(d.status)}`}
                    >
                      {statusIcon(d.status)}
                      {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full gap-2 rounded-xl bg-green-600 py-5 text-white hover:bg-green-700"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Update Security Deposits"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SecurityDepositsManager;
