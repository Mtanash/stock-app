import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useAddNewDateMutation } from "../features/api/itemApiSlice";
import { errorHandler } from "../helpers/errorHandler";
import { Date, RTKQError } from "../interfaces";
import ItemDateInput from "./ItemDateInput";

const AddItemDateForm = ({
  itemId,
  handleClose,
}: {
  itemId: string;
  handleClose: () => void;
}) => {
  const [quantity, setQuantity] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const onMonthChange = (value: number) => setMonth(value);
  const onYearChange = (value: number) => setYear(value);
  const onQuantityChange = (value: number) => setQuantity(value);

  const [addNewDate, { isLoading: addNewDateLoading }] =
    useAddNewDateMutation();

  const handleAddDateClick = async () => {
    if (!month || !year || !quantity) return;
    const newDate: Date = {
      date: {
        month,
        year,
      },
      quantity,
    };
    try {
      await addNewDate({ date: newDate, itemId }).unwrap();
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
      <ItemDateInput
        month={month}
        year={year}
        quantity={quantity}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
        onQuantityChange={onQuantityChange}
      />
      <Button variant="contained" onClick={handleAddDateClick}>
        {addNewDateLoading ? <CircularProgress /> : "Add date"}
      </Button>
    </Box>
  );
};

export default AddItemDateForm;
