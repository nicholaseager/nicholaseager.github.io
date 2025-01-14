import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

export async function resolveCollection<T extends CollectionKey>(
  collectionName: T,
  options?: {
    filter?: (entry: CollectionEntry<T>) => boolean;
  }
) {
  const collection = await getCollection(collectionName);
  const filteredCollection = options?.filter
    ? collection.filter(options.filter)
    : collection;

  return Promise.all(
    filteredCollection.map((entry) =>
      resolveReferences(entry.data as Record<string, any>)
    )
  );
}

async function resolveReferences<T extends Record<string, any>>(
  data: T
): Promise<T> {
  const resolvedData: any = { ...data };

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value[0]?.collection) {
      // Resolve array of references
      resolvedData[key] = await getEntries(value);
      resolvedData[key] = resolvedData[key].map((entry: any) => entry.data);
    } else if (value?.collection) {
      // Resolve single reference
      resolvedData[key] = await getEntry(value);
      resolvedData[key] = resolvedData[key].data;
    }
  }

  return resolvedData;
}
