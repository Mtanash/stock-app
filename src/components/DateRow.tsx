import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { useDeleteItemDateMutation } from "../features/api/itemApiSlice";
import { selectCurrentUser } from "../features/user/userSlice";
import useAlertDialog from "../hooks/useAlertDialog";
import useCustomModal from "../hooks/useCustomModal";
import useErrorHandler from "../hooks/useErrorHandler";
import { Date } from "../interfaces";
import AlertDialog from "./AlertDialog";
import CustomModal from "./CustomModal";
import EditItemDateForm from "./EditItemDateForm";

const DateRow = ({ date, itemId }: { date: Date; itemId: string }) => {
  const {
    date: { month, year },
    quantity,
    _id: dateId,
  } = date;

  const currentUser = useAppSelector(selectCurrentUser);

  const { alertDialogOpen, handleAlertDialogClose, handleAlertDialogOpen } =
    useAlertDialog();

  const { customModalOpen, handleCustomModalClose, handleCustomModalOpen } =
    useCustomModal();

  const [deleteItemDate, { isLoading: deleteItemDateLoading }] =
    useDeleteItemDateMutation();

  const { handleError } = useErrorHandler();

  const handleDeleteDateClick = async () => {
    if (!dateId) return;

    try {
      await deleteItemDate({ itemId, dateId }).unwrap();
    } catch (error) {
      handleError(error as any);
    }

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
        {currentUser?.userData && (
          <>
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
          </>
        )}

        <AlertDialog
          open={alertDialogOpen}
          handleClose={handleAlertDialogClose}
          action={handleDeleteDateClick}
          title="Delete Alert"
          content={`Are you sure you want to delete (${month}/${year}) date?`}
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
          title="Edit item date quantity"
        />
      </div>
    </Box>
  );
};

export default DateRow;
