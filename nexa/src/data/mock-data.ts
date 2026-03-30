import type { Milestone, Place, Trip } from "@/types/domain";

export const trips: Trip[] = [
  {
    id: "trip-alps",
    title: "Swiss Alpine Loop",
    startDate: "2026-06-10",
    endDate: "2026-06-18",
    region: "Graubuenden",
    country: "Switzerland",
    summary: "Roadtrip mit Aussichtspunkten, Staedten und kurzen Wanderstopps.",
  },
  {
    id: "trip-lisbon",
    title: "Lisbon Notes",
    startDate: "2026-09-03",
    endDate: "2026-09-08",
    region: "Lisbon District",
    country: "Portugal",
    summary: "Staedtetrip mit Food-Spots, Miradouros und Tagesroute entlang der Tram.",
  },
];

export const places: Place[] = [
  {
    id: "place-lake",
    name: "Lake Cauma",
    address: "Via Cauma, 7018 Flims",
    latitude: 46.8334,
    longitude: 9.2827,
    note: "Ruhiger Morgenstopp mit kurzer Badepause.",
    countryCode: "CH",
    countryName: "Switzerland",
    createdAt: "2026-06-12T09:10:00Z",
    tripIds: ["trip-alps"],
  },
  {
    id: "place-viewpoint",
    name: "Miradouro da Senhora do Monte",
    address: "Largo Monte, 1170-253 Lisboa",
    latitude: 38.7203,
    longitude: -9.1326,
    note: "Sonnenuntergang, guter Punkt fuer den ersten Abend.",
    countryCode: "PT",
    countryName: "Portugal",
    createdAt: "2026-09-03T18:40:00Z",
    tripIds: ["trip-lisbon"],
  },
  {
    id: "place-restaurant",
    name: "Restaurant Conn",
    address: "Conn, 7017 Flims Dorf",
    latitude: 46.8513,
    longitude: 9.3191,
    note: "Ideal fuer Mittagessen vor der Wanderung.",
    countryCode: "CH",
    countryName: "Switzerland",
    createdAt: "2026-06-14T11:25:00Z",
    tripIds: ["trip-alps"],
  },
];

export const milestones: Milestone[] = [
  {
    id: "m1",
    title: "Grundlayout und Navigation",
    description: "App-Shell, visuelle Richtung und erste Route-Segmente stehen.",
    status: "done",
  },
  {
    id: "m2",
    title: "Supabase anbinden",
    description: "Client, Env-Validierung und Auth-/Daten-Layer aufsetzen.",
    status: "next",
  },
  {
    id: "m3",
    title: "Map Search und Save Flow",
    description: "Map-Anbieter fuer Web evaluieren und Datenfluss definieren.",
    status: "later",
  },
  {
    id: "m4",
    title: "Trip-Zuordnung und Route Line",
    description: "Many-to-many UI plus chronologische Linienlogik umsetzen.",
    status: "later",
  },
];

export const dashboardStats = [
  { label: "Core Tabs", value: "3", detail: "Map, Trips, Places" },
  { label: "Backend", value: "Supabase", detail: "Auth + PostgreSQL" },
  { label: "Data Model", value: "Place <> Trip", detail: "Many-to-many ready" },
];
