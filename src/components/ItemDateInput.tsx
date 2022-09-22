import { Box, Divider, TextField } from "@mui/material";
import React from "react";

type ItemDateInputProps = {
  month: number | null;
  year: number | null;
  quantity: number | null;
  onMonthChange: (value: number) => void;
  onYearChange: (value: number) => void;
  onQuantityChange: (value: number) => void;
};

const ItemDateInput = ({
  month,
  year,
  quantity,
  onMonthChange,
  onYearChange,
  onQuantityChange,
}: ItemDateInputProps) => {
  return (
    <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
      <Box sx={{ display: "flex", gap: ".25rem", alignItems: "center" }}>
        <TextField
          className="monthInput"
          label="Month"
          variant="outlined"
          type="number"
          value={month}
          onChange={(e) => onMonthChange(+e.target.value)}
          inputProps={{ min: 1, max: 12 }}
          required
        />
        <TextField
          className="yearInput"
          label="Year"
          variant="outlined"
          type="number"
          value={year}
          onChange={(e) => onYearChange(+e.target.value)}
          inputProps={{ min: 1900, max: 4000 }}
          required
        />
      </Box>
      <Divider orientation="vertical" />
      <TextField
        className="quantityInput"
        label="Quantity"
        variant="outlined"
        type="number"
        value={quantity}
        onChange={(e) => onQuantityChange(+e.target.value)}
        inputProps={{ min: 1 }}
        required
      />
    </Box>
  );
};

export default ItemDateInput;
