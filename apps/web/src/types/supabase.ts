export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            bookmark: {
                Row: {
                    created_at: string;
                    id: string;
                    post_id: string | null;
                    user_id: string | null;
                };
                Insert: {
                    created_at?: string;
                    id: string;
                    post_id?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    post_id?: string | null;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "bookmark_post_id_fkey";
                        columns: ["post_id"];
                        isOneToOne: false;
                        referencedRelation: "post";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "bookmark_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profile";
                        referencedColumns: ["id"];
                    },
                ];
            };
            hashtag: {
                Row: {
                    id: string;
                    name: string;
                };
                Insert: {
                    id: string;
                    name: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                };
                Relationships: [];
            };
            like: {
                Row: {
                    created_at: string;
                    id: string;
                    post_id: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id: string;
                    post_id: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    post_id?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "like_post_id_fkey";
                        columns: ["post_id"];
                        isOneToOne: false;
                        referencedRelation: "post";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "like_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profile";
                        referencedColumns: ["id"];
                    },
                ];
            };
            post: {
                Row: {
                    created_at: string;
                    id: string;
                    profile_id: string;
                    text: string;
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    id: string;
                    profile_id: string;
                    text: string;
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    profile_id?: string;
                    text?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "post_profile_id_fkey";
                        columns: ["profile_id"];
                        isOneToOne: false;
                        referencedRelation: "profile";
                        referencedColumns: ["id"];
                    },
                ];
            };
            post_hashtag: {
                Row: {
                    hashtag_id: string;
                    post_id: string;
                };
                Insert: {
                    hashtag_id: string;
                    post_id: string;
                };
                Update: {
                    hashtag_id?: string;
                    post_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "post_hashtag_hashtag_id_fkey";
                        columns: ["hashtag_id"];
                        isOneToOne: false;
                        referencedRelation: "hashtag";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "post_hashtag_post_id_fkey";
                        columns: ["post_id"];
                        isOneToOne: false;
                        referencedRelation: "post";
                        referencedColumns: ["id"];
                    },
                ];
            };
            profile: {
                Row: {
                    full_name: string | null;
                    id: string;
                    updated_at: string;
                    username: string;
                };
                Insert: {
                    full_name?: string | null;
                    id: string;
                    updated_at?: string;
                    username: string;
                };
                Update: {
                    full_name?: string | null;
                    id?: string;
                    updated_at?: string;
                    username?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "profile_id_fkey";
                        columns: ["id"];
                        isOneToOne: true;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            reply: {
                Row: {
                    id: string;
                    post_id: string | null;
                    reply_id: string | null;
                    text: string;
                    user_id: string;
                };
                Insert: {
                    id: string;
                    post_id?: string | null;
                    reply_id?: string | null;
                    text: string;
                    user_id: string;
                };
                Update: {
                    id?: string;
                    post_id?: string | null;
                    reply_id?: string | null;
                    text?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "reply_post_id_fkey";
                        columns: ["post_id"];
                        isOneToOne: false;
                        referencedRelation: "post";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "reply_reply_id_fkey";
                        columns: ["reply_id"];
                        isOneToOne: false;
                        referencedRelation: "reply";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "reply_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profile";
                        referencedColumns: ["id"];
                    },
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

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
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
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
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
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
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
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
      ? Database["public"]["Enums"][PublicEnumNameOrOptions]
      : never;
