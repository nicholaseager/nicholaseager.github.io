import type { ImageObject } from "schema-dts";
import { authorFrom } from "./author";
import { organizationFrom } from "./organization";
import { kebabToTitleCase } from "../../utils/kebab";

interface ImageProps {
  url?: string | URL;
  name?: string;
  description?: string;
  contentUrl?: string;
  thumbnailUrl?: string;
  width: string;
}

export function imageFromPath(
  currentUrl: string | URL,
  relativePath: string,
  id?: string
): ImageObject {
  const name = kebabToTitleCase(relativePath.split("/").pop()!);

  return {
    ...(id && { "@id": id }),
    "@type": "ImageObject",
    name: name,
    caption: name,
    url: new URL(
      relativePath + ".jpg",
      "https://ik.imagekit.io/qn1gkawvy/tr:w-1280/"
    ).toString(),
    contentUrl: new URL(
      relativePath + ".jpg",
      "https://ik.imagekit.io/qn1gkawvy/"
    ).toString(),
    thumbnailUrl: new URL(
      relativePath + ".jpg",
      "https://ik.imagekit.io/qn1gkawvy/tr:w-640/"
    ).toString(),
    author: authorFrom({ url: currentUrl }),
    creator: authorFrom({ url: currentUrl }),
    copyrightHolder: organizationFrom({ url: currentUrl }),
    copyrightNotice: `© ${new Date().getFullYear()} Nicholas Eager Photography. All rights reserved.`,
    copyrightYear: new Date().getFullYear(),
    license: "https://www.nicholaseager.com/terms-and-conditions",
    acquireLicensePage: "https://www.nicholaseager.com/how-to-use-my-art",
    creditText: `© ${new Date().getFullYear()} Nicholas Eager Photography`,
  };
}
