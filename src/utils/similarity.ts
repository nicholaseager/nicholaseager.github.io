import type { CollectionEntry } from "astro:content";

export function getSimilarPhotos(
  photos: CollectionEntry<"photos">[],
  currentPhoto: CollectionEntry<"photos">,
  limit: number = 10
) {
  return photos
    .map((photo) => {
      // Skip the current photo
      if (photo.data.slug === currentPhoto.data.slug) {
        return { ...photo.data, similarity: -1 };
      }

      // Calculate similarity (number of matching tags)
      const similarity = photo.data.tags.filter((tag: string) =>
        currentPhoto.data.tags.includes(tag)
      ).length;

      return {
        ...photo.data,
        similarity,
      };
    })
    .filter((photo) => photo.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
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
