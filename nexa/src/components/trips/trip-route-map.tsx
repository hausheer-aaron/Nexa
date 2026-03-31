"use client";

import { useEffect, useMemo, useState } from "react";
import type { Map as MapLibreMapInstance, Marker, Popup } from "maplibre-gl";
import { MapLibreMap } from "@/components/map/maplibre-map";
import {
  buildPlacePopupHtml,
  createMarkerElement,
  fallbackCenter,
  fallbackZoom,
  hasValidCoordinates,
  singlePlaceZoom,
} from "@/lib/map/maplibre-utils";
import type { Place } from "@/types/entities";
import {
  getStraightLineRouteCoordinates,
  getStreetRouteCoordinates,
  type RouteCoordinate,
} from "@/lib/routing/trip-route";

type TripRouteMapProps = {
  places: Place[];
};

const routeSourceId = "trip-route-source";
const routeLayerId = "trip-route-line";

export function TripRouteMap({ places }: TripRouteMapProps) {
  const [map, setMap] = useState<MapLibreMapInstance | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<RouteCoordinate[]>([]);

  const sortedPlaces = useMemo(
    () =>
      [...places]
        .filter(hasValidCoordinates)
        .sort((left, right) => left.created_at.localeCompare(right.created_at)),
    [places],
  );

  const routeKey = useMemo(
    () =>
      sortedPlaces
        .map(
          (place) =>
            `${place.id}:${place.created_at}:${place.latitude}:${place.longitude}`,
        )
        .join("|"),
    [sortedPlaces],
  );

  useEffect(() => {
    let isCancelled = false;

    async function loadRoute() {
      const fallbackRoute = getStraightLineRouteCoordinates(sortedPlaces);
      setRouteCoordinates(fallbackRoute);

      try {
        const streetRoute = await getStreetRouteCoordinates(sortedPlaces);

        if (!isCancelled && streetRoute && streetRoute.length > 0) {
          setRouteCoordinates(streetRoute);
        }
      } catch {
        // Keep the fallback straight route if the routing request fails.
      }
    }

    void loadRoute();

    return () => {
      isCancelled = true;
    };
  }, [routeKey, sortedPlaces]);

  const polylinePositions = routeCoordinates.map(
    ([longitude, latitude]) => [longitude, latitude] as [number, number],
  );

  useEffect(() => {
    if (!map) {
      return;
    }

    let isDisposed = false;
    const markers: Marker[] = [];
    const popups: Popup[] = [];

    void import("maplibre-gl").then((maplibregl) => {
      if (isDisposed) {
        return;
      }

      for (const [index, place] of sortedPlaces.entries()) {
        const popup = new maplibregl.Popup({
          offset: 18,
          closeButton: false,
          closeOnMove: false,
        }).setDOMContent(buildPlacePopupHtml(place, index + 1));

        const marker = new maplibregl.Marker({
          element: createMarkerElement("place"),
        })
          .setLngLat([place.longitude, place.latitude])
          .setPopup(popup)
          .addTo(map);

        markers.push(marker);
        popups.push(popup);
      }
    });

    return () => {
      isDisposed = true;
      markers.forEach((marker) => marker.remove());
      popups.forEach((popup) => popup.remove());
    };
  }, [map, sortedPlaces]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const fallbackCoordinates = getStraightLineRouteCoordinates(sortedPlaces);
    const visibleRoute =
      polylinePositions.length > 1 ? polylinePositions : fallbackCoordinates;

    if (map.getLayer(routeLayerId)) {
      map.removeLayer(routeLayerId);
    }

    if (map.getSource(routeSourceId)) {
      map.removeSource(routeSourceId);
    }

    if (visibleRoute.length > 1) {
      map.addSource(routeSourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: visibleRoute,
          },
        },
      });

      map.addLayer({
        id: routeLayerId,
        type: "line",
        source: routeSourceId,
        paint: {
          "line-color": "#d98952",
          "line-width": 4,
          "line-opacity": 0.9,
        },
      });
    }

    const boundsCoordinates =
      visibleRoute.length > 0
        ? visibleRoute
        : sortedPlaces.map(
            (place) => [place.longitude, place.latitude] as [number, number],
          );

    if (boundsCoordinates.length === 0) {
      map.easeTo({
        center: fallbackCenter,
        zoom: fallbackZoom,
        duration: 800,
      });
      return;
    }

    if (boundsCoordinates.length === 1) {
      map.easeTo({
        center: boundsCoordinates[0],
        zoom: singlePlaceZoom,
        duration: 800,
      });
      return;
    }

    void import("maplibre-gl").then((maplibregl) => {
      const bounds = boundsCoordinates.reduce(
        (currentBounds, coordinate) => currentBounds.extend(coordinate),
        new maplibregl.LngLatBounds(
          boundsCoordinates[0],
          boundsCoordinates[0],
        ),
      );

      map.fitBounds(bounds, {
        padding: 36,
        duration: 800,
      });
    });

    return () => {
      if (map.getLayer(routeLayerId)) {
        map.removeLayer(routeLayerId);
      }

      if (map.getSource(routeSourceId)) {
        map.removeSource(routeSourceId);
      }
    };
  }, [map, polylinePositions, sortedPlaces]);

  return (
    <MapLibreMap
      className="maplibre-map-frame"
      initialCenter={fallbackCenter}
      initialZoom={fallbackZoom}
      onMapReady={setMap}
    />
  );
}
