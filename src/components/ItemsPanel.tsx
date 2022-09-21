import { Button, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../app/hooks";
import { selectCurrentStock } from "../features/stock/stockSlice";
import CustomModal from "./CustomModal";
import ItemList from "./ItemList";
import AddItemForm from "./AddItemForm";
import useCustomModal from "../hooks/useCustomModal";

const ItemsPanel = () => {
  const currentStock = useAppSelector(selectCurrentStock);

  const {
    customModalOpen: addItemModalOpen,
    handleCustomModalClose: handleAddItemModalClose,
    handleCustomModalOpen: handleAddItemModalOpen,
  } = useCustomModal();

  const handleAddNewItemClick = () => {
    handleAddItemModalOpen();
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
          {currentStock
            ? `Selected stock: ${currentStock.name}`
            : "Please select a stock"}
        </Typography>
        <Button
          variant="contained"
          sx={{ margin: ".5rem 0" }}
          onClick={handleAddNewItemClick}
        >
          Add new item
        </Button>
        <CustomModal
          open={addItemModalOpen}
          handleClose={handleAddItemModalClose}
          Component={
            <AddItemForm
              stockId={currentStock?._id as string}
              handleClose={handleAddItemModalClose}
            />
          }
        />
        <Divider />
        <ItemList />
      </Paper>
    </Grid>
  );
};

export default ItemsPanel;
