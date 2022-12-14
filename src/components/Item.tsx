import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../app/hooks";
import { useDeleteItemMutation } from "../features/api/itemApiSlice";
import { selectCurrentStock } from "../features/stock/stockSlice";
import { selectCurrentUser } from "../features/user/userSlice";
import useAlertDialog from "../hooks/useAlertDialog";
import useCustomModal from "../hooks/useCustomModal";
import useErrorHandler from "../hooks/useErrorHandler";
import { Item as IItem } from "../interfaces";
import AddItemDateForm from "./AddItemDateForm";
import AlertDialog from "./AlertDialog";
import CustomModal from "./CustomModal";
import DateRow from "./DateRow";
import EditItemForm from "./EditItemForm";

const Item = ({ item }: { item: IItem }) => {
  const { _id: itemId, name, dates } = item;

  const currentUser = useAppSelector(selectCurrentUser);
  const currentStock = useAppSelector(selectCurrentStock);

  const { handleError } = useErrorHandler();

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
    if (!itemId || !currentStock) return;
    try {
      await deleteItem({ stockId: currentStock?._id, itemId }).unwrap();
    } catch (error) {
      handleError(error as any);
    } finally {
      handleAlertDialogClose();
    }
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
          <Box>
            <Typography variant="h5">{name}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", gap: ".25rem" }}>
            {currentUser?.userData && (
              <>
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
              </>
            )}
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
            title="Add new date"
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
            title="Edit item name"
          />
          <AlertDialog
            open={alertDialogOpen}
            handleClose={handleAlertDialogClose}
            action={handleDeleteItemClick}
            loading={deleteItemLoading}
            title="Delete Alert"
            content={`Are you sure you want to delete (${name}) item?`}
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
