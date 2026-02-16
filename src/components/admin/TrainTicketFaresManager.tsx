import { useState, useEffect } from "react";
import { Train, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { writeAuditLog } from "@/lib/auditLog";

interface Member { id: string; name: string; }
interface Fare { id: string; member_id: string; ekm_to_madgaon: number; madgaon_to_ekm: number; }

const TrainTicketFaresManager = () => {
  const [fares, setFares] = useState<Fare[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [localFares, setLocalFares] = useState<Record<string, { ekm: number; mad: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [fRes, mRes] = await Promise.all([
      supabase.from("train_ticket_fares").select("*"),
      supabase.from("trip_members").select("id, name").eq("is_active", true).order("name"),
    ]);
    if (fRes.data) {
      setFares(fRes.data);
      const local: Record<string, { ekm: number; mad: number }> = {};
      fRes.data.forEach(f => { local[f.id] = { ekm: f.ekm_to_madgaon, mad: f.madgaon_to_ekm }; });
      setLocalFares(local);
    }
    if (mRes.data) setMembers(mRes.data);
    setLoading(false);
  };

  const getName = (id: string) => members.find(m => m.id === id)?.name || "Unknown";

  const saveFare = async (f: Fare) => {
    const local = localFares[f.id];
    if (!local) return;
    const before = { ekm_to_madgaon: f.ekm_to_madgaon, madgaon_to_ekm: f.madgaon_to_ekm };
    const after = { ekm_to_madgaon: local.ekm, madgaon_to_ekm: local.mad };
    await supabase.from("train_ticket_fares").update({ ...after, updated_at: new Date().toISOString() }).eq("id", f.id);
    await writeAuditLog({ actionType: "UPDATE", tableName: "train_ticket_fares", recordId: f.id, beforeValue: before, afterValue: after });
    fetchAll();
    toast({ title: "Saved", description: `${getName(f.member_id)} fares updated.` });
  };

  const grandTotal = fares.reduce((s, f) => {
    const l = localFares[f.id];
    return s + (l ? l.ekm + l.mad : f.ekm_to_madgaon + f.madgaon_to_ekm);
  }, 0);

  return (
    <Card className="border-accent/20 shadow-lg">
      <CardHeader className="border-b bg-accent/5">
        <CardTitle className="flex items-center gap-3 text-accent">
          <Train className="h-6 w-6" /> Train Tickets Budget
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Grand Total */}
        <div className="rounded-xl bg-accent/10 p-4 text-center">
          <p className="text-sm text-muted-foreground">Grand Total (All Members)</p>
          <p className="text-3xl font-bold text-accent">₹{grandTotal.toLocaleString("en-IN")}</p>
        </div>

        {loading ? <div className="py-4 text-center text-muted-foreground animate-pulse">Loading...</div> : (
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Member</TableHead>
                  <TableHead>EKM → Madgaon (₹)</TableHead>
                  <TableHead>Madgaon → EKM (₹)</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fares.map(f => {
                  const l = localFares[f.id] || { ekm: f.ekm_to_madgaon, mad: f.madgaon_to_ekm };
                  const total = l.ekm + l.mad;
                  return (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium text-foreground">{getName(f.member_id)}</TableCell>
                      <TableCell>
                        <Input type="number" value={l.ekm} onChange={e => setLocalFares(prev => ({ ...prev, [f.id]: { ...prev[f.id], ekm: Number(e.target.value) } }))} className="h-8 w-24 text-sm" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" value={l.mad} onChange={e => setLocalFares(prev => ({ ...prev, [f.id]: { ...prev[f.id], mad: Number(e.target.value) } }))} className="h-8 w-24 text-sm" />
                      </TableCell>
                      <TableCell className="font-bold text-foreground">₹{total.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => saveFare(f)} className="gap-1"><Save className="h-3.5 w-3.5" /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainTicketFaresManager;
