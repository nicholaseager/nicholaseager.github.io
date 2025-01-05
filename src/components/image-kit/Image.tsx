interface ImageProps {
  path: string;
  className?: string;
}

const CDN_BASE_URL = import.meta.env.PUBLIC_CDN_BASE_URL;

const Image = ({ path, className }: ImageProps) => {
  const parts = path.split("/");
  const alt = parts[parts.length - 1].replace(/-/g, " ");

  return (
    <img
      className={className}
      srcSet={`
          ${CDN_BASE_URL}/tr:w-320/${path}.jpg 320w,
          ${CDN_BASE_URL}/tr:w-480/${path}.jpg 480w,
          ${CDN_BASE_URL}/tr:w-640/${path}.jpg 640w,
          ${CDN_BASE_URL}/tr:w-960/${path}.jpg 960w,
          ${CDN_BASE_URL}/tr:w-1280/${path}.jpg 1280w
        `}
      sizes="100vw"
      src={`${CDN_BASE_URL}/tr:w-640/${path}.jpg`}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};

export default Image;
