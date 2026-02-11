import { useState, useEffect } from "react";
import { Train, Save, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface TicketRow {
  id: string;
  participant_name: string;
  ticket_cost_up: number;
  ticket_cost_down: number;
  is_excluded: boolean;
  is_sponsored: boolean;
}

const TrainTicketsManager = () => {
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("budget_train_tickets" as any)
      .select("*")
      .order("participant_name");

    if (data) {
      setTickets(
        (data as any[]).map((d) => ({
          id: d.id,
          participant_name: d.participant_name,
          ticket_cost_up: Number(d.ticket_cost_up) || 0,
          ticket_cost_down: Number(d.ticket_cost_down) || 0,
          is_excluded: d.is_excluded || false,
          is_sponsored: d.is_sponsored ?? true,
        }))
      );
    }
  };

  const updateField = (id: string, field: keyof TicketRow, value: any) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    const promises = tickets.map((t) =>
      supabase
        .from("budget_train_tickets" as any)
        .update({
          ticket_cost_up: t.ticket_cost_up,
          ticket_cost_down: t.ticket_cost_down,
          is_excluded: t.is_excluded,
          is_sponsored: t.is_sponsored,
          updated_at: new Date().toISOString(),
        })
        .eq("id", t.id)
    );

    const results = await Promise.all(promises);
    const hasError = results.some((r) => r.error);

    // Write audit log
    const total = tickets.filter((t) => !t.is_excluded).reduce((s, t) => s + t.ticket_cost_up + t.ticket_cost_down, 0);
    await supabase.from("budget_audit_log" as any).insert({
      section: "Train Tickets",
      action: "update",
      field_name: "all tickets",
      previous_value: "",
      new_value: `Total: ₹${total}`,
      changed_by: "admin",
    });

    setSaving(false);

    if (hasError) {
      toast({ title: "Error", description: "Some updates failed. Try again.", variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Train ticket data updated successfully." });
    }
  };

  const sponsoredTickets = tickets.filter((t) => !t.is_excluded);
  const totalUp = sponsoredTickets.reduce((s, t) => s + t.ticket_cost_up, 0);
  const totalDown = sponsoredTickets.reduce((s, t) => s + t.ticket_cost_down, 0);
  const grandTotal = totalUp + totalDown;

  return (
    <Card className="border-accent/20 shadow-lg">
      <CardHeader className="border-b bg-accent/5">
        <CardTitle className="flex items-center gap-3 text-accent">
          <Train className="h-6 w-6" />
          Train Tickets
        </CardTitle>
        <p className="text-sm text-muted-foreground">Sponsored by Aaron & Aldrena · Hayden excluded</p>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-accent/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Up Tickets</p>
            <p className="text-xl font-bold text-accent">₹{totalUp.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-xl bg-accent/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Down Tickets</p>
            <p className="text-xl font-bold text-accent">₹{totalDown.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-xl bg-secondary/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-xl font-bold text-secondary">₹{grandTotal.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Participant</TableHead>
                <TableHead>Up (₹)</TableHead>
                <TableHead>Down (₹)</TableHead>
                <TableHead>Total (₹)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((t) => (
                <TableRow key={t.id} className={t.is_excluded ? "opacity-50" : ""}>
                  <TableCell className="font-medium">{t.participant_name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={t.ticket_cost_up}
                      onChange={(e) => updateField(t.id, "ticket_cost_up", Number(e.target.value))}
                      className="w-24"
                      disabled={t.is_excluded}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={t.ticket_cost_down}
                      onChange={(e) => updateField(t.id, "ticket_cost_down", Number(e.target.value))}
                      className="w-24"
                      disabled={t.is_excluded}
                    />
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₹{(t.ticket_cost_up + t.ticket_cost_down).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    {t.is_excluded ? (
                      <Badge variant="outline" className="text-destructive">Excluded</Badge>
                    ) : (
                      <Badge className="bg-secondary text-secondary-foreground">Sponsored</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full gap-2 rounded-xl bg-accent py-5 text-accent-foreground hover:bg-accent/90"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Update Train Tickets"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrainTicketsManager;
