import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUpdateItemDateQuantityMutation } from "../features/api/itemApiSlice";

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

  const handleSaveButtonClick = async () => {
    if (!quantity) return;

    await updateItemDate({ itemId, dateId, quantity });

    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <TextField
        label="New Quantity"
        variant="outlined"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      />
      <Button variant="contained" onClick={handleSaveButtonClick}>
        {updateItemDateLoading ? <CircularProgress /> : "Save"}
      </Button>
    </Box>
  );
};

export default EditItemDateForm;
