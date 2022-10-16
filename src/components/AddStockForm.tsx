import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useAddNewStockMutation } from "../features/api/stockApiSlice";
import useErrorHandler from "../hooks/useErrorHandler";

const AddStockForm = ({ handleClose }: { handleClose: () => void }) => {
  const [name, setName] = useState("");
  const [addStock, { isLoading: addStockLoading }] = useAddNewStockMutation();

  const { handleError } = useErrorHandler();

  const handleAddStockFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await addStock({ name }).unwrap();
    } catch (error) {
      handleError(error as any);
    } finally {
      handleClose();
    }
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
      <form onSubmit={handleAddStockFormSubmit}>
        <TextField
          variant="outlined"
          label="Stock name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" disabled={addStockLoading} type="submit">
          {addStockLoading ? <CircularProgress /> : "Add Stock"}
        </Button>
      </form>
    </Box>
  );
};

export default AddStockForm;
