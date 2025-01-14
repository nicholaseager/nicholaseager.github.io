import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";

type PhotoLocation = CollectionEntry<"photoLocations">["data"];

export async function getPhotoLocations() {
  const photoLocations = await getCollection("photoLocations");

  return Promise.all(
    photoLocations.map((l) => l.data).map(resolveLocationData)
  );
}

async function resolveLocationData(locationData: PhotoLocation) {
  const [photos, previewPhoto] = await Promise.all([
    getEntries(locationData.photos),
    getEntry(locationData.previewPhoto),
  ]);

  return {
    ...locationData,
    photos: photos.map((p) => p.data),
    previewPhoto: previewPhoto.data,
  };
}
