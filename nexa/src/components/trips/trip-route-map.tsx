"use client";

import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { Place } from "@/types/entities";
import {
  getStraightLineRouteCoordinates,
  getStreetRouteCoordinates,
  type RouteCoordinate,
} from "@/lib/routing/trip-route";

type TripRouteMapProps = {
  places: Place[];
};

type TripRouteViewportProps = {
  places: Place[];
  routeCoordinates: RouteCoordinate[];
};

const fallbackCenter: [number, number] = [47.3769, 8.5417];

function hasValidCoordinates(place: Place) {
  return Number.isFinite(place.latitude) && Number.isFinite(place.longitude);
}

function TripRouteViewport({
  places,
  routeCoordinates,
}: TripRouteViewportProps) {
  const map = useMap();

  useEffect(() => {
    const fallbackCoordinates = getStraightLineRouteCoordinates(places).map(
      ([longitude, latitude]) => [latitude, longitude] as [number, number],
    );

    const routeBoundsCoordinates =
      routeCoordinates.length > 0
        ? routeCoordinates.map(
            ([longitude, latitude]) => [latitude, longitude] as [number, number],
          )
        : fallbackCoordinates;

    if (routeBoundsCoordinates.length === 0) {
      map.setView(fallbackCenter, 5);
      return;
    }

    if (routeBoundsCoordinates.length === 1) {
      map.setView(routeBoundsCoordinates[0], 12);
      return;
    }

    const bounds = L.latLngBounds(routeBoundsCoordinates);
    map.fitBounds(bounds, { padding: [36, 36] });
  }, [map, places, routeCoordinates]);

  return null;
}

export function TripRouteMap({ places }: TripRouteMapProps) {
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
    ([longitude, latitude]) => [latitude, longitude] as [number, number],
  );

  return (
    <MapContainer
      center={fallbackCenter}
      zoom={5}
      scrollWheelZoom
      className="h-[420px] w-full rounded-[1.5rem] md:h-[480px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <TripRouteViewport places={sortedPlaces} routeCoordinates={routeCoordinates} />

      {polylinePositions.length > 1 ? (
        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: "#d98952",
            weight: 4,
            opacity: 0.9,
          }}
        />
      ) : null}

      {sortedPlaces.map((place, index) => (
        <CircleMarker
          key={place.id}
          center={[place.latitude, place.longitude]}
          radius={9}
          pathOptions={{
            color: "#ffffff",
            weight: 3,
            fillColor: "#1f6b57",
            fillOpacity: 1,
          }}
        >
          <Popup>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Stop {index + 1}
              </p>
              <div>
                <p className="text-base font-semibold">{place.name}</p>
                <p className="text-sm text-zinc-600">
                  {place.address || "Keine Adresse"}
                </p>
              </div>
              <p className="text-xs text-zinc-500">
                {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
              </p>
              {place.note ? (
                <p className="text-sm text-zinc-700">{place.note}</p>
              ) : null}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
