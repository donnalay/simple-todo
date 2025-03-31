import "./App.css";
import TodoList from "./TodoList";
import "@fontsource-variable/playpen-sans";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Stamp from "./Stamp";
const theme = createTheme({
  typography: {
    fontFamily: "Playpen Sans Variable, cursive",
  },
  palette: {
    primary: {
      main: "#283618",
    },
    background: {
      default: "#f4f4d5",
    },
    text: {
      primary: "#283618",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoList />
    </ThemeProvider>
  );
}

export default App;
