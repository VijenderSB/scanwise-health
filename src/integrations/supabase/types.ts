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
          campaign_attribution: Json | null
          city: string
          consent_given: boolean
          created_at: string
          discount_percent: number | null
          email: string | null
          enquiry_kind: string
          id: string
          mandatory_charges_inr: number | null
          mobile: string
          name: string
          notes: string | null
          offer_id: string | null
          offer_price_inr: number | null
          preferred_callback_time: string | null
          preferred_date: string | null
          preferred_locality: string | null
          price_verified: boolean
          pricing_snapshot: Json | null
          protocol_code: string | null
          reference_code: string
          regular_price_inr: number | null
          savings_inr: number | null
          scan_type: string
          selected_centre_id: string | null
          source_path: string
          status: Database["public"]["Enums"]["enquiry_status"]
          therapy_slug: string | null
          updated_at: string
        }
        Insert: {
          campaign_attribution?: Json | null
          city: string
          consent_given: boolean
          created_at?: string
          discount_percent?: number | null
          email?: string | null
          enquiry_kind?: string
          id?: string
          mandatory_charges_inr?: number | null
          mobile: string
          name: string
          notes?: string | null
          offer_id?: string | null
          offer_price_inr?: number | null
          preferred_callback_time?: string | null
          preferred_date?: string | null
          preferred_locality?: string | null
          price_verified?: boolean
          pricing_snapshot?: Json | null
          protocol_code?: string | null
          reference_code: string
          regular_price_inr?: number | null
          savings_inr?: number | null
          scan_type: string
          selected_centre_id?: string | null
          source_path?: string
          status?: Database["public"]["Enums"]["enquiry_status"]
          therapy_slug?: string | null
          updated_at?: string
        }
        Update: {
          campaign_attribution?: Json | null
          city?: string
          consent_given?: boolean
          created_at?: string
          discount_percent?: number | null
          email?: string | null
          enquiry_kind?: string
          id?: string
          mandatory_charges_inr?: number | null
          mobile?: string
          name?: string
          notes?: string | null
          offer_id?: string | null
          offer_price_inr?: number | null
          preferred_callback_time?: string | null
          preferred_date?: string | null
          preferred_locality?: string | null
          price_verified?: boolean
          pricing_snapshot?: Json | null
          protocol_code?: string | null
          reference_code?: string
          regular_price_inr?: number | null
          savings_inr?: number | null
          scan_type?: string
          selected_centre_id?: string | null
          source_path?: string
          status?: Database["public"]["Enums"]["enquiry_status"]
          therapy_slug?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "scan_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiries_selected_centre_id_fkey"
            columns: ["selected_centre_id"]
            isOneToOne: false
            referencedRelation: "centres"
            referencedColumns: ["id"]
          },
        ]
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
      nuclear_medicine_therapies: {
        Row: {
          aliases: string[]
          attendance_guidance: string
          clinical_reviewed_at: string | null
          clinical_reviewer: string | null
          cost_factors: string
          created_at: string
          display_order: number
          faqs: Json
          featured: boolean
          follow_up_monitoring: string
          id: string
          introduction: string
          name: string
          preparation_guidance: string
          published: boolean
          related_scans: Json
          reports_and_scans: string[]
          seo_description: string
          seo_title: string
          short_name: string
          side_effects_precautions: string
          slug: string
          suitability_assessment: string
          summary: string
          treatment_process: string[]
          updated_at: string
          what_it_is: string
          who_may_be_considered: string
        }
        Insert: {
          aliases?: string[]
          attendance_guidance: string
          clinical_reviewed_at?: string | null
          clinical_reviewer?: string | null
          cost_factors: string
          created_at?: string
          display_order?: number
          faqs?: Json
          featured?: boolean
          follow_up_monitoring: string
          id?: string
          introduction: string
          name: string
          preparation_guidance: string
          published?: boolean
          related_scans?: Json
          reports_and_scans?: string[]
          seo_description: string
          seo_title: string
          short_name: string
          side_effects_precautions: string
          slug: string
          suitability_assessment: string
          summary: string
          treatment_process?: string[]
          updated_at?: string
          what_it_is: string
          who_may_be_considered: string
        }
        Update: {
          aliases?: string[]
          attendance_guidance?: string
          clinical_reviewed_at?: string | null
          clinical_reviewer?: string | null
          cost_factors?: string
          created_at?: string
          display_order?: number
          faqs?: Json
          featured?: boolean
          follow_up_monitoring?: string
          id?: string
          introduction?: string
          name?: string
          preparation_guidance?: string
          published?: boolean
          related_scans?: Json
          reports_and_scans?: string[]
          seo_description?: string
          seo_title?: string
          short_name?: string
          side_effects_precautions?: string
          slug?: string
          suitability_assessment?: string
          summary?: string
          treatment_process?: string[]
          updated_at?: string
          what_it_is?: string
          who_may_be_considered?: string
        }
        Relationships: []
      }
      scan_offers: {
        Row: {
          centre_id: string
          created_at: string
          exclusions: string[]
          id: string
          inclusions: string[]
          latitude: number | null
          limited_slots: boolean
          longitude: number | null
          mandatory_charges_inr: number
          offer_price_inr: number
          protocol_code: string
          regular_price_inr: number
          scan_name: string
          scan_type_id: string | null
          terms: string
          updated_at: string
          valid_from: string
          valid_until: string
          verified: boolean
          verified_at: string | null
        }
        Insert: {
          centre_id: string
          created_at?: string
          exclusions?: string[]
          id?: string
          inclusions?: string[]
          latitude?: number | null
          limited_slots?: boolean
          longitude?: number | null
          mandatory_charges_inr?: number
          offer_price_inr: number
          protocol_code: string
          regular_price_inr: number
          scan_name: string
          scan_type_id?: string | null
          terms?: string
          updated_at?: string
          valid_from?: string
          valid_until: string
          verified?: boolean
          verified_at?: string | null
        }
        Update: {
          centre_id?: string
          created_at?: string
          exclusions?: string[]
          id?: string
          inclusions?: string[]
          latitude?: number | null
          limited_slots?: boolean
          longitude?: number | null
          mandatory_charges_inr?: number
          offer_price_inr?: number
          protocol_code?: string
          regular_price_inr?: number
          scan_name?: string
          scan_type_id?: string | null
          terms?: string
          updated_at?: string
          valid_from?: string
          valid_until?: string
          verified?: boolean
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scan_offers_centre_id_fkey"
            columns: ["centre_id"]
            isOneToOne: false
            referencedRelation: "centres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scan_offers_scan_type_id_fkey"
            columns: ["scan_type_id"]
            isOneToOne: false
            referencedRelation: "scan_types"
            referencedColumns: ["id"]
          },
        ]
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
      therapy_centre_availability: {
        Row: {
          availability_notes: string
          centre_id: string | null
          centre_name: string
          city: string
          confirmed: boolean
          confirmed_at: string | null
          created_at: string
          id: string
          locality: string
          published: boolean
          therapy_id: string
          updated_at: string
        }
        Insert: {
          availability_notes?: string
          centre_id?: string | null
          centre_name: string
          city: string
          confirmed?: boolean
          confirmed_at?: string | null
          created_at?: string
          id?: string
          locality?: string
          published?: boolean
          therapy_id: string
          updated_at?: string
        }
        Update: {
          availability_notes?: string
          centre_id?: string | null
          centre_name?: string
          city?: string
          confirmed?: boolean
          confirmed_at?: string | null
          created_at?: string
          id?: string
          locality?: string
          published?: boolean
          therapy_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapy_centre_availability_centre_id_fkey"
            columns: ["centre_id"]
            isOneToOne: false
            referencedRelation: "centres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapy_centre_availability_therapy_id_fkey"
            columns: ["therapy_id"]
            isOneToOne: false
            referencedRelation: "nuclear_medicine_therapies"
            referencedColumns: ["id"]
          },
        ]
      }
      therapy_prices: {
        Row: {
          availability_id: string | null
          centre_name: string
          city: string
          created_at: string
          discount_amount_inr: number | null
          discount_percent: number | null
          exclusions: string[]
          id: string
          inclusions: string[]
          last_updated: string
          price_max_inr: number | null
          price_min_inr: number | null
          pricing_basis: string
          published: boolean
          regular_price_inr: number | null
          therapy_id: string
          updated_at: string
          valid_until: string | null
          verified: boolean
          verified_at: string | null
        }
        Insert: {
          availability_id?: string | null
          centre_name: string
          city: string
          created_at?: string
          discount_amount_inr?: number | null
          discount_percent?: number | null
          exclusions?: string[]
          id?: string
          inclusions?: string[]
          last_updated?: string
          price_max_inr?: number | null
          price_min_inr?: number | null
          pricing_basis: string
          published?: boolean
          regular_price_inr?: number | null
          therapy_id: string
          updated_at?: string
          valid_until?: string | null
          verified?: boolean
          verified_at?: string | null
        }
        Update: {
          availability_id?: string | null
          centre_name?: string
          city?: string
          created_at?: string
          discount_amount_inr?: number | null
          discount_percent?: number | null
          exclusions?: string[]
          id?: string
          inclusions?: string[]
          last_updated?: string
          price_max_inr?: number | null
          price_min_inr?: number | null
          pricing_basis?: string
          published?: boolean
          regular_price_inr?: number | null
          therapy_id?: string
          updated_at?: string
          valid_until?: string | null
          verified?: boolean
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapy_prices_availability_id_fkey"
            columns: ["availability_id"]
            isOneToOne: false
            referencedRelation: "therapy_centre_availability"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapy_prices_therapy_id_fkey"
            columns: ["therapy_id"]
            isOneToOne: false
            referencedRelation: "nuclear_medicine_therapies"
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
      [_ in never]: never
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
