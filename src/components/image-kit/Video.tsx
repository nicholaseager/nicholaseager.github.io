import { CDN_BASE_URL } from "../../constants/cdn";
import { useEffect, useRef, useState } from "react";

interface VideoProps {
  path: string;
  lowResPath?: string;
  className?: string;
}

const Video = ({ path, lowResPath, className }: VideoProps) => {
  const [isMobile, setIsMobile] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if device is mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Force video reload when source changes
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    }
  }, [isMobile]);

  const videoSource = isMobile && lowResPath ? lowResPath : path;

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={`w-full ${className || ""}`}
    >
      <source src={CDN_BASE_URL + videoSource} type="video/mp4" />
    </video>
  );
};

export default Video;
