import type { ItemList } from "schema-dts";
import { authorFrom } from "./author";

interface ItemListProduct {
  name: string;
  description: string;
  image: URL;
  url: URL;
  review?: {
    rating: number;
    body: string;
  };
}

export interface ItemListSchemaProps {
  name: string;
  description: string;
  items: ItemListProduct[];
  url: URL;
}

export function itemListFrom({
  name,
  description,
  items,
  url,
}: ItemListSchemaProps): ItemList {
  return {
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "Product",
      name: item.name,
      description: item.description,
      image: item.image.toString(),
      url: item.url.toString(),
      ...(item.review && {
        review: {
          "@type": "Review",
          ratingValue: item.review?.rating,
          reviewBody: item.review?.body,
          author: authorFrom({ url: url }),
        },
      }),
    })),
  };
}
