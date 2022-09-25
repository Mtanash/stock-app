import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useEditItemMutation } from "../features/api/itemApiSlice";
import { errorHandler } from "../helpers/errorHandler";
import { RTKQError } from "../interfaces";

const EditItemForm = ({
  itemId,
  handleClose,
}: {
  itemId: string;
  handleClose: () => void;
}) => {
  const [newName, setNewName] = useState<string | null>(null);

  const [editName, { isLoading: editNameLoading }] = useEditItemMutation();

  const handleSaveButtonClick = async () => {
    if (!newName) return;

    try {
      await editName({ newName, itemId }).unwrap();
    } catch (error) {
      errorHandler(error as RTKQError);
    }

    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        margin: "1.5rem",
      }}
    >
      <TextField
        label="Name"
        variant="outlined"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Button variant="contained" onClick={handleSaveButtonClick}>
        {editNameLoading ? <CircularProgress /> : "Save"}
      </Button>
    </Box>
  );
};

export default EditItemForm;
