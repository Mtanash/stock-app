import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import CustomModal from "./CustomModal";
import Divider from "@mui/material/Divider";
import StockList from "./StockList";
import Grid from "@mui/material/Grid";
import AddStockForm from "./AddStockForm";

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
        />
      </Paper>
    </Grid>
  );
};

export default StocksPanel;
