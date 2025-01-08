import type { Organization } from "schema-dts";

export interface OrganizationSchemaProps {
  url: string | URL;
}

export function organizationFrom({
  url,
}: OrganizationSchemaProps): Organization {
  return {
    "@id": new URL("#organization", url).toString(),
    "@type": "Organization",
    name: "Nicholas Eager Photography, LLC",
    logo: {
      "@id": new URL("#organizationImage", url).toString(),
      "@type": "ImageObject",
      url: new URL(
        "profile-square_7r8XDOfQj" + ".jpg",
        "https://ik.imagekit.io/qn1gkawvy/tr:w-640/"
      ).toString(),
    },
  };
}
