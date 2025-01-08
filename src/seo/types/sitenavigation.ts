import type { SiteNavigationElement } from "schema-dts";

export interface SiteNavigationSchemaProps {
  siteURL: URL;
  routes: {
    name: string;
    route: string;
  }[];
}

export function siteNavigationFrom({
  siteURL,
  routes,
}: SiteNavigationSchemaProps): SiteNavigationElement {
  const basePath = siteURL.origin;

  return {
    "@type": "SiteNavigationElement",
    name: routes.map((i) => i.name),
    url: routes.map((i) => new URL(i.route, basePath).toString()),
  };
}
