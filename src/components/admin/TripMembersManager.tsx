import { useState, useEffect } from "react";
import { Users, Plus, Save, Trash2, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { writeAuditLog } from "@/lib/auditLog";

interface Member {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

const TripMembersManager = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase.from("trip_members").select("*").order("created_at");
    if (data) setMembers(data);
    setLoading(false);
  };

  const addMember = async () => {
    if (!newName.trim()) return;
    const { data, error } = await supabase.from("trip_members").insert({ name: newName.trim() }).select().single();
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    await writeAuditLog({ actionType: "CREATE", tableName: "trip_members", recordId: data.id, afterValue: data });
    setNewName("");
    fetchMembers();
    toast({ title: "Added", description: `${newName.trim()} added.` });
  };

  const saveName = async (m: Member) => {
    if (!editName.trim()) return;
    const { error } = await supabase.from("trip_members").update({ name: editName.trim() }).eq("id", m.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    await writeAuditLog({ actionType: "UPDATE", tableName: "trip_members", recordId: m.id, beforeValue: { name: m.name }, afterValue: { name: editName.trim() } });
    setEditingId(null);
    fetchMembers();
    toast({ title: "Updated" });
  };

  const toggleActive = async (m: Member) => {
    const { error } = await supabase.from("trip_members").update({ is_active: !m.is_active }).eq("id", m.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    await writeAuditLog({ actionType: "TOGGLE", tableName: "trip_members", recordId: m.id, beforeValue: { is_active: m.is_active }, afterValue: { is_active: !m.is_active } });
    fetchMembers();
  };

  const deleteMember = async (m: Member) => {
    if (!confirm(`Delete ${m.name}? This is permanent.`)) return;
    await writeAuditLog({ actionType: "DELETE", tableName: "trip_members", recordId: m.id, beforeValue: m });
    const { error } = await supabase.from("trip_members").delete().eq("id", m.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    fetchMembers();
    toast({ title: "Deleted" });
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="border-b bg-primary/5">
        <CardTitle className="flex items-center gap-3 text-primary">
          <Users className="h-6 w-6" /> Trip Members ({members.filter(m => m.is_active).length} active)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex gap-2">
          <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="New member name..." onKeyDown={e => e.key === "Enter" && addMember()} />
          <Button onClick={addMember} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
        </div>
        {loading ? <div className="py-4 text-center text-muted-foreground animate-pulse">Loading...</div> : (
          <div className="space-y-2">
            {members.map(m => (
              <div key={m.id} className="flex items-center gap-2 rounded-lg border p-3 bg-muted/20">
                {editingId === m.id ? (
                  <>
                    <Input value={editName} onChange={e => setEditName(e.target.value)} className="flex-1" onKeyDown={e => e.key === "Enter" && saveName(m)} />
                    <Button size="sm" variant="ghost" onClick={() => saveName(m)}><Save className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <span className={`flex-1 font-medium ${!m.is_active ? "line-through text-muted-foreground" : "text-foreground"}`}>{m.name}</span>
                    <Badge variant={m.is_active ? "default" : "secondary"} className="text-xs">{m.is_active ? "Active" : "Inactive"}</Badge>
                    <Button size="sm" variant="ghost" onClick={() => { setEditingId(m.id); setEditName(m.name); }}>Edit</Button>
                    <Button size="sm" variant="ghost" onClick={() => toggleActive(m)}>{m.is_active ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteMember(m)}><Trash2 className="h-4 w-4" /></Button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TripMembersManager;
