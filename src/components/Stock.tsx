import Chip from "@mui/material/Chip";
import { useAppDispatch } from "../app/hooks";
import { selectStock } from "../features/stock/stockSlice";
import { Stock as IStock } from "../interfaces";

const Stock = ({ stock }: { stock: IStock }) => {
  const { name } = stock;

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(selectStock(stock));
  };

  return (
    <Chip
      sx={{ margin: ".25rem 0", fontSize: "1rem", fontWeight: "bold" }}
      label={name}
      onClick={handleClick}
    />
  );
};

export default Stock;
