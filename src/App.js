import Header from "./views/Header";
import Footer from "./views/Footer";
import Routes from "../src/routes/allroutes";
import { Box } from "@mui/material";

function App() {
  return (
    <Box style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '90vh',
    }}>
      <Header />
      <Routes />
      <Footer />
    </Box>
  );
}

export default App;
