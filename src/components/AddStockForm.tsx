import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useAddNewStockMutation } from "../features/api/stockApiSlice";

const AddStockForm = ({ handleClose }: { handleClose: () => void }) => {
  const [name, setName] = useState("");
  const [addStock, { isLoading: addStockLoading }] = useAddNewStockMutation();

  const handleAddStock = async () => {
    try {
      await addStock({ name }).unwrap();

      handleClose();
    } catch (error) {
      console.log(error);
    }
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
        variant="outlined"
        label="Stock name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant="contained"
        disabled={addStockLoading}
        onClick={handleAddStock}
      >
        {addStockLoading ? <CircularProgress /> : "Add Stock"}
      </Button>
    </Box>
  );
};

export default AddStockForm;
