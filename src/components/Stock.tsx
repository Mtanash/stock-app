import { Stock as IStock } from "../types";
import Chip from "@mui/material/Chip";
import { useAppDispatch } from "../app/hooks";
import { selectStock } from "../features/stock/stockSlice";

const Stock = ({ stock }: { stock: IStock }) => {
  const { name } = stock;

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(selectStock(stock));
  };

  return (
    <Chip sx={{ margin: ".25rem 0" }} label={name} onClick={handleClick} />
  );
};

export default Stock;
