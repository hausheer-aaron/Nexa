"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
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

type MapViewportProps = {
  places: Place[];
};

const fallbackCenter: [number, number] = [47.3769, 8.5417];

function hasValidCoordinates(place: Place) {
  return Number.isFinite(place.latitude) && Number.isFinite(place.longitude);
}

function MapViewport({ places }: MapViewportProps) {
  const map = useMap();
  const visiblePlaces = places.filter(hasValidCoordinates);

  useEffect(() => {
    if (visiblePlaces.length === 0) {
      map.setView(fallbackCenter, 5);
      return;
    }

    if (visiblePlaces.length === 1) {
      const place = visiblePlaces[0];
      map.setView([place.latitude, place.longitude], 12);
      return;
    }

    const bounds = L.latLngBounds(
      visiblePlaces.map(
        (place) => [place.latitude, place.longitude] as [number, number],
      ),
    );

    map.fitBounds(bounds, {
      padding: [36, 36],
    });
  }, [map, visiblePlaces]);

  return null;
}

function MapClickHandler({
  onSelectPoint,
}: Pick<PlacesMapProps, "onSelectPoint">) {
  useMapEvents({
    click(event) {
      onSelectPoint({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

export function PlacesMap({
  places,
  selectedPoint,
  onSelectPoint,
}: PlacesMapProps) {
  const visiblePlaces = places.filter(hasValidCoordinates);

  return (
    <MapContainer
      center={fallbackCenter}
      zoom={5}
      scrollWheelZoom
      className="h-full min-h-[440px] w-full rounded-[1.5rem]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewport places={visiblePlaces} />
      <MapClickHandler onSelectPoint={onSelectPoint} />

      {visiblePlaces.map((place) => (
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

      {selectedPoint ? (
        <CircleMarker
          center={[selectedPoint.latitude, selectedPoint.longitude]}
          radius={11}
          pathOptions={{
            color: "#ffffff",
            weight: 3,
            fillColor: "#d98952",
            fillOpacity: 1,
          }}
        >
          <Popup>
            <div className="space-y-2">
              <p className="text-base font-semibold">Ausgewaehlter Punkt</p>
              <p className="text-xs text-zinc-500">
                {selectedPoint.latitude.toFixed(6)},{" "}
                {selectedPoint.longitude.toFixed(6)}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ) : null}
    </MapContainer>
  );
}
