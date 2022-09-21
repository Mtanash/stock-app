import { useCallback, useState } from "react";

const useAlertDialog = () => {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const handleAlertDialogOpen = useCallback(() => {
    setAlertDialogOpen(true);
  }, []);

  const handleAlertDialogClose = useCallback(() => {
    setAlertDialogOpen(false);
  }, []);

  return { alertDialogOpen, handleAlertDialogOpen, handleAlertDialogClose };
};

export default useAlertDialog;
