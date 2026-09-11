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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      centre_modalities: {
        Row: {
          available: boolean
          centre_id: string
          created_at: string
          id: string
          indicative_price_inr: number | null
          modality_id: string
          scan_type_id: string | null
        }
        Insert: {
          available?: boolean
          centre_id: string
          created_at?: string
          id?: string
          indicative_price_inr?: number | null
          modality_id: string
          scan_type_id?: string | null
        }
        Update: {
          available?: boolean
          centre_id?: string
          created_at?: string
          id?: string
          indicative_price_inr?: number | null
          modality_id?: string
          scan_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "centre_modalities_centre_id_fkey"
            columns: ["centre_id"]
            isOneToOne: false
            referencedRelation: "centres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "centre_modalities_modality_id_fkey"
            columns: ["modality_id"]
            isOneToOne: false
            referencedRelation: "modalities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "centre_modalities_scan_type_id_fkey"
            columns: ["scan_type_id"]
            isOneToOne: false
            referencedRelation: "scan_types"
            referencedColumns: ["id"]
          },
        ]
      }
      centres: {
        Row: {
          accreditations: string[]
          address: string
          cashless_support: boolean
          created_at: string
          equipment: string[]
          id: string
          is_demo: boolean
          locality: string
          location_id: string
          name: string
          open_24x7: boolean
          overview: string
          published: boolean
          report_turnaround: string
          services: string[]
          slug: string
          timings: string
          updated_at: string
          wheelchair_access: boolean
        }
        Insert: {
          accreditations?: string[]
          address: string
          cashless_support?: boolean
          created_at?: string
          equipment?: string[]
          id?: string
          is_demo?: boolean
          locality: string
          location_id: string
          name: string
          open_24x7?: boolean
          overview: string
          published?: boolean
          report_turnaround?: string
          services?: string[]
          slug: string
          timings: string
          updated_at?: string
          wheelchair_access?: boolean
        }
        Update: {
          accreditations?: string[]
          address?: string
          cashless_support?: boolean
          created_at?: string
          equipment?: string[]
          id?: string
          is_demo?: boolean
          locality?: string
          location_id?: string
          name?: string
          open_24x7?: boolean
          overview?: string
          published?: boolean
          report_turnaround?: string
          services?: string[]
          slug?: string
          timings?: string
          updated_at?: string
          wheelchair_access?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "centres_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      conditions: {
        Row: {
          body: string
          created_at: string
          id: string
          name: string
          published: boolean
          slug: string
          summary: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          name: string
          published?: boolean
          slug: string
          summary: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          name?: string
          published?: boolean
          slug?: string
          summary?: string
          updated_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          city: string
          consent_given: boolean
          created_at: string
          email: string | null
          id: string
          mobile: string
          name: string
          notes: string | null
          preferred_date: string | null
          preferred_locality: string | null
          reference_code: string
          scan_type: string
          source_path: string
          status: Database["public"]["Enums"]["enquiry_status"]
          updated_at: string
        }
        Insert: {
          city: string
          consent_given: boolean
          created_at?: string
          email?: string | null
          id?: string
          mobile: string
          name: string
          notes?: string | null
          preferred_date?: string | null
          preferred_locality?: string | null
          reference_code: string
          scan_type: string
          source_path?: string
          status?: Database["public"]["Enums"]["enquiry_status"]
          updated_at?: string
        }
        Update: {
          city?: string
          consent_given?: boolean
          created_at?: string
          email?: string | null
          id?: string
          mobile?: string
          name?: string
          notes?: string | null
          preferred_date?: string | null
          preferred_locality?: string | null
          reference_code?: string
          scan_type?: string
          source_path?: string
          status?: Database["public"]["Enums"]["enquiry_status"]
          updated_at?: string
        }
        Relationships: []
      }
      enquiry_uploads: {
        Row: {
          created_at: string
          enquiry_id: string
          file_name: string
          id: string
          mime_type: string
          size_bytes: number
          storage_path: string
        }
        Insert: {
          created_at?: string
          enquiry_id: string
          file_name: string
          id?: string
          mime_type: string
          size_bytes: number
          storage_path: string
        }
        Update: {
          created_at?: string
          enquiry_id?: string
          file_name?: string
          id?: string
          mime_type?: string
          size_bytes?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiry_uploads_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      guides: {
        Row: {
          body: string
          created_at: string
          faqs: Json
          guide_type: string
          id: string
          published: boolean
          slug: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          faqs?: Json
          guide_type: string
          id?: string
          published?: boolean
          slug: string
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          faqs?: Json
          guide_type?: string
          id?: string
          published?: boolean
          slug?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          city: string
          created_at: string
          id: string
          published: boolean
          region: string
          slug: string
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          published?: boolean
          region?: string
          slug: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          published?: boolean
          region?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      modalities: {
        Row: {
          created_at: string
          display_order: number
          icon: string
          id: string
          name: string
          published: boolean
          slug: string
          summary: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          name: string
          published?: boolean
          slug: string
          summary: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          name?: string
          published?: boolean
          slug?: string
          summary?: string
          updated_at?: string
        }
        Relationships: []
      }
      scan_types: {
        Row: {
          common_uses: string[]
          contrast_tracer: string
          created_at: string
          evaluates: string[]
          faqs: Json
          featured: boolean
          id: string
          modality_id: string
          name: string
          preparation: string
          price_max_inr: number | null
          price_min_inr: number | null
          published: boolean
          report_turnaround: string
          safety: string
          short_description: string
          slug: string
          typical_duration: string
          updated_at: string
          what_it_is: string
        }
        Insert: {
          common_uses?: string[]
          contrast_tracer?: string
          created_at?: string
          evaluates?: string[]
          faqs?: Json
          featured?: boolean
          id?: string
          modality_id: string
          name: string
          preparation?: string
          price_max_inr?: number | null
          price_min_inr?: number | null
          published?: boolean
          report_turnaround?: string
          safety?: string
          short_description: string
          slug: string
          typical_duration?: string
          updated_at?: string
          what_it_is?: string
        }
        Update: {
          common_uses?: string[]
          contrast_tracer?: string
          created_at?: string
          evaluates?: string[]
          faqs?: Json
          featured?: boolean
          id?: string
          modality_id?: string
          name?: string
          preparation?: string
          price_max_inr?: number | null
          price_min_inr?: number | null
          published?: boolean
          report_turnaround?: string
          safety?: string
          short_description?: string
          slug?: string
          typical_duration?: string
          updated_at?: string
          what_it_is?: string
        }
        Relationships: [
          {
            foreignKeyName: "scan_types_modality_id_fkey"
            columns: ["modality_id"]
            isOneToOne: false
            referencedRelation: "modalities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
      enquiry_status:
        | "New Enquiry"
        | "Contacted"
        | "Appointment Requested"
        | "Booked"
        | "Closed"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      enquiry_status: [
        "New Enquiry",
        "Contacted",
        "Appointment Requested",
        "Booked",
        "Closed",
      ],
    },
  },
} as const
