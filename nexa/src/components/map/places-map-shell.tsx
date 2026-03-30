"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { CreatePlaceFromMapForm } from "@/components/map/create-place-from-map-form";
import type { Place } from "@/types/entities";
import type { SelectedMapPoint } from "@/components/map/places-map";

type PlacesMapShellProps = {
  places: Place[];
};

const DynamicPlacesMap = dynamic(
  () => import("@/components/map/places-map").then((mod) => mod.PlacesMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[440px] items-center justify-center rounded-[1.5rem] bg-[#dbe8df] text-sm text-muted">
        Karte wird geladen...
      </div>
    ),
  },
);

export function PlacesMapShell({ places }: PlacesMapShellProps) {
  const [selectedPoint, setSelectedPoint] = useState<SelectedMapPoint | null>(
    null,
  );

  return (
    <div className="space-y-4">
      <DynamicPlacesMap
        places={places}
        selectedPoint={selectedPoint}
        onSelectPoint={setSelectedPoint}
      />

      <div className="rounded-[1.25rem] border border-border bg-white/70 px-4 py-3">
        <p className="eyebrow text-accent">Ausgewaehlter Punkt</p>
        {selectedPoint ? (
          <div className="mt-3 space-y-1">
            <p className="font-semibold text-foreground">
              {selectedPoint.latitude.toFixed(6)},{" "}
              {selectedPoint.longitude.toFixed(6)}
            </p>
            <p className="text-sm text-muted">
              Klick auf die Karte verschiebt den temporaeren Marker.
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Klick auf die Karte, um Koordinaten auszuwaehlen.
          </p>
        )}
      </div>

      <div className="rounded-[1.25rem] border border-border bg-white/70 px-4 py-4">
        <CreatePlaceFromMapForm
          key={
            selectedPoint
              ? `${selectedPoint.latitude}-${selectedPoint.longitude}`
              : "no-selection"
          }
          selectedPoint={selectedPoint}
          onSaved={() => setSelectedPoint(null)}
        />
      </div>
    </div>
  );
}
