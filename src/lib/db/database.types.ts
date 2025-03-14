export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cases: {
        Row: {
          parent_document: string | null;
          disposal_nature: string | null;
          court: string | null;
          chunks_array: Json | null;
          registration_date: string | null;
          case_name: string | null;
          judge: string | null;
          decision_date: string | null;
          CNR: string | null;
          file_id: string;
        };
        Insert: {
          parent_document?: string | null;
          disposal_nature?: string | null;
          court?: string | null;
          chunks_array?: Json | null;
          registration_date?: string | null;
          case_name?: string | null;
          judge?: string | null;
          decision_date?: string | null;
          CNR?: string | null;
          file_id?: string | null;
        };
        Update: {
          parent_document?: string | null;
          disposal_nature?: string | null;
          court?: string | null;
          chunks_array?: Json | null;
          registration_date?: string | null;
          case_name?: string | null;
          judge?: string | null;
          decision_date?: string | null;
          CNR?: string | null;
          file_id?: string | null;
        };
        Relationships: [];
      };
      acts: {
        Row: {
          act_name: string | null;
          pdf_link: string;
          parent_document: string | null;
          enactment_date: string | null;
          act_type: string | null;
        };
        Insert: {
          act_name?: string | null;
          pdf_link?: string;
          parent_document?: string | null;
          enactment_date?: string | null;
          act_type?: string | null;
        };
        Update: {
          act_name?: string | null;
          pdf_link?: string;
          parent_document?: string | null;
          enactment_date?: string | null;
          act_type?: string | null;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          answer: string | null;
          created_at: string;
          id: string;
          query: string;
          thread_id: string;
          user_id: string;
          // cases: string[] | null;
          // jurisdiction: string[];
          // type: string;
          // analysis: string | null;
          // documents: string[][] | null;
        };
        Insert: {
          // analysis?: string | null;
          answer?: string | null;
          // cases?: string[] | null;
          created_at?: string;
          id?: string;
          query: string;
          thread_id: string;
          // type?: string;
          user_id?: string;
          // documents?: string[][] | null;
          // jurisdiction?: string[];
        };
        Update: {
          // analysis?: string | null;
          answer?: string | null;
          // cases?: string[] | null;
          created_at?: string;
          id?: string;
          query?: string;
          thread_id?: string;
          // type?: string;
          user_id?: string;
          // documents?: string[][] | null;
          // jurisdiction?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "Conversations_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "Threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Conversations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      databases: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          has_access: Database["public"]["Enums"]["HasAccess"] | null;
          id: string;
          name: string;
          relatedDocuments: string[] | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          has_access?: Database["public"]["Enums"]["HasAccess"] | null;
          id?: string;
          name?: string;
          relatedDocuments?: string[] | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          has_access?: Database["public"]["Enums"]["HasAccess"] | null;
          id?: string;
          name?: string;
          relatedDocuments?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "Databases_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      threads: {
        Row: {
          created_at: string;
          desciption: string | null;
          id: string;
          modified_at: string;
          title: string;
          user_id: string | null;
          workspace_id: string;
        };
        Insert: {
          created_at?: string;
          desciption?: string | null;
          id?: string;
          modified_at?: string;
          title?: string;
          user_id?: string | null;
          // workspace_id?: string;
        };
        Update: {
          created_at?: string;
          desciption?: string | null;
          id?: string;
          modified_at?: string;
          title?: string;
          user_id?: string | null;
          // workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Threads_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Threads_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "Workspaces";
            referencedColumns: ["id"];
          }
        ];
      };
      workspaces: {
        Row: {
          created_at: string;
          fts: unknown | null;
          id: string;
          last_modified: string;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          fts?: unknown | null;
          id?: string;
          last_modified?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          fts?: unknown | null;
          id?: string;
          last_modified?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Workspaces_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
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
      HasAccess: "Onlyme" | "Everyone";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
