import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setFilteredItems } from "../features/item/itemSlice";
import { Item } from "../interfaces";

type SearchBarType = {
  items: Item[];
};

const SearchBar = ({ items }: SearchBarType) => {
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    dispatch(setFilteredItems(filteredItems));
  }, [searchQuery, items, dispatch]);

  return (
    <TextField
      sx={{ width: "100%", my: "1rem" }}
      type="search"
      placeholder="Search"
      name="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
