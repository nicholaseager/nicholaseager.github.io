import type { Person } from "schema-dts";

interface AuthorProps {
  url: string | URL;
}

export function authorFrom({ url }: AuthorProps): Person {
  return {
    "@id": new URL("#author", url).toString(),
    "@type": "Person",
    name: "Nicholas Eager",
    url: "https://www.nicholaseager.com/about",
    image: {
      "@id": new URL("#authorImage", url).toString(),
      "@type": "ImageObject",
      url: new URL(
        "profile-square_7r8XDOfQj" + ".jpg",
        "https://ik.imagekit.io/qn1gkawvy/tr:w-640/"
      ).toString(),
    },
  };
}
