import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";

type Gallery = CollectionEntry<"galleries">["data"];

export async function getGalleries() {
  const galleries = await getCollection("galleries");

  return Promise.all(galleries.map((g) => g.data).map(resolveGalleryData));
}

async function resolveGalleryData(data: Gallery) {
  const [photos, previewPhoto] = await Promise.all([
    getEntries(data.photos),
    getEntry(data.previewPhoto),
  ]);

  return {
    ...data,
    photos: photos.map((p) => p.data),
    previewPhoto: previewPhoto.data,
  };
}
