import type { ContactPage } from "schema-dts";
import { organizationFrom } from "./organization";

interface ContactPageSchemaProps {
  name: string;
  description: string;
  url: URL;
}

export function contactPageFrom({
  name,
  description,
  url,
}: ContactPageSchemaProps): ContactPage {
  return {
    "@type": "ContactPage",
    name,
    description,
    url: url.toString(),
    publisher: organizationFrom({ url: url }),
    isPartOf: {
      "@type": "WebPage",
      "@id": new URL("#webpage", url).toString(),
    },
    potentialAction: {
      "@type": "InteractAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: url.toString(),
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };
}
