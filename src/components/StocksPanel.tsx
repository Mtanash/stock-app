import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import AddStockForm from "./AddStockForm";
import CustomModal from "./CustomModal";
import StockList from "./StockList";

const StocksPanel = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);
  return (
    <Grid item xs={3}>
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ margin: "1rem 0" }}
          variant="contained"
          onClick={handleOpen}
        >
          Add new stock
        </Button>
        <Divider />
        <StockList />
        <CustomModal
          open={open}
          handleClose={handleClose}
          Component={<AddStockForm handleClose={handleClose} />}
          title="Add new stock"
        />
      </Paper>
    </Grid>
  );
};

export default StocksPanel;
