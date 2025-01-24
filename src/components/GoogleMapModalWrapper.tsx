// ExamplePage.tsx
import React, { useState, type ReactNode } from "react";
import { ButtonOverlay } from "./ButtonOverlay";
import { Modal } from "./Modal";
import Button from "./ui/Button";
import Image from "./image-kit/Image";
import { KoFiButton } from "./KoFiButton";

interface GoogleMapModalWrapperProps {
  children: ReactNode;
}

export const GoogleMapModalWrapper: React.FC<GoogleMapModalWrapperProps> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButtonOverlay, setShowButtonOverlay] = useState(true);

  const handleDonate = () => {
    setIsModalOpen(false);
    setShowButtonOverlay(false);
    window.open("https://ko-fi.com/nicholaseager", "_blank");
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowButtonOverlay(false);
  };

  const supportModal = (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Image
          className="w-32 rounded-full aspect-square shadow-lg"
          path="profile-square_7r8XDOfQj"
          sizes="128px"
        />
      </div>
      <h2 className="text-xl font-[700]">Support Creator</h2>
      <p>
        Creating content requires time and resources. If you find this helpful,
        please consider making a donation.
      </p>
      <div className="flex gap-4">
        <KoFiButton onClick={handleDonate} />
        <Button variant="secondary" onClick={handleClose}>
          No, thanks
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="w-full h-full">{children}</div>

      {showButtonOverlay && (
        <>
          <div className="absolute inset-0">
            <ButtonOverlay
              onButtonClick={() => setIsModalOpen(true)}
              buttonText="Click to use the map"
            />
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {supportModal}
          </Modal>
        </>
      )}
    </div>
  );
};

export default GoogleMapModalWrapper;
