"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import type { Map as MapLibreMapInstance } from "maplibre-gl";
import { getMapTilerStyleUrl } from "@/lib/map/maptiler";

type MapLibreMapProps = {
  className?: string;
  initialCenter: [number, number];
  initialZoom: number;
  onMapReady?: (map: MapLibreMapInstance) => void;
  onMapClick?: (point: { latitude: number; longitude: number }) => void;
};

export function MapLibreMap({
  className,
  initialCenter,
  initialZoom,
  onMapReady,
  onMapClick,
}: MapLibreMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMapInstance | null>(null);
  const styleUrl = getMapTilerStyleUrl();
  const handleMapReady = useEffectEvent((map: MapLibreMapInstance) => {
    onMapReady?.(map);
  });
  const handleMapClick = useEffectEvent((point: {
    latitude: number;
    longitude: number;
  }) => {
    onMapClick?.(point);
  });

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !styleUrl) {
      return;
    }

    let isDisposed = false;
    let map: MapLibreMapInstance | null = null;

    void import("maplibre-gl").then((maplibregl) => {
      if (isDisposed || !containerRef.current) {
        return;
      }

      map = new maplibregl.Map({
        container: containerRef.current,
        style: styleUrl,
        center: initialCenter,
        zoom: initialZoom,
      });

      mapRef.current = map;
      map.addControl(new maplibregl.NavigationControl(), "top-right");

      map.on("load", () => {
        if (!map) {
          return;
        }

        handleMapReady(map);
      });

      map.on("click", (event) => {
        handleMapClick({
          latitude: event.lngLat.lat,
          longitude: event.lngLat.lng,
        });
      });
    });

    return () => {
      isDisposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [initialCenter, initialZoom, styleUrl]);

  if (!styleUrl) {
    return (
      <div className="maplibre-map-frame flex items-center justify-center bg-[#dbe8df] px-6 text-center text-sm text-muted">
        NEXT_PUBLIC_MAPTILER_KEY fehlt. Die Karte kann nicht geladen werden.
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}
