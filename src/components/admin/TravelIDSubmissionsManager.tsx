import { useState, useEffect } from "react";
import { FileText, Download, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Submission {
  id: string;
  member_name: string;
  phone: string | null;
  id_type: string | null;
  file_path: string | null;
  submitted: boolean;
  submitted_at: string | null;
  created_at: string;
}

const TravelIDSubmissionsManager = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("travel_id_submissions" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load submissions.", variant: "destructive" });
    } else {
      setSubmissions((data as any) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("admin-travel-id")
      .on("postgres_changes", { event: "*", schema: "public", table: "travel_id_submissions" }, () => fetchData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleDownload = async (sub: Submission) => {
    if (!sub.file_path) return;
    setDownloading(sub.id);
    try {
      const { data, error } = await supabase.storage
        .from("travel-ids")
        .createSignedUrl(sub.file_path, 60);
      if (error || !data?.signedUrl) throw error;
      window.open(data.signedUrl, "_blank");
    } catch {
      toast({ title: "Error", description: "Failed to generate download link.", variant: "destructive" });
    }
    setDownloading(null);
  };

  const toggleStatus = async (sub: Submission) => {
    setToggling(sub.id);
    const newStatus = !sub.submitted;
    const { error } = await supabase
      .from("travel_id_submissions" as any)
      .update({
        submitted: newStatus,
        submitted_at: newStatus ? new Date().toISOString() : null,
      })
      .eq("id", sub.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `${sub.member_name} marked as ${newStatus ? "Submitted" : "Pending"}.` });
    }
    setToggling(null);
  };

  const submitted = submissions.filter((s) => s.submitted).length;

  return (
    <Card className="border-secondary/20 shadow-lg">
      <CardHeader className="border-b bg-secondary/5">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-3 text-secondary">
            <FileText className="h-6 w-6" />
            Travel ID Submissions
          </span>
          <Badge variant="outline" className="text-xs">
            {submitted}/{submissions.length} submitted
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-6 text-center text-muted-foreground">Loading submissions...</div>
        ) : submissions.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No submissions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Member</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">ID Type</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Submitted</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id} className="border-b last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{sub.member_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sub.id_type || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sub.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <Badge className={sub.submitted ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}>
                        {sub.submitted ? "Submitted" : "Pending"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {sub.file_path && (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={downloading === sub.id}
                            onClick={() => handleDownload(sub)}
                            className="h-8 gap-1 text-xs"
                          >
                            <Download className="h-3.5 w-3.5" />
                            {downloading === sub.id ? "..." : "Download"}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={toggling === sub.id}
                          onClick={() => toggleStatus(sub)}
                          className="h-8 gap-1 text-xs"
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${toggling === sub.id ? "animate-spin" : ""}`} />
                          {sub.submitted ? "Set Pending" : "Set Submitted"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TravelIDSubmissionsManager;
