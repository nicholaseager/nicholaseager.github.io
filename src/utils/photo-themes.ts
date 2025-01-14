import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";

type PhotoTheme = CollectionEntry<"photoThemes">["data"];

export async function getPhotoThemes() {
  const photoLocations = await getCollection("photoThemes");

  return Promise.all(photoLocations.map((l) => l.data).map(resolveThemeData));
}

async function resolveThemeData(themeData: PhotoTheme) {
  const [photos, previewPhoto] = await Promise.all([
    getEntries(themeData.photos),
    getEntry(themeData.previewPhoto),
  ]);

  return {
    ...themeData,
    photos: photos.map((p) => p.data),
    previewPhoto: previewPhoto.data,
  };
}
