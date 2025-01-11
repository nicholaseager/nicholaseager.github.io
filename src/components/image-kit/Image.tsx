import { CDN_BASE_URL } from "../../constants/cdn";

interface ImageProps {
  path: string;
  className?: string;
  sizes?: string;
}

const Image = ({
  path,
  className,
  sizes = "(max-width: 640px) 100vw, 640px",
}: ImageProps) => {
  const parts = path.split("/");
  const alt = parts[parts.length - 1].replace(/-/g, " ");

  return (
    <img
      className={`${className} select-none`}
      srcSet={`
          ${CDN_BASE_URL}/tr:w-96/${path}.jpg 96w,
          ${CDN_BASE_URL}/tr:w-160/${path}.jpg 160w,
          ${CDN_BASE_URL}/tr:w-320/${path}.jpg 320w,
          ${CDN_BASE_URL}/tr:w-480/${path}.jpg 480w,
          ${CDN_BASE_URL}/tr:w-640/${path}.jpg 640w,
          ${CDN_BASE_URL}/tr:w-960/${path}.jpg 960w,
          ${CDN_BASE_URL}/tr:w-1280/${path}.jpg 1280w
        `}
      sizes={sizes}
      src={`${CDN_BASE_URL}/tr:w-640/${path}.jpg`}
      alt={alt}
      loading="lazy"
      decoding="async"
      data-photographer="Nicholas Eager"
      data-copyright={`© ${new Date().getFullYear()} Nicholas Eager`}
    />
  );
};

export default Image;
