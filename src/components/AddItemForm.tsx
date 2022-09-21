import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAddNewItemMutation } from "../features/api/itemApiSlice";
import ItemDateInput from "./ItemDateInput";
import CircularProgress from "@mui/material/CircularProgress";

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

  const [addItem, { isLoading: addItemLoading }] = useAddNewItemMutation();

  const handleAddItem = async () => {
    // validate inputs

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

    // add items
    await addItem(item).unwrap();

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

      <Button
        className="addItemButton"
        variant="contained"
        onClick={handleAddItem}
      >
        {addItemLoading ? <CircularProgress /> : "Add item"}
        Add item
      </Button>
    </Box>
  );
};

export default AddItemForm;
