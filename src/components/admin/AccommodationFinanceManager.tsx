import { useState, useEffect } from "react";
import { Building2, Save, IndianRupee, Plus, Trash2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { writeAuditLog } from "@/lib/auditLog";

interface Member { id: string; name: string; is_active: boolean; }
interface Sponsor { id: string; member_id: string; share_amount: number; amount_received: number; is_paid: boolean; }

const AccommodationFinanceManager = () => {
  const [villaTotal, setVillaTotal] = useState(15750);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    const [settingsRes, sponsorsRes, membersRes] = await Promise.all([
      supabase.from("accommodation_settings").select("*").limit(1).maybeSingle(),
      supabase.from("accommodation_sponsors").select("*"),
      supabase.from("trip_members").select("*").eq("is_active", true).order("name"),
    ]);
    if (settingsRes.data) { setSettingsId(settingsRes.data.id); setVillaTotal(settingsRes.data.villa_total); }
    if (sponsorsRes.data) setSponsors(sponsorsRes.data);
    if (membersRes.data) setMembers(membersRes.data);
  };

  const shareAmount = sponsors.length > 0 ? villaTotal / sponsors.length : 0;

  const saveVillaTotal = async () => {
    setSaving(true);
    if (settingsId) {
      await supabase.from("accommodation_settings").update({ villa_total: villaTotal, updated_at: new Date().toISOString() }).eq("id", settingsId);
    }
    // Update share amounts for all sponsors
    for (const s of sponsors) {
      await supabase.from("accommodation_sponsors").update({ share_amount: shareAmount, updated_at: new Date().toISOString() }).eq("id", s.id);
    }
    await writeAuditLog({ actionType: "UPDATE", tableName: "accommodation_settings", recordId: settingsId || "", afterValue: { villa_total: villaTotal } });
    setSaving(false);
    fetchAll();
    toast({ title: "Saved", description: "Villa total updated." });
  };

  const addSponsor = async () => {
    if (!selectedMember) return;
    const exists = sponsors.find(s => s.member_id === selectedMember);
    if (exists) { toast({ title: "Already a sponsor", variant: "destructive" }); return; }
    const newShare = villaTotal / (sponsors.length + 1);
    const { data, error } = await supabase.from("accommodation_sponsors").insert({ member_id: selectedMember, share_amount: newShare }).select().single();
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    await writeAuditLog({ actionType: "CREATE", tableName: "accommodation_sponsors", recordId: data.id, afterValue: data });
    setSelectedMember("");
    fetchAll();
  };

  const removeSponsor = async (s: Sponsor) => {
    if (!confirm("Remove this sponsor?")) return;
    await writeAuditLog({ actionType: "DELETE", tableName: "accommodation_sponsors", recordId: s.id, beforeValue: s });
    await supabase.from("accommodation_sponsors").delete().eq("id", s.id);
    fetchAll();
  };

  const updateSponsor = async (s: Sponsor, field: Partial<Sponsor>) => {
    const before = { ...s };
    const update: any = { ...field, updated_at: new Date().toISOString() };
    if (field.is_paid) update.amount_received = shareAmount;
    await supabase.from("accommodation_sponsors").update(update).eq("id", s.id);
    await writeAuditLog({ actionType: "UPDATE", tableName: "accommodation_sponsors", recordId: s.id, beforeValue: before, afterValue: { ...before, ...update } });
    fetchAll();
  };

  const getMemberName = (memberId: string) => members.find(m => m.id === memberId)?.name || "Unknown";
  const availableMembers = members.filter(m => !sponsors.find(s => s.member_id === m.id));

  return (
    <Card className="border-secondary/20 shadow-lg">
      <CardHeader className="border-b bg-secondary/5">
        <CardTitle className="flex items-center gap-3 text-secondary">
          <Building2 className="h-6 w-6" /> Accommodation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Villa Total */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Villa Total (₹)</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="number" value={villaTotal} onChange={e => setVillaTotal(Number(e.target.value))} className="pl-9 text-lg font-semibold" />
            </div>
            <Button onClick={saveVillaTotal} disabled={saving} className="gap-1">
              <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Add Sponsor */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Add Sponsor</label>
          <div className="flex gap-2">
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger className="flex-1"><SelectValue placeholder="Select member..." /></SelectTrigger>
              <SelectContent>
                {availableMembers.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={addSponsor} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
          </div>
        </div>

        {/* Sponsors List */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Sponsors ({sponsors.length}) — Share: ₹{shareAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })} each</p>
          {sponsors.map(s => {
            const remaining = shareAmount - s.amount_received;
            return (
              <div key={s.id} className="rounded-xl border p-4 bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{getMemberName(s.member_id)}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={s.is_paid} onCheckedChange={(checked) => updateSponsor(s, { is_paid: !!checked })} />
                      <span className="text-xs text-muted-foreground">Fully Paid</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => removeSponsor(s)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Share</span>
                    <p className="font-bold text-secondary">₹{shareAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Received</span>
                    <Input type="number" value={s.amount_received} onChange={e => updateSponsor(s, { amount_received: Number(e.target.value) })} className="mt-1 h-8 text-sm" disabled={s.is_paid} />
                  </div>
                  <div>
                    <span className="text-muted-foreground">Remaining</span>
                    <p className={`font-bold ${remaining <= 0 ? "text-green-500" : "text-amber-500"}`}>₹{Math.max(0, remaining).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="rounded-xl bg-muted/50 p-4 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-foreground">Villa Total</span><span className="font-bold text-accent">₹{villaTotal.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-sm"><span className="text-foreground">Total Received</span><span className="font-bold text-green-500">₹{sponsors.reduce((sum, s) => sum + s.amount_received, 0).toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-sm border-t pt-2"><span className="text-foreground font-medium">Outstanding</span><span className="font-bold text-amber-500">₹{Math.max(0, villaTotal - sponsors.reduce((sum, s) => sum + s.amount_received, 0)).toLocaleString("en-IN")}</span></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationFinanceManager;
