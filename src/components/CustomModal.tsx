import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { style } from "./CustomModal.style";

type CustomModalProps = {
  open: boolean;
  handleClose: () => void;
  Component: ReactNode;
  title: string;
};

const CustomModal = ({
  open,
  handleClose,
  Component,
  title,
}: CustomModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography className="title" variant="h5">
            {title}
          </Typography>
          <Divider />
          {Component}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
