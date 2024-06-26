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
      challenge: {
        Row: {
          challenge_id: number
          created_at: string | null
          title: string | null
          user_id: string | null
          likes_count: number | null
        }
        Insert: {
          challenge_id?: number
          created_at?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: number
          created_at?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      challenge_like: {
        Row: {
          challenge_id: number | null
          like_id: number
          user_id: string | null
        }
        Insert: {
          challenge_id?: number | null
          like_id?: number
          user_id?: string | null
        }
        Update: {
          challenge_id?: number | null
          like_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_like_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["challenge_id"]
          },
          {
            foreignKeyName: "challenge_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      challenge_participation: {
        Row: {
          challenge_id: number | null
          end_date: string | null
          participation_id: number
          start_date: string | null
          user_id: string | null
        }
        Insert: {
          challenge_id?: number | null
          end_date?: string | null
          participation_id?: number
          start_date?: string | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: number | null
          end_date?: string | null
          participation_id?: number
          start_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participation_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["challenge_id"]
          },
          {
            foreignKeyName: "challenge_participation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      challenge_record: {
        Row: {
          date: string
          id: number
          isSuccess: boolean | null
          participation_id: number | null
        }
        Insert: {
          date: string
          id?: number
          isSuccess?: boolean | null
          participation_id?: number | null
        }
        Update: {
          date?: string
          id?: number
          isSuccess?: boolean | null
          participation_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_record_participation_id_fkey"
            columns: ["participation_id"]
            isOneToOne: false
            referencedRelation: "challenge_participation"
            referencedColumns: ["participation_id"]
          },
        ]
      }
      challenge_task: {
        Row: {
          challenge_id: number | null
          task_id: number
          taskname: string | null
          time: string | null
        }
        Insert: {
          challenge_id?: number | null
          task_id?: number
          taskname?: string | null
          time?: string | null
        }
        Update: {
          challenge_id?: number | null
          task_id?: number
          taskname?: string | null
          time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_task_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["challenge_id"]
          },
        ]
      }
      comment: {
        Row: {
          challenge_id: number | null
          comment_id: number
          content: string | null
          created_at: string
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          challenge_id?: number | null
          comment_id?: number
          content?: string | null
          created_at?: string
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: number | null
          comment_id?: number
          content?: string | null
          created_at?: string
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["challenge_id"]
          },
          {
            foreignKeyName: "comment_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post: {
        Row: {
          content: string | null
          create_at: string | null
          post_id: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          create_at?: string | null
          post_id?: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          create_at?: string | null
          post_id?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post_like: {
        Row: {
          like_id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          like_id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          like_id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      task_status: {
        Row: {
          date: string | null
          status_id: number
          success: boolean | null
          task_id: number | null
        }
        Insert: {
          date?: string | null
          status_id?: number
          success?: boolean | null
          task_id?: number | null
        }
        Update: {
          date?: string | null
          status_id?: number
          success?: boolean | null
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "task_status_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "challenge_task"
            referencedColumns: ["task_id"]
          },
        ]
      }
      user: {
        Row: {
          email: string | null
          profile_image: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          email?: string | null
          profile_image?: string | null
          user_id?: string
          username?: string | null
        }
        Update: {
          email?: string | null
          profile_image?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      likes_count: {
        Args: {
          "": unknown
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
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
