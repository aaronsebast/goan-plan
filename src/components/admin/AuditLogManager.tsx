import { useState, useEffect } from "react";
import { ScrollText, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuditEntry {
  id: string;
  section: string;
  action: string;
  field_name: string | null;
  previous_value: string | null;
  new_value: string | null;
  changed_by: string | null;
  created_at: string;
}

const sectionColor = (section: string) => {
  switch (section.toLowerCase()) {
    case "accommodation": return "bg-secondary/10 text-secondary border-secondary/30";
    case "train tickets": return "bg-accent/10 text-accent border-accent/30";
    case "security deposits": return "bg-green-500/10 text-green-600 border-green-500/30";
    case "borrow/expenses": return "bg-orange-500/10 text-orange-600 border-orange-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

const AuditLogManager = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("budget_audit_log" as any)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (data) {
      setLogs(data as any[]);
    }
    setLoading(false);
  };

  const clearLogs = async () => {
    const { error } = await supabase.from("budget_audit_log" as any).delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) {
      toast({ title: "Error", description: "Failed to clear logs.", variant: "destructive" });
    } else {
      setLogs([]);
      toast({ title: "Cleared", description: "All audit logs have been cleared." });
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <Card className="border-purple-500/20 shadow-lg">
      <CardHeader className="border-b bg-purple-500/5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-purple-600">
            <ScrollText className="h-6 w-6" />
            Audit Log
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 text-destructive border-destructive/30">
                <Trash2 className="h-3.5 w-3.5" /> Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all audit logs?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all audit log entries. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearLogs} className="bg-destructive text-destructive-foreground">
                  Clear All Logs
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="text-sm text-muted-foreground">Automatic record of all budget changes</p>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="py-8 text-center text-muted-foreground animate-pulse">Loading logs...</div>
        ) : logs.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">No audit entries yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Previous</TableHead>
                  <TableHead>New</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs whitespace-nowrap">{formatDate(log.created_at)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${sectionColor(log.section)}`}>
                        {log.section}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs capitalize">{log.action}</TableCell>
                    <TableCell className="text-xs">{log.field_name || "—"}</TableCell>
                    <TableCell className="text-xs text-red-500">{log.previous_value || "—"}</TableCell>
                    <TableCell className="text-xs text-green-600">{log.new_value || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuditLogManager;
