export type ReverseGeocodingSuggestion = {
  name: string;
  address: string;
  countryName: string;
  countryCode: string;
};

type NominatimResponse = {
  name?: string;
  display_name?: string;
  address?: {
    attraction?: string;
    building?: string;
    city?: string;
    country?: string;
    country_code?: string;
    hamlet?: string;
    neighbourhood?: string;
    road?: string;
    suburb?: string;
    town?: string;
    village?: string;
  };
};

function getSuggestedName(payload: NominatimResponse) {
  return (
    payload.name ||
    payload.address?.attraction ||
    payload.address?.building ||
    payload.address?.road ||
    payload.address?.neighbourhood ||
    payload.address?.suburb ||
    payload.address?.village ||
    payload.address?.town ||
    payload.address?.city ||
    payload.display_name?.split(",")[0] ||
    ""
  );
}

export function mapReverseGeocodingResult(
  payload: NominatimResponse,
): ReverseGeocodingSuggestion | null {
  const suggestion: ReverseGeocodingSuggestion = {
    name: getSuggestedName(payload),
    address: payload.display_name || "",
    countryName: payload.address?.country || "",
    countryCode: payload.address?.country_code?.toUpperCase() || "",
  };

  if (
    !suggestion.name &&
    !suggestion.address &&
    !suggestion.countryName &&
    !suggestion.countryCode
  ) {
    return null;
  }

  return suggestion;
}

export async function getReverseGeocodingSuggestion(latitude: number, longitude: number) {
  const response = await fetch(
    `/api/reverse-geocode?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`,
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as ReverseGeocodingSuggestion | null;
  return data;
}
