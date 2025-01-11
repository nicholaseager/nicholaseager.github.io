import { CDN_BASE_URL } from "../../constants/cdn";

interface VideoProps {
  path: string;
  lowResPath?: string;
  className?: string;
}

const Video = ({ path, lowResPath, className }: VideoProps) => {
  return (
    <video autoPlay loop muted className={`w-full ${className || ""}`}>
      <source
        media="(min-width: 768px)"
        src={CDN_BASE_URL + path}
        type="video/mp4"
      />
      {lowResPath && (
        <source src={CDN_BASE_URL + lowResPath} type="video/mp4" />
      )}
    </video>
  );
};

export default Video;
