import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../features/user/userSlice";
import AddStockForm from "./AddStockForm";
import CustomModal from "./CustomModal";
import StockList from "./StockList";

const StocksPanel = () => {
  const currentUser = useAppSelector(selectCurrentUser);

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
        <Typography gutterBottom variant="h5">
          Stocks
        </Typography>
        {currentUser?.userData?.role === "admin" && (
          <Button
            sx={{ margin: "1rem 0" }}
            variant="contained"
            onClick={handleOpen}
          >
            Add new stock
          </Button>
        )}

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
