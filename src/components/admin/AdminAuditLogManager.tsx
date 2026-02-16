import { useState, useEffect } from "react";
import { ScrollText, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface AuditEntry {
  id: string;
  created_at: string;
  admin_identity: string | null;
  action_type: string;
  table_name: string;
  record_id: string | null;
  before_value: any;
  after_value: any;
}

const TABLE_NAMES = ["All", "trip_members", "accommodation_settings", "accommodation_sponsors", "security_deposits", "train_ticket_fares", "extra_expenses", "trip_budget_items"];
const ACTION_TYPES = ["All", "CREATE", "UPDATE", "DELETE", "TOGGLE"];

const actionColor = (a: string) => {
  switch (a) {
    case "CREATE": return "bg-green-500/20 text-green-600";
    case "UPDATE": return "bg-blue-500/20 text-blue-600";
    case "DELETE": return "bg-red-500/20 text-red-600";
    case "TOGGLE": return "bg-amber-500/20 text-amber-600";
    default: return "bg-muted text-muted-foreground";
  }
};

const AdminAuditLogManager = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTable, setFilterTable] = useState("All");
  const [filterAction, setFilterAction] = useState("All");

  useEffect(() => { fetchLogs(); }, [filterTable, filterAction]);

  const fetchLogs = async () => {
    setLoading(true);
    let query = supabase.from("admin_audit_log").select("*").order("created_at", { ascending: false }).limit(200);
    if (filterTable !== "All") query = query.eq("table_name", filterTable);
    if (filterAction !== "All") query = query.eq("action_type", filterAction);
    const { data } = await query;
    if (data) setLogs(data);
    setLoading(false);
  };

  const fmtDate = (iso: string) => new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  const fmtJson = (val: any) => {
    if (!val) return "—";
    if (typeof val === "string") return val;
    try {
      const obj = typeof val === "object" ? val : JSON.parse(val);
      return Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join(", ");
    } catch { return String(val); }
  };

  return (
    <Card className="border-purple-500/20 shadow-lg">
      <CardHeader className="border-b bg-purple-500/5">
        <CardTitle className="flex items-center gap-3 text-purple-600">
          <ScrollText className="h-6 w-6" /> Audit Log
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterTable} onValueChange={setFilterTable}>
              <SelectTrigger className="h-8 w-48"><SelectValue /></SelectTrigger>
              <SelectContent>{TABLE_NAMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Select value={filterAction} onValueChange={setFilterAction}>
            <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
            <SelectContent>{ACTION_TYPES.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        {loading ? <div className="py-4 text-center text-muted-foreground animate-pulse">Loading...</div> : logs.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">No audit entries.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Before</TableHead>
                  <TableHead>After</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs whitespace-nowrap">{fmtDate(log.created_at)}</TableCell>
                    <TableCell><Badge className={`text-xs ${actionColor(log.action_type)}`}>{log.action_type}</Badge></TableCell>
                    <TableCell className="text-xs">{log.table_name}</TableCell>
                    <TableCell className="text-xs text-red-500 max-w-[200px] truncate">{fmtJson(log.before_value)}</TableCell>
                    <TableCell className="text-xs text-green-600 max-w-[200px] truncate">{fmtJson(log.after_value)}</TableCell>
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

export default AdminAuditLogManager;
