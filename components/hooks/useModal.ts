import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, setIsModalOpen, handleOk, handleCancel };
};

export default useModal;
