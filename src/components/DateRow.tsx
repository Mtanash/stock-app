import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Date } from "../types";
import { useDeleteItemDateMutation } from "../features/api/itemApiSlice";
import AlertDialog from "./AlertDialog";
import useAlertDialog from "../hooks/useAlertDialog";
import CustomModal from "./CustomModal";
import useCustomModal from "../hooks/useCustomModal";
import EditItemDateForm from "./EditItemDateForm";

const DateRow = ({ date, itemId }: { date: Date; itemId: string }) => {
  const {
    date: { month, year },
    quantity,
    _id: dateId,
  } = date;

  const { alertDialogOpen, handleAlertDialogClose, handleAlertDialogOpen } =
    useAlertDialog();

  const { customModalOpen, handleCustomModalClose, handleCustomModalOpen } =
    useCustomModal();

  const [deleteItemDate, { isLoading: deleteItemDateLoading }] =
    useDeleteItemDateMutation();

  const handleDeleteDateClick = async () => {
    if (!dateId) return;

    await deleteItemDate({ itemId, dateId }).unwrap();

    handleAlertDialogClose();
  };

  return (
    <Box
      sx={{
        margin: "0.4rem 0",
        padding: ".25rem 1rem",
        backgroundColor: "#eee",
        borderRadius: "0.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "& > div": {
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        },
      }}
    >
      <div>
        <Typography variant="body1">{`${month}/${year}`}</Typography>
        <KeyboardDoubleArrowRightIcon />
        <Typography variant="body1">{quantity}</Typography>
      </div>
      <div>
        <Tooltip title="Edit quantity">
          <IconButton onClick={handleCustomModalOpen}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete date">
          <IconButton onClick={handleAlertDialogOpen}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Tooltip>
        <AlertDialog
          open={alertDialogOpen}
          handleClose={handleAlertDialogClose}
          handleOpen={handleAlertDialogOpen}
          action={handleDeleteDateClick}
          title="Delete Alert"
          content="Are you sure you want to delete this date?"
          loading={deleteItemDateLoading}
        />
        <CustomModal
          open={customModalOpen}
          handleClose={handleCustomModalClose}
          Component={
            <EditItemDateForm
              itemId={itemId}
              dateId={dateId as string}
              handleClose={handleCustomModalClose}
            />
          }
        />
      </div>
    </Box>
  );
};

export default DateRow;
