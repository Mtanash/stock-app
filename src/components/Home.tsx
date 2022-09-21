import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import ItemsPanel from "./ItemsPanel";
import StocksPanel from "./StocksPanel";

const Home = () => {
  return (
    <Container sx={{ paddingTop: ".75rem" }}>
      <Grid container spacing={2}>
        <StocksPanel />
        <ItemsPanel />
      </Grid>
    </Container>
  );
};

export default Home;
