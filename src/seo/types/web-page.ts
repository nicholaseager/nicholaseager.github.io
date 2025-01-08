import type {
  WebPage,
  WebPageElement,
  ImageObject,
  BreadcrumbList,
  ListItem,
} from "schema-dts";
import { imageFromPath } from "./image";

export interface WebPageSchemaProps {
  title: string;
  description: string;
  image: string;
  url: URL;
  siteName: string;
}

function generateBreadcrumbs(basePath: string, path: string): ListItem[] {
  const parts = path.split("/").filter(Boolean);
  return [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: basePath,
    } as ListItem,
    ...parts.map(
      (part, index) =>
        ({
          "@type": "ListItem",
          position: index + 2,
          name: part
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          item: new URL(
            parts.slice(0, index + 1).join("/"),
            basePath
          ).toString(),
        } as ListItem)
    ),
  ];
}

export function webPageFrom({
  title,
  description,
  image,
  url,
  siteName,
}: WebPageSchemaProps): WebPage {
  const basePath = url.origin;
  const relativePath = url.pathname;

  return {
    "@id": `${url}#webpage`,
    "@type": "WebPage",
    name: title,
    description: description,
    url: url.toString(),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${basePath}/#website`,
      name: siteName,
      url: basePath,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: generateBreadcrumbs(basePath, relativePath),
    } as BreadcrumbList,
    mainContentOfPage: {
      "@type": "WebPageElement",
      isPartOf: {
        "@id": `${url}#webpage`,
      },
    } as WebPageElement,
    primaryImageOfPage: imageFromPath(url, image),
  };
}
