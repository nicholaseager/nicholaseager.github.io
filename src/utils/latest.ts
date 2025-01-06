import type { CollectionEntry } from "astro:content";

export function getLatestFilm(films: CollectionEntry<"films">[]) {
  // Return the last film in the array, which is the latest one
  return films[films.length - 1];
}

export function getLatestGuides(
  guides: CollectionEntry<"guides">[],
  limit: number = 10
) {
  return (
    guides
      // Sort by date descending (most recent first)
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((guide) => ({
        ...guide.data,
        id: guide.id,
      }))
      // Get first n guides
      .slice(0, limit)
  );
}
