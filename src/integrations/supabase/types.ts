export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      helpline_responses: {
        Row: {
          additional_info: string | null
          area: string | null
          blindness: boolean
          chronic_conditions_count: number
          created_at: string
          days_without_supplies: number
          diabetes: boolean
          dialysis_dependent: boolean
          disability_count: number
          heart_disease: boolean
          id: string
          injury_status: Database["public"]["Enums"]["injury_severity"]
          is_pregnant: boolean
          medicine_needed: boolean
          num_adults: number
          num_children: number
          num_elderly: number
          other_disabilities: boolean
          pregnancy_trimester: Database["public"]["Enums"]["pregnancy_trimester"]
          priority_score: number
          region: string | null
          structural_damage: Database["public"]["Enums"]["structural_damage"]
          toilet_access: boolean
          vehicles_submerged: number
          water_level: Database["public"]["Enums"]["water_level"]
          wheelchair_user: boolean
        }
        Insert: {
          additional_info?: string | null
          area?: string | null
          blindness?: boolean
          chronic_conditions_count?: number
          created_at?: string
          days_without_supplies: number
          diabetes?: boolean
          dialysis_dependent?: boolean
          disability_count?: number
          heart_disease?: boolean
          id?: string
          injury_status?: Database["public"]["Enums"]["injury_severity"]
          is_pregnant?: boolean
          medicine_needed?: boolean
          num_adults: number
          num_children: number
          num_elderly: number
          other_disabilities?: boolean
          pregnancy_trimester?: Database["public"]["Enums"]["pregnancy_trimester"]
          priority_score: number
          region?: string | null
          structural_damage: Database["public"]["Enums"]["structural_damage"]
          toilet_access?: boolean
          vehicles_submerged: number
          water_level: Database["public"]["Enums"]["water_level"]
          wheelchair_user?: boolean
        }
        Update: {
          additional_info?: string | null
          area?: string | null
          blindness?: boolean
          chronic_conditions_count?: number
          created_at?: string
          days_without_supplies?: number
          diabetes?: boolean
          dialysis_dependent?: boolean
          disability_count?: number
          heart_disease?: boolean
          id?: string
          injury_status?: Database["public"]["Enums"]["injury_severity"]
          is_pregnant?: boolean
          medicine_needed?: boolean
          num_adults?: number
          num_children?: number
          num_elderly?: number
          other_disabilities?: boolean
          pregnancy_trimester?: Database["public"]["Enums"]["pregnancy_trimester"]
          priority_score?: number
          region?: string | null
          structural_damage?: Database["public"]["Enums"]["structural_damage"]
          toilet_access?: boolean
          vehicles_submerged?: number
          water_level?: Database["public"]["Enums"]["water_level"]
          wheelchair_user?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
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
      injury_severity: "none" | "fracture" | "bleeding" | "multiple-injuries"
      pregnancy_trimester: "none" | "first" | "second" | "third"
      structural_damage: "none" | "cracked-walls" | "collapsed-structure"
      user_role: "admin" | "user"
      water_level: "knee-high" | "waist-high" | "chest-high" | "neck-high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
