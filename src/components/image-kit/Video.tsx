interface VideoProps {
  path: string;
  className?: string;
}

const CDN_BASE_URL = import.meta.env.CDN_BASE_URL;

const Video = ({ path, className }: VideoProps) => {
  const parts = path.split("/");
  const alt = parts[parts.length - 1].replace(/-/g, " ");

  return (
    <video autoPlay loop muted className={`w-full ${className || ""}`}>
      <source src={CDN_BASE_URL + path} type="video/mp4" />
    </video>
  );
};

export default Video;
