import { CircularProgress, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { useGetAllItemsQuery } from "../features/api/itemApiSlice";
import { selectCurrentStock } from "../features/stock/stockSlice";
import Item from "./Item";

const ItemList = () => {
  const currentStock = useAppSelector(selectCurrentStock);
  const { data: items, isLoading: itemsLoading } = useGetAllItemsQuery(
    currentStock?._id
  );

  if (itemsLoading) return <CircularProgress />;
  else if (!items || items.length < 1)
    return (
      <Typography variant="h6" textAlign="center">
        No items
      </Typography>
    );
  else
    return (
      <div>
        {items.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    );
};

export default ItemList;
