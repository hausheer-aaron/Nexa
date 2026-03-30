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
      places: {
        Row: {
          address: string | null;
          country_code: string | null;
          country_name: string | null;
          created_at: string;
          id: string;
          latitude: number;
          longitude: number;
          name: string;
          note: string | null;
          user_id: string;
        };
        Insert: {
          address?: string | null;
          country_code?: string | null;
          country_name?: string | null;
          created_at?: string;
          id?: string;
          latitude: number;
          longitude: number;
          name: string;
          note?: string | null;
          user_id: string;
        };
        Update: {
          address?: string | null;
          country_code?: string | null;
          country_name?: string | null;
          created_at?: string;
          id?: string;
          latitude?: number;
          longitude?: number;
          name?: string;
          note?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
        };
        Relationships: [];
      };
      trip_places: {
        Row: {
          added_at: string;
          id: string;
          place_id: string;
          trip_id: string;
        };
        Insert: {
          added_at?: string;
          id?: string;
          place_id: string;
          trip_id: string;
        };
        Update: {
          added_at?: string;
          id?: string;
          place_id?: string;
          trip_id?: string;
        };
        Relationships: [];
      };
      trips: {
        Row: {
          country: string | null;
          created_at: string;
          end_date: string;
          id: string;
          region: string | null;
          start_date: string;
          title: string;
          user_id: string;
        };
        Insert: {
          country?: string | null;
          created_at?: string;
          end_date: string;
          id?: string;
          region?: string | null;
          start_date: string;
          title: string;
          user_id: string;
        };
        Update: {
          country?: string | null;
          created_at?: string;
          end_date?: string;
          id?: string;
          region?: string | null;
          start_date?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
