interface ProfilePictureProps {
  profilePictureUrl?: string;
  fullName: string;
  className?: string;
}

export const ProfilePicture = ({
  profilePictureUrl,
  fullName,
  className = "w-12 h-12",
}: ProfilePictureProps) => {
  if (profilePictureUrl) {
    return (
      <img
        src={profilePictureUrl}
        className={`${className} rounded-full object-cover`}
        alt={`Profile Picture for ${fullName}`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-full bg-blue-500 flex items-center justify-center text-white font-medium`}
    >
      {fullName[0]}
    </div>
  );
};
