import { CircularProgress, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { useGetStockItemsQuery } from "../features/api/stockApiSlice";
import { selectFilteredItems } from "../features/item/itemSlice";
import { selectCurrentStock } from "../features/stock/stockSlice";
import Item from "./Item";
import SearchBar from "./SearchBar";

const ItemList = () => {
  const currentStock = useAppSelector(selectCurrentStock);

  const { data: items, isLoading: itemsLoading } = useGetStockItemsQuery(
    currentStock?._id
  );

  const filteredItems = useAppSelector(selectFilteredItems);

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
        <SearchBar items={items} />
        {filteredItems.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    );
};

export default ItemList;
