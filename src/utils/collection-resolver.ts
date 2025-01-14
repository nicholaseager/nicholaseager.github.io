import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

/**
 * Resolves a collection's entries and their references to other collections.
 *
 * @param collectionName - The name of the collection to resolve
 * @param options - Optional configuration object
 * @param options.filter - Optional function to filter collection entries
 * @returns Promise that resolves to an array of collection entries with their references resolved
 *
 * @example
 * ```ts
 * // Get all blog posts with resolved author references
 * const posts = await resolveCollection('blog');
 *
 * // Get only published posts with resolved references
 * const publishedPosts = await resolveCollection('blog', {
 *   filter: (entry) => entry.data.status === 'published'
 * });
 * ```
 */
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

/**
 * Recursively resolves all references in the provided data object.
 * Handles both single references and arrays of references.
 *
 * @param data - Object containing potential references to other collections
 * @returns Promise that resolves to the same object with all references resolved to their actual data
 *
 * @example
 * ```ts
 * // Input data
 * const data = {
 *   author: { collection: 'authors', id: 'john-doe' },
 *   tags: [
 *     { collection: 'tags', id: 'typescript' },
 *     { collection: 'tags', id: 'javascript' }
 *   ]
 * };
 *
 * // After resolution
 * const resolved = await resolveReferences(data);
 * // resolved.author -> { name: 'John Doe', ... }
 * // resolved.tags -> [{ name: 'TypeScript', ... }, { name: 'JavaScript', ... }]
 * ```
 */
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
