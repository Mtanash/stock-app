import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAddNewItemMutation } from "../features/api/itemApiSlice";
import useErrorHandler from "../hooks/useErrorHandler";
import ItemDateInput from "./ItemDateInput";

const AddItemForm = ({
  stockId,
  handleClose,
}: {
  stockId: string;
  handleClose: () => void;
}) => {
  const [name, setName] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const onMonthChange = (value: number) => setMonth(value);
  const onYearChange = (value: number) => setYear(value);
  const onQuantityChange = (value: number) => setQuantity(value);

  const { handleError } = useErrorHandler();

  const [addItem, { isLoading: addItemLoading }] = useAddNewItemMutation();

  const handleAddItemFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // validate inputs
    e.preventDefault();

    if (!name || !month || !year || !quantity) return;

    const item = {
      name,
      stock: stockId,
      quantity,
      date: {
        month,
        year,
      },
    };

    try {
      // add items
      await addItem(item).unwrap();
    } catch (error) {
      handleError(error as any);
    }
    handleClose();
  };

  return (
    <Box>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          margin: "1.5rem",
        }}
        onSubmit={handleAddItemFormSubmit}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Add new item to stock
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ItemDateInput
          month={month}
          year={year}
          quantity={quantity}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          onQuantityChange={onQuantityChange}
        />

        <Button className="addItemButton" variant="contained" type="submit">
          {addItemLoading ? <CircularProgress /> : "Add item"}
        </Button>
      </form>
    </Box>
  );
};

export default AddItemForm;
