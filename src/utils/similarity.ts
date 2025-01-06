import type { CollectionEntry } from "astro:content";

export function getSimilarPhotos(
  photos: CollectionEntry<"photos">[],
  tags: string[],
  limit: number = 10
) {
  return (
    photos
      // Calculate similarity score based on number of matching tags
      .map((photo) => ({
        ...photo.data,
        similarity: photo.data.tags.filter((tag: string) => tags.includes(tag))
          .length,
      }))
      // Filter out photos with no matching tags
      .filter((photo) => photo.similarity > 0)
      // Sort by similarity score (highest first)
      .sort((a, b) => b.similarity - a.similarity)
      // Remove first photo since it will be the current photo
      .slice(1)
      // Limit
      .slice(0, limit)
  );
}

export function getSimilarGuides(
  guides: CollectionEntry<"guides">[],
  tags: string[],
  limit: number = 10
) {
  return (
    guides
      .map((guide) => ({
        ...guide.data,
        id: guide.id,
        similarity: guide.data.tags.filter((tag: string) => tags.includes(tag))
          .length,
      }))
      // Filter out guides with no matching tags
      .filter((guide) => guide.similarity > 0)
      // Sort by similarity score (highest first), then by date if scores are equal
      .sort(
        (a, b) =>
          b.similarity - a.similarity || b.date.valueOf() - a.date.valueOf()
      )
      // Remove first guide since it will be the current guide
      .slice(1)
      // Limit
      .slice(0, limit)
  );
}
