import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Item as IItem } from "../types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "./CustomModal";
import { useDeleteItemMutation } from "../features/api/itemApiSlice";
import AddItemDateForm from "./AddItemDateForm";
import EditItemForm from "./EditItemForm";
import DateRow from "./DateRow";
import useCustomModal from "../hooks/useCustomModal";
import useAlertDialog from "../hooks/useAlertDialog";
import AlertDialog from "./AlertDialog";

const Item = ({ item }: { item: IItem }) => {
  const { _id: itemId, name, dates } = item;

  const {
    customModalOpen: addItemDateModalOpen,
    handleCustomModalClose: handleAddItemDateModalClose,
    handleCustomModalOpen: handleAddItemDateModalOpen,
  } = useCustomModal();

  const {
    customModalOpen: editItemModalOpen,
    handleCustomModalClose: handleEditItemModalClose,
    handleCustomModalOpen: handleEditItemModalOpen,
  } = useCustomModal();

  const { alertDialogOpen, handleAlertDialogClose, handleAlertDialogOpen } =
    useAlertDialog();

  const [deleteItem, { isLoading: deleteItemLoading }] =
    useDeleteItemMutation();

  const handleAddNewDateClick = () => {
    handleAddItemDateModalOpen();
  };

  const handleDeleteItemClick = async () => {
    if (!itemId) return;
    await deleteItem(itemId).unwrap();
  };

  const handleEditItemClick = () => {
    handleEditItemModalOpen();
  };

  return (
    <div>
      <Accordion sx={{ margin: ".5rem 0" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", gap: ".25rem" }}>
            <Button
              variant="contained"
              sx={{ margin: "0.5rem 0" }}
              onClick={handleAddNewDateClick}
              endIcon={<AddIcon />}
            >
              Add new date
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ margin: "0.5rem 0" }}
              endIcon={<DeleteIcon />}
              onClick={handleAlertDialogOpen}
            >
              Delete {name}
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "0.5rem 0" }}
              endIcon={<EditIcon />}
              onClick={handleEditItemClick}
            >
              Edit {name}
            </Button>
          </Box>
          <CustomModal
            open={addItemDateModalOpen}
            handleClose={handleAddItemDateModalClose}
            Component={
              <AddItemDateForm
                itemId={itemId as string}
                handleClose={handleAddItemDateModalClose}
              />
            }
          />
          <CustomModal
            open={editItemModalOpen}
            handleClose={handleEditItemModalClose}
            Component={
              <EditItemForm
                itemId={itemId as string}
                handleClose={handleEditItemModalClose}
              />
            }
          />
          <AlertDialog
            open={alertDialogOpen}
            handleClose={handleAlertDialogClose}
            handleOpen={handleAlertDialogOpen}
            action={handleDeleteItemClick}
            loading={deleteItemLoading}
            title="Delete Alert"
            content="Are you sure you want to delete this item?"
          />
          {dates.map((date) => (
            <DateRow key={date._id} date={date} itemId={itemId as string} />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Item;
