/**
 * Extracts location parts from a photo path by removing the prefix and filename
 * @param photoPath - Full path of the photo (e.g. "photos/countries/france/chamonix/mountain.jpg")
 * @returns Array of location parts (e.g. ["france", "chamonix"])
 */
export function getPhotoLocationParts(photoPath: string): string[] {
  return photoPath
    .replace(/^photos\/countries\//, "")
    .split("/")
    .slice(0, -1); // Remove filename
}
