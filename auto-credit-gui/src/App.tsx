import { ThemeProvider } from "styled-components";
import { Theme } from "global/Theme";
import Router from "router";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
