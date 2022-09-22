import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useGetAllStocksQuery } from "../features/api/stockApiSlice";
import Stock from "./Stock";

const StockList = () => {
  const { data: stocks, isLoading, error } = useGetAllStocksQuery(null);

  if (isLoading) return <CircularProgress />;
  else if (error) return <p>Error</p>;
  else
    return (
      <Stack>
        {stocks?.map((stock) => (
          <Stock key={stock._id} stock={stock} />
        ))}
      </Stack>
    );
};

export default StockList;
