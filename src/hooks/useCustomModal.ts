import { useCallback, useState } from "react";

const useCustomModal = () => {
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const handleCustomModalOpen = useCallback(() => setCustomModalOpen(true), []);
  const handleCustomModalClose = useCallback(
    () => setCustomModalOpen(false),
    []
  );

  return { customModalOpen, handleCustomModalOpen, handleCustomModalClose };
};

export default useCustomModal;
