import { supabase } from "@/integrations/supabase/client";

export const writeAuditLog = async ({
  actionType,
  tableName,
  recordId,
  beforeValue,
  afterValue,
}: {
  actionType: string;
  tableName: string;
  recordId?: string;
  beforeValue?: any;
  afterValue?: any;
}) => {
  const { data: { session } } = await supabase.auth.getSession();
  const identity = session?.user?.email || "unknown";

  await supabase.from("admin_audit_log").insert({
    admin_identity: identity,
    action_type: actionType,
    table_name: tableName,
    record_id: recordId || null,
    before_value: beforeValue ? JSON.parse(JSON.stringify(beforeValue)) : null,
    after_value: afterValue ? JSON.parse(JSON.stringify(afterValue)) : null,
  });
};
