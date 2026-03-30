export type AppRoute =
  | "/"
  | "/map"
  | "/trips"
  | "/places"
  | "/timeline"
  | "/account";

export type Place = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  note: string;
  countryCode: string;
  countryName: string;
  createdAt: string;
  tripIds: string[];
};

export type Trip = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  region?: string;
  country?: string;
  summary: string;
};

export type Milestone = {
  id: string;
  title: string;
  description: string;
  status: "done" | "next" | "later";
};
