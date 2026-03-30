import type { Database } from "@/types/supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Trip = Database["public"]["Tables"]["trips"]["Row"];
export type Place = Database["public"]["Tables"]["places"]["Row"];
export type TripPlace = Database["public"]["Tables"]["trip_places"]["Row"];

export type CreateTripInput = Pick<
  Database["public"]["Tables"]["trips"]["Insert"],
  "title" | "region" | "country" | "start_date" | "end_date"
>;

export type UpdateTripInput = Pick<
  Database["public"]["Tables"]["trips"]["Update"],
  "title" | "region" | "country" | "start_date" | "end_date"
>;

export type CreatePlaceInput = Pick<
  Database["public"]["Tables"]["places"]["Insert"],
  | "name"
  | "address"
  | "latitude"
  | "longitude"
  | "note"
  | "country_code"
  | "country_name"
>;

export type UpdatePlaceInput = Pick<
  Database["public"]["Tables"]["places"]["Update"],
  | "name"
  | "address"
  | "latitude"
  | "longitude"
  | "note"
  | "country_code"
  | "country_name"
>;
