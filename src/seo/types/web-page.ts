import type {
  WebPage,
  WebPageElement,
  ImageObject,
  BreadcrumbList,
  ListItem,
} from "schema-dts";
import { imageFromPath } from "./image";
import { kebabToTitleCase } from "../../utils/kebab";

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
          name: kebabToTitleCase(part),
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
    "@id": new URL("#webpage", url).toString(),
    "@type": "WebPage",
    name: title,
    description: description,
    url: url.toString(),
    isPartOf: {
      "@type": "WebSite",
      "@id": new URL("#website", url).toString(),
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
        "@id": new URL("#webpage", url).toString(),
      },
    } as WebPageElement,
    primaryImageOfPage: imageFromPath(url, image, `${url}#primaryImage`),
  };
}
