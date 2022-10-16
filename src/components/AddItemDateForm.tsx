import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useAddNewDateMutation } from "../features/api/itemApiSlice";
import useErrorHandler from "../hooks/useErrorHandler";
import { Date } from "../interfaces";
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

  const { handleError } = useErrorHandler();

  const [addNewDate, { isLoading: addNewDateLoading }] =
    useAddNewDateMutation();

  const handleAddDateFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

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
        onSubmit={handleAddDateFormSubmit}
      >
        <ItemDateInput
          month={month}
          year={year}
          quantity={quantity}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          onQuantityChange={onQuantityChange}
        />
        <Button variant="contained" type="submit">
          {addNewDateLoading ? <CircularProgress /> : "Add date"}
        </Button>
      </form>
    </Box>
  );
};

export default AddItemDateForm;
