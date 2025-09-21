export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      excercises: {
        Row: {
          description: string;
          id: string;
          muscle_group: string;
          name: string;
          video_url: string | null;
        };
        Insert: {
          description: string;
          id?: string;
          muscle_group: string;
          name: string;
          video_url?: string | null;
        };
        Update: {
          description?: string;
          id?: string;
          muscle_group?: string;
          name?: string;
          video_url?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          password_hash: string;
          created_at: string | null;
          avatar: string | null;
          session_token: string | null; 
          session_expiry: string | null; 
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          password_hash: string;
          created_at?: string | null;
          avatar?: string | null;
          session_token?: string | null;
          session_expiry?: string | null;
        };
        Update: {
          name?: string;
          email?: string;
          password_hash?: string;
          created_at?: string | null;
          avatar?: string | null;
          session_token?: string | null;
          session_expiry?: string | null;
        };
        Relationships: [];
      };      
      nutrition_logs: {
        Row: {
          calories: number;
          date: string;
          id: string;
          macros: Json | null;
          meal_name: string;
          profile_id: string;
        };
        Insert: {
          calories: number;
          date: string;
          id?: string;
          macros?: Json | null;
          meal_name: string;
          profile_id: string;
        };
        Update: {
          calories?: number;
          date?: string;
          id?: string;
          macros?: Json | null;
          meal_name?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "nutrition_logs_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          auth_id: string;
          avatar: string | null;
          body_measurements: Json | null;
          created_at: string;
          fitness_goal: string | null;
          height: number | null;
          id: string;
          name: string;
          weight: number | null;
        };
        Insert: {
          auth_id: string;
          avatar?: string | null;
          body_measurements?: Json | null;
          created_at?: string;
          fitness_goal?: string | null;
          height?: number | null;
          id?: string;
          name: string;
          weight?: number | null;
        };
        Update: {
          auth_id?: string;
          avatar?: string | null;
          body_measurements?: Json | null;
          created_at?: string;
          fitness_goal?: string | null;
          height?: number | null;
          id?: string;
          name?: string;
          weight?: number | null;
        };
        Relationships: [];
      };
      progress_photos: {
        Row: {
          created_at: string;
          date_taken: string;
          id: string;
          photo_url: string;
          profile_id: string;
        };
        Insert: {
          created_at?: string;
          date_taken: string;
          id?: string;
          photo_url: string;
          profile_id: string;
        };
        Update: {
          created_at?: string;
          date_taken?: string;
          id?: string;
          photo_url?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "progress_photos_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      social_connections: {
        Row: {
          created_at: string;
          followed_id: string | null;
          follower_id: string | null;
          id: string;
        };
        Insert: {
          created_at?: string;
          followed_id?: string | null;
          follower_id?: string | null;
          id?: string;
        };
        Update: {
          created_at?: string;
          followed_id?: string | null;
          follower_id?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "social_connections_followed_id_fkey";
            columns: ["followed_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "social_connections_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      social_posts: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          media_url: string | null;
          profile_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          media_url?: string | null;
          profile_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          media_url?: string | null;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "social_posts_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      workout_excercises: {
        Row: {
          excercise_id: string;
          id: string;
          reps: number | null;
          rest_time: number | null;
          sets: number | null;
          weight: number | null;
          workout_id: string;
        };
        Insert: {
          excercise_id: string;
          id?: string;
          reps?: number | null;
          rest_time?: number | null;
          sets?: number | null;
          weight?: number | null;
          workout_id: string;
        };
        Update: {
          excercise_id?: string;
          id?: string;
          reps?: number | null;
          rest_time?: number | null;
          sets?: number | null;
          weight?: number | null;
          workout_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workout_excercises_excercise_id_fkey";
            columns: ["excercise_id"];
            isOneToOne: false;
            referencedRelation: "excercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_excercises_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          }
        ];
      };
      workouts: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          profile_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          profile_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "workouts_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
