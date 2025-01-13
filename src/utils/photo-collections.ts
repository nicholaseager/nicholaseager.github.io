import { type CollectionEntry, getCollection } from "astro:content";
import { kebabToTitleCase } from "./kebab";

export type PhotoCollection = {
  id: string;
  title: string;
  description: string;
  photos: string[];
  previewImage: string;
};

export function mergePhotoLocationMetadata(
  id: string,
  photos: CollectionEntry<"photos">[],
  metadata: CollectionEntry<"photoLocations">[]
): PhotoCollection {
  const location = metadata.find((pl) => pl.data.id === id)?.data;
  const title =
    location?.title ?? kebabToTitleCase(id.split("/").reverse().join(" "));
  const description = location?.description ?? `Photos from ${title}`;

  const photoPaths = photos
    .filter((photo) =>
      photo.data.slug.replace(/^photos\/countries\//, "").startsWith(id)
    )
    .map((photo) => photo.data.slug);

  return {
    id,
    title,
    description,
    photos: photoPaths,
    previewImage: photoPaths[0],
  };
}

export function mergePhotoTagsMetadata(
  id: string,
  photos: CollectionEntry<"photos">[],
  metadata: CollectionEntry<"photoThemes">[]
): PhotoCollection {
  const location = metadata.find((pl) => pl.data.id === id)?.data;
  const title =
    location?.title ?? kebabToTitleCase(id.split("/").reverse().join(" "));
  const description = location?.description ?? `Photos from ${title}`;

  const photoPaths = photos
    .filter((photo) => photo.data.tags.includes(id))
    .map((photo) => photo.data.slug);
  return {
    id,
    title,
    description,
    photos: photoPaths,
    previewImage: photoPaths[0],
  };
}
