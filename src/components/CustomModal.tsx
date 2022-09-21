import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { style } from "./CustomModal.style";
import { ReactNode } from "react";

const CustomModal = ({
  open,
  handleClose,
  Component,
}: {
  open: boolean;
  handleClose: () => void;
  Component: ReactNode;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{Component}</Box>
    </Modal>
  );
};

export default CustomModal;
