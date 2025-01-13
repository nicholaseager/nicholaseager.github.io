import { type CollectionEntry, getCollection } from "astro:content";
import { kebabToTitleCase } from "./kebab";

export type PhotoLocation = {
  id: string;
  title: string;
  description: string;
  photos: string[];
  previewImage: string;
};

export type PhotoTag = {
  id: string;
  title: string;
  description: string;
  photos: string[];
  previewImage: string;
  sortOrder?: number;
};

export function mergePhotoLocationMetadata(
  id: string,
  photos: CollectionEntry<"photos">[],
  metadata: CollectionEntry<"photoLocations">[]
): PhotoLocation {
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
): PhotoTag {
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
    sortOrder: location?.sortOrder ?? 99,
  };
}
