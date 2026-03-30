"use client";

import dynamic from "next/dynamic";
import type { Place } from "@/types/entities";

type TripRouteMapShellProps = {
  places: Place[];
};

const DynamicTripRouteMap = dynamic(
  () => import("@/components/trips/trip-route-map").then((mod) => mod.TripRouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="trip-route-map-frame flex items-center justify-center bg-[#dbe8df] text-sm text-muted">
        Route wird geladen...
      </div>
    ),
  },
);

export function TripRouteMapShell({ places }: TripRouteMapShellProps) {
  return <DynamicTripRouteMap places={places} />;
}
