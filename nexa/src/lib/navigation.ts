import type { AppRoute } from "@/types/domain";

export const navigationItems: Array<{
  href: AppRoute;
  label: string;
  description: string;
}> = [
  {
    href: "/",
    label: "Dashboard",
    description: "Status, Scope und naechste Schritte",
  },
  {
    href: "/map",
    label: "Karte",
    description: "Suche, Pins und Karteneinstieg",
  },
  {
    href: "/trips",
    label: "Trips",
    description: "Reisen, Zeitraeume und Route",
  },
  {
    href: "/places",
    label: "Orte",
    description: "Gespeicherte Orte und Notizen",
  },
  {
    href: "/timeline",
    label: "Timeline",
    description: "Chronologische Reiseansicht",
  },
  {
    href: "/account",
    label: "Account",
    description: "Login, Sync und Einstellungen",
  },
];
