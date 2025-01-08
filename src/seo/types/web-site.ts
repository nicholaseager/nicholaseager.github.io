import type { WebSite } from "schema-dts";
import { organizationFrom } from "./organization";

export interface WebSiteSchemaProps {
  siteName: string;
  siteDescription: string;
  url: URL;
}

export function websiteFrom({
  siteName,
  siteDescription,
  url,
}: WebSiteSchemaProps): WebSite {
  return {
    "@id": new URL("#website", url).toString(),
    "@type": "WebSite",
    name: siteName,
    description: siteDescription,
    url: url.toString(),
    publisher: organizationFrom({ url }),
  };
}
