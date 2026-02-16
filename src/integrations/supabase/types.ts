export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      accommodation_settings: {
        Row: {
          id: string
          updated_at: string | null
          villa_total: number
        }
        Insert: {
          id?: string
          updated_at?: string | null
          villa_total?: number
        }
        Update: {
          id?: string
          updated_at?: string | null
          villa_total?: number
        }
        Relationships: []
      }
      accommodation_sponsors: {
        Row: {
          amount_received: number
          id: string
          is_paid: boolean
          member_id: string
          share_amount: number
          updated_at: string | null
        }
        Insert: {
          amount_received?: number
          id?: string
          is_paid?: boolean
          member_id: string
          share_amount?: number
          updated_at?: string | null
        }
        Update: {
          amount_received?: number
          id?: string
          is_paid?: boolean
          member_id?: string
          share_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_sponsors_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "trip_members"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_audit_log: {
        Row: {
          action_type: string
          admin_identity: string | null
          after_value: Json | null
          before_value: Json | null
          created_at: string
          id: string
          record_id: string | null
          table_name: string
        }
        Insert: {
          action_type: string
          admin_identity?: string | null
          after_value?: Json | null
          before_value?: Json | null
          created_at?: string
          id?: string
          record_id?: string | null
          table_name: string
        }
        Update: {
          action_type?: string
          admin_identity?: string | null
          after_value?: Json | null
          before_value?: Json | null
          created_at?: string
          id?: string
          record_id?: string | null
          table_name?: string
        }
        Relationships: []
      }
      admin_emails: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      budget_accommodation: {
        Row: {
          id: string
          notes: string | null
          sponsors: Json
          total_amount: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          notes?: string | null
          sponsors?: Json
          total_amount?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          notes?: string | null
          sponsors?: Json
          total_amount?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      budget_audit_log: {
        Row: {
          action: string
          changed_by: string | null
          created_at: string
          field_name: string | null
          id: string
          new_value: string | null
          previous_value: string | null
          section: string
        }
        Insert: {
          action: string
          changed_by?: string | null
          created_at?: string
          field_name?: string | null
          id?: string
          new_value?: string | null
          previous_value?: string | null
          section: string
        }
        Update: {
          action?: string
          changed_by?: string | null
          created_at?: string
          field_name?: string | null
          id?: string
          new_value?: string | null
          previous_value?: string | null
          section?: string
        }
        Relationships: []
      }
      budget_borrows: {
        Row: {
          amount: number
          borrower_name: string
          created_at: string
          id: string
          lender_name: string
          reason: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number
          borrower_name: string
          created_at?: string
          id?: string
          lender_name: string
          reason?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          borrower_name?: string
          created_at?: string
          id?: string
          lender_name?: string
          reason?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      budget_security_deposits: {
        Row: {
          amount: number
          collected_at: string | null
          id: string
          participant_name: string
          refunded_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount?: number
          collected_at?: string | null
          id?: string
          participant_name: string
          refunded_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          collected_at?: string | null
          id?: string
          participant_name?: string
          refunded_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      budget_train_tickets: {
        Row: {
          id: string
          is_excluded: boolean | null
          is_sponsored: boolean | null
          participant_name: string
          ticket_cost_down: number | null
          ticket_cost_up: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          is_excluded?: boolean | null
          is_sponsored?: boolean | null
          participant_name: string
          ticket_cost_down?: number | null
          ticket_cost_up?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          is_excluded?: boolean | null
          is_sponsored?: boolean | null
          participant_name?: string
          ticket_cost_down?: number | null
          ticket_cost_up?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      BudgetItems: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string
          id: string
          notes: string | null
          paid_by: string | null
          title: string | null
          trip_id: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          paid_by?: string | null
          title?: string | null
          trip_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          paid_by?: string | null
          title?: string | null
          trip_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      deposit_settings: {
        Row: {
          default_deposit_amount: number
          id: string
        }
        Insert: {
          default_deposit_amount?: number
          id?: string
        }
        Update: {
          default_deposit_amount?: number
          id?: string
        }
        Relationships: []
      }
      extra_expenses: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          expense_date: string
          expense_type: string
          id: string
          paid_by_label: string | null
          paid_by_member_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          description?: string | null
          expense_date?: string
          expense_type?: string
          id?: string
          paid_by_label?: string | null
          paid_by_member_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          expense_date?: string
          expense_type?: string
          id?: string
          paid_by_label?: string | null
          paid_by_member_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "extra_expenses_paid_by_member_id_fkey"
            columns: ["paid_by_member_id"]
            isOneToOne: false
            referencedRelation: "trip_members"
            referencedColumns: ["id"]
          },
        ]
      }
      security_deposits: {
        Row: {
          collected: boolean
          collected_at: string | null
          deposit_amount: number
          id: string
          member_id: string
          note: string | null
          refunded: boolean
          refunded_at: string | null
          updated_at: string | null
        }
        Insert: {
          collected?: boolean
          collected_at?: string | null
          deposit_amount?: number
          id?: string
          member_id: string
          note?: string | null
          refunded?: boolean
          refunded_at?: string | null
          updated_at?: string | null
        }
        Update: {
          collected?: boolean
          collected_at?: string | null
          deposit_amount?: number
          id?: string
          member_id?: string
          note?: string | null
          refunded?: boolean
          refunded_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_deposits_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "trip_members"
            referencedColumns: ["id"]
          },
        ]
      }
      train_ticket_fares: {
        Row: {
          ekm_to_madgaon: number
          id: string
          madgaon_to_ekm: number
          member_id: string
          updated_at: string | null
        }
        Insert: {
          ekm_to_madgaon?: number
          id?: string
          madgaon_to_ekm?: number
          member_id: string
          updated_at?: string | null
        }
        Update: {
          ekm_to_madgaon?: number
          id?: string
          madgaon_to_ekm?: number
          member_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "train_ticket_fares_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: true
            referencedRelation: "trip_members"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_id_submissions: {
        Row: {
          created_at: string
          file_path: string | null
          id: string
          id_type: string | null
          member_name: string
          phone: string | null
          submitted: boolean
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_path?: string | null
          id?: string
          id_type?: string | null
          member_name: string
          phone?: string | null
          submitted?: boolean
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_path?: string | null
          id?: string
          id_type?: string | null
          member_name?: string
          phone?: string | null
          submitted?: boolean
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      trip_budget_items: {
        Row: {
          actual_amount: number
          created_at: string
          estimated_amount: number
          id: string
          item_name: string
          note: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          actual_amount?: number
          created_at?: string
          estimated_amount?: number
          id?: string
          item_name: string
          note?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          actual_amount?: number
          created_at?: string
          estimated_amount?: number
          id?: string
          item_name?: string
          note?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      trip_members: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      travel_id_status: {
        Row: {
          member_name: string | null
          submitted: boolean | null
          submitted_at: string | null
        }
        Insert: {
          member_name?: string | null
          submitted?: boolean | null
          submitted_at?: string | null
        }
        Update: {
          member_name?: string | null
          submitted?: boolean | null
          submitted_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin_email: { Args: { check_email: string }; Returns: boolean }
      is_current_user_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
