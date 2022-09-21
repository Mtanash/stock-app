import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllStocksQuery } from "../features/api/stockApiSlice";
import Stack from "@mui/material/Stack";
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
