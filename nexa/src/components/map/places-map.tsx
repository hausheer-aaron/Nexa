"use client";

import { useEffect, useState } from "react";
import type { Map as MapLibreMapInstance, Marker, Popup } from "maplibre-gl";
import { MapLibreMap } from "@/components/map/maplibre-map";
import {
  buildPlacePopupHtml,
  buildSelectedPointPopupHtml,
  createMarkerElement,
  fallbackCenter,
  fallbackZoom,
  hasValidCoordinates,
  singlePlaceZoom,
} from "@/lib/map/maplibre-utils";
import type { Place } from "@/types/entities";

export type SelectedMapPoint = {
  latitude: number;
  longitude: number;
};

type PlacesMapProps = {
  places: Place[];
  selectedPoint: SelectedMapPoint | null;
  onSelectPoint: (point: SelectedMapPoint) => void;
};

export function PlacesMap({
  places,
  selectedPoint,
  onSelectPoint,
}: PlacesMapProps) {
  const [map, setMap] = useState<MapLibreMapInstance | null>(null);
  const visiblePlaces = places.filter(hasValidCoordinates);

  useEffect(() => {
    if (!map) {
      return;
    }

    let isDisposed = false;
    const markers: Marker[] = [];
    const popups: Popup[] = [];
    let selectedMarker: Marker | null = null;
    let selectedPopup: Popup | null = null;

    void import("maplibre-gl").then((maplibregl) => {
      if (isDisposed) {
        return;
      }

      for (const place of visiblePlaces) {
        const popup = new maplibregl.Popup({
          offset: 18,
          closeButton: false,
          closeOnMove: false,
        }).setDOMContent(buildPlacePopupHtml(place));

        const marker = new maplibregl.Marker({
          element: createMarkerElement("place"),
        })
          .setLngLat([place.longitude, place.latitude])
          .setPopup(popup)
          .addTo(map);

        markers.push(marker);
        popups.push(popup);
      }

      if (selectedPoint) {
        selectedPopup = new maplibregl.Popup({
          offset: 18,
          closeButton: false,
          closeOnMove: false,
        }).setDOMContent(
          buildSelectedPointPopupHtml(
            selectedPoint.latitude,
            selectedPoint.longitude,
          ),
        );

        selectedMarker = new maplibregl.Marker({
          element: createMarkerElement("selected"),
        })
          .setLngLat([selectedPoint.longitude, selectedPoint.latitude])
          .setPopup(selectedPopup)
          .addTo(map);
      }
    });

    return () => {
      isDisposed = true;
      selectedMarker?.remove();
      selectedPopup?.remove();
      markers.forEach((marker) => marker.remove());
      popups.forEach((popup) => popup.remove());
    };
  }, [map, selectedPoint, visiblePlaces]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (visiblePlaces.length === 0) {
      map.easeTo({
        center: fallbackCenter,
        zoom: fallbackZoom,
        duration: 800,
      });
      return;
    }

    if (visiblePlaces.length === 1) {
      const place = visiblePlaces[0];
      map.easeTo({
        center: [place.longitude, place.latitude],
        zoom: singlePlaceZoom,
        duration: 800,
      });
      return;
    }

    void import("maplibre-gl").then((maplibregl) => {
      const bounds = visiblePlaces.reduce(
        (currentBounds, place) =>
          currentBounds.extend([place.longitude, place.latitude]),
        new maplibregl.LngLatBounds(
          [visiblePlaces[0].longitude, visiblePlaces[0].latitude],
          [visiblePlaces[0].longitude, visiblePlaces[0].latitude],
        ),
      );

      map.fitBounds(bounds, {
        padding: 36,
        duration: 800,
      });
    });
  }, [map, visiblePlaces]);

  return (
    <MapLibreMap
      className="maplibre-map-frame"
      initialCenter={fallbackCenter}
      initialZoom={fallbackZoom}
      onMapReady={setMap}
      onMapClick={onSelectPoint}
    />
  );
}
