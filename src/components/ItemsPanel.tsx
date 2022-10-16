import { Button, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useDeleteStockMutation } from "../features/api/stockApiSlice";
import {
  selectCurrentStock,
  unselectStock,
} from "../features/stock/stockSlice";
import { selectCurrentUser } from "../features/user/userSlice";
import useAlertDialog from "../hooks/useAlertDialog";
import useCustomModal from "../hooks/useCustomModal";
import useErrorHandler from "../hooks/useErrorHandler";
import AddItemForm from "./AddItemForm";
import AlertDialog from "./AlertDialog";
import CustomModal from "./CustomModal";
import ItemList from "./ItemList";

const ItemsPanel = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentStock = useAppSelector(selectCurrentStock);

  const { handleError } = useErrorHandler();

  const {
    customModalOpen: addItemModalOpen,
    handleCustomModalClose: handleAddItemModalClose,
    handleCustomModalOpen: handleAddItemModalOpen,
  } = useCustomModal();

  const { alertDialogOpen, handleAlertDialogClose, handleAlertDialogOpen } =
    useAlertDialog();

  const [deleteStock, { isLoading: deleteStockLoading }] =
    useDeleteStockMutation();

  const handleAddNewItemClick = () => {
    handleAddItemModalOpen();
  };

  const handleDeleteItemClick = () => {
    handleAlertDialogOpen();
  };

  const handleDeleteStock = async () => {
    if (!currentStock) return;
    deleteStock(currentStock._id)
      .unwrap()
      .then(() => {
        dispatch(unselectStock());
      })
      .catch((error) => {
        console.log(error);
        handleError(error as any);
      })
      .finally(() => {
        handleAlertDialogClose();
      });
  };

  return (
    <Grid item xs={9}>
      <Paper
        sx={{
          padding: "1rem",
        }}
        elevation={3}
      >
        <Typography variant="h4">
          {currentStock ? currentStock.name : "Please select a stock"}
        </Typography>
        {currentStock && currentUser?.userData && (
          <>
            <Button
              variant="contained"
              sx={{ margin: ".5rem" }}
              onClick={handleAddNewItemClick}
            >
              Add new item
            </Button>

            {/* delete stock button */}
            {currentUser?.userData?.role === "admin" && (
              <Button
                variant="contained"
                color="error"
                sx={{ margin: ".5rem" }}
                onClick={handleDeleteItemClick}
              >
                Delete {currentStock.name}
              </Button>
            )}

            <AlertDialog
              open={alertDialogOpen}
              handleClose={handleAlertDialogClose}
              action={handleDeleteStock}
              title="Delete Alert"
              content={`Are you sure you want to delete (${currentStock.name}) stock?`}
              loading={deleteStockLoading}
            />
          </>
        )}
        <CustomModal
          open={addItemModalOpen}
          handleClose={handleAddItemModalClose}
          Component={
            <AddItemForm
              stockId={currentStock?._id as string}
              handleClose={handleAddItemModalClose}
            />
          }
          title="Add new item"
        />
        <Divider />

        <ItemList />
      </Paper>
    </Grid>
  );
};

export default ItemsPanel;
