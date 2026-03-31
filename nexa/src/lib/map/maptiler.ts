export function getMapTilerStyleUrl() {
  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  if (!key) {
    return null;
  }

  return `https://api.maptiler.com/maps/streets-v2/style.json?key=${encodeURIComponent(key)}`;
}
