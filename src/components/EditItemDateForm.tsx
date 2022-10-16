import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useUpdateItemDateQuantityMutation } from "../features/api/itemApiSlice";
import useErrorHandler from "../hooks/useErrorHandler";

const EditItemDateForm = ({
  itemId,
  dateId,
  handleClose,
}: {
  itemId: string;
  dateId: string;
  handleClose: () => void;
}) => {
  const [quantity, setQuantity] = useState<number | null>(null);

  const [updateItemDate, { isLoading: updateItemDateLoading }] =
    useUpdateItemDateQuantityMutation();

  const { handleError } = useErrorHandler();

  const handleEditItemDateFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!quantity) return;

    try {
      await updateItemDate({ itemId, dateId, quantity });
    } catch (error) {
      handleError(error as any);
    }

    handleClose();
  };

  return (
    <Box>
      <form
        onSubmit={handleEditItemDateFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          margin: "1.5rem",
        }}
      >
        <TextField
          label="New Quantity"
          variant="outlined"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
        />
        <Button variant="contained" type="submit">
          {updateItemDateLoading ? <CircularProgress /> : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default EditItemDateForm;
