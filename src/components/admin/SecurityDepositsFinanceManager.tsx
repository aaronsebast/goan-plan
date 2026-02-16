import { useState, useEffect } from "react";
import { Shield, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { writeAuditLog } from "@/lib/auditLog";

interface Member { id: string; name: string; is_active: boolean; }
interface Deposit { id: string; member_id: string; deposit_amount: number; collected: boolean; collected_at: string | null; refunded: boolean; refunded_at: string | null; note: string | null; }

const SecurityDepositsFinanceManager = () => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [defaultAmount, setDefaultAmount] = useState(2000);
  const [selectedMember, setSelectedMember] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [dRes, mRes, sRes] = await Promise.all([
      supabase.from("security_deposits").select("*").order("updated_at"),
      supabase.from("trip_members").select("*").eq("is_active", true).order("name"),
      supabase.from("deposit_settings").select("*").limit(1).maybeSingle(),
    ]);
    if (dRes.data) setDeposits(dRes.data);
    if (mRes.data) setMembers(mRes.data);
    if (sRes.data) setDefaultAmount(sRes.data.default_deposit_amount);
    setLoading(false);
  };

  const getName = (id: string) => members.find(m => m.id === id)?.name || "Unknown";
  const available = members.filter(m => !deposits.find(d => d.member_id === m.id));

  const addEntry = async () => {
    if (!selectedMember) return;
    const { data, error } = await supabase.from("security_deposits").insert({ member_id: selectedMember, deposit_amount: defaultAmount }).select().single();
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    await writeAuditLog({ actionType: "CREATE", tableName: "security_deposits", recordId: data.id, afterValue: data });
    setSelectedMember("");
    fetchAll();
    toast({ title: "Added" });
  };

  const deleteEntry = async (d: Deposit) => {
    if (!confirm(`Remove deposit for ${getName(d.member_id)}?`)) return;
    await writeAuditLog({ actionType: "DELETE", tableName: "security_deposits", recordId: d.id, beforeValue: d });
    await supabase.from("security_deposits").delete().eq("id", d.id);
    fetchAll();
    toast({ title: "Removed" });
  };

  const toggleCollected = async (d: Deposit) => {
    const newVal = !d.collected;
    if (!newVal && d.collected && !confirm("Unmark as collected?")) return;
    const update: any = {
      collected: newVal,
      collected_at: newVal ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };
    if (!newVal) { update.refunded = false; update.refunded_at = null; }
    await supabase.from("security_deposits").update(update).eq("id", d.id);
    await writeAuditLog({ actionType: "TOGGLE", tableName: "security_deposits", recordId: d.id, beforeValue: { collected: d.collected }, afterValue: { collected: newVal } });
    fetchAll();
  };

  const toggleRefunded = async (d: Deposit) => {
    if (!d.collected) { toast({ title: "Must be collected first", variant: "destructive" }); return; }
    const newVal = !d.refunded;
    await supabase.from("security_deposits").update({ refunded: newVal, refunded_at: newVal ? new Date().toISOString() : null, updated_at: new Date().toISOString() }).eq("id", d.id);
    await writeAuditLog({ actionType: "TOGGLE", tableName: "security_deposits", recordId: d.id, beforeValue: { refunded: d.refunded }, afterValue: { refunded: newVal } });
    fetchAll();
  };

  const updateAmount = async (d: Deposit, amt: number) => {
    await supabase.from("security_deposits").update({ deposit_amount: amt, updated_at: new Date().toISOString() }).eq("id", d.id);
    await writeAuditLog({ actionType: "UPDATE", tableName: "security_deposits", recordId: d.id, beforeValue: { deposit_amount: d.deposit_amount }, afterValue: { deposit_amount: amt } });
    fetchAll();
  };

  const updateNote = async (d: Deposit, note: string) => {
    await supabase.from("security_deposits").update({ note, updated_at: new Date().toISOString() }).eq("id", d.id);
    fetchAll();
  };

  const totalCollected = deposits.filter(d => d.collected).reduce((s, d) => s + d.deposit_amount, 0);
  const totalRefunded = deposits.filter(d => d.refunded).reduce((s, d) => s + d.deposit_amount, 0);

  const fmtDate = (iso: string | null) => iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  return (
    <Card className="border-green-500/20 shadow-lg">
      <CardHeader className="border-b bg-green-500/5">
        <CardTitle className="flex items-center gap-3 text-green-600">
          <Shield className="h-6 w-6" /> Security Deposits (Refundable)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Entries</p>
            <p className="text-xl font-bold text-foreground">{deposits.length}</p>
          </div>
          <div className="rounded-lg bg-green-500/10 p-3 text-center">
            <p className="text-xs text-muted-foreground">Collected</p>
            <p className="text-xl font-bold text-green-600">₹{totalCollected.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-3 text-center">
            <p className="text-xs text-muted-foreground">Refunded</p>
            <p className="text-xl font-bold text-amber-600">₹{totalRefunded.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Add Entry */}
        <div className="flex gap-2">
          <Select value={selectedMember} onValueChange={setSelectedMember}>
            <SelectTrigger className="flex-1"><SelectValue placeholder="Select member..." /></SelectTrigger>
            <SelectContent>{available.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
          </Select>
          <Button onClick={addEntry} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
        </div>

        {/* Deposits List */}
        {loading ? <div className="py-4 text-center text-muted-foreground animate-pulse">Loading...</div> : (
          <div className="space-y-3">
            {deposits.map(d => (
              <div key={d.id} className="rounded-xl border p-4 bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{getName(d.member_id)}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={d.refunded ? "default" : d.collected ? "secondary" : "outline"} className="text-xs">
                      {d.refunded ? "Refunded" : d.collected ? "Collected" : "Pending"}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteEntry(d)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-muted-foreground">Amount</span>
                    <Input type="number" value={d.deposit_amount} onChange={e => updateAmount(d, Number(e.target.value))} className="mt-1 h-8 text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Note</span>
                    <Input value={d.note || ""} onChange={e => updateNote(d, e.target.value)} className="mt-1 h-8 text-sm" placeholder="Optional..." />
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={d.collected} onCheckedChange={() => toggleCollected(d)} />
                    <span className="text-muted-foreground">Collected {d.collected_at && <span className="text-xs">({fmtDate(d.collected_at)})</span>}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox checked={d.refunded} onCheckedChange={() => toggleRefunded(d)} disabled={!d.collected} />
                    <span className="text-muted-foreground">Refunded {d.refunded_at && <span className="text-xs">({fmtDate(d.refunded_at)})</span>}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityDepositsFinanceManager;
