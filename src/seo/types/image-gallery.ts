import type { ImageGallery, ImageObject } from "schema-dts";
import { authorFrom } from "./author";
import { imageFromPath } from "./image";

export interface ImageGallerySchemaProps {
  name: string;
  description: string;
  images: string[];
  url: string | URL;
}

export function imageGalleryFrom({
  name,
  description,
  images,
  url,
}: ImageGallerySchemaProps): ImageGallery {
  return {
    "@type": "ImageGallery",
    name,
    description,
    about: {
      "@type": "CreativeWork",
      name: name,
      description: description,
    },
    creator: authorFrom({ url: url }),
    image: images.map((image): ImageObject => imageFromPath(url, image)),
    url: url.toString(),
  };
}
