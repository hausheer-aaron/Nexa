import type { Place } from "@/types/entities";

export const fallbackCenter: [number, number] = [8.5417, 47.3769];
export const fallbackZoom = 5;
export const singlePlaceZoom = 12;

export function hasValidCoordinates(place: Place) {
  return Number.isFinite(place.latitude) && Number.isFinite(place.longitude);
}

export function createMarkerElement(variant: "place" | "selected") {
  const element = document.createElement("button");
  element.type = "button";
  element.className = `map-marker map-marker--${variant}`;
  element.setAttribute("aria-label", variant === "place" ? "Place marker" : "Selected point");
  return element;
}

export function buildPlacePopupHtml(place: Place, stopNumber?: number) {
  const wrapper = document.createElement("div");
  wrapper.className = "map-popup";

  if (typeof stopNumber === "number") {
    const stop = document.createElement("p");
    stop.className = "map-popup__eyebrow";
    stop.textContent = `Stop ${stopNumber}`;
    wrapper.appendChild(stop);
  }

  const title = document.createElement("p");
  title.className = "map-popup__title";
  title.textContent = place.name;
  wrapper.appendChild(title);

  const address = document.createElement("p");
  address.className = "map-popup__meta";
  address.textContent = place.address || "Keine Adresse";
  wrapper.appendChild(address);

  const coordinates = document.createElement("p");
  coordinates.className = "map-popup__coords";
  coordinates.textContent = `${place.latitude.toFixed(4)}, ${place.longitude.toFixed(4)}`;
  wrapper.appendChild(coordinates);

  if (place.note) {
    const note = document.createElement("p");
    note.className = "map-popup__body";
    note.textContent = place.note;
    wrapper.appendChild(note);
  }

  return wrapper;
}

export function buildSelectedPointPopupHtml(latitude: number, longitude: number) {
  const wrapper = document.createElement("div");
  wrapper.className = "map-popup";

  const title = document.createElement("p");
  title.className = "map-popup__title";
  title.textContent = "Ausgewaehlter Punkt";
  wrapper.appendChild(title);

  const coordinates = document.createElement("p");
  coordinates.className = "map-popup__coords";
  coordinates.textContent = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  wrapper.appendChild(coordinates);

  return wrapper;
}
