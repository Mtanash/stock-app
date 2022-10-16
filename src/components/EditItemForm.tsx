import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useEditItemMutation } from "../features/api/itemApiSlice";
import useErrorHandler from "../hooks/useErrorHandler";

const EditItemForm = ({
  itemId,
  handleClose,
}: {
  itemId: string;
  handleClose: () => void;
}) => {
  const [newName, setNewName] = useState<string | null>(null);

  const [editName, { isLoading: editNameLoading }] = useEditItemMutation();

  const { handleError } = useErrorHandler();

  const handleEditItemFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!newName) return;

    try {
      await editName({ newName, itemId }).unwrap();
    } catch (error) {
      handleError(error as any);
    }

    handleClose();
  };

  return (
    <Box>
      <form
        onSubmit={handleEditItemFormSubmit}
        style={{
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
        <Button variant="contained" type="submit">
          {editNameLoading ? <CircularProgress /> : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default EditItemForm;
