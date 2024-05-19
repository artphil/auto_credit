import { ThemeProvider } from "styled-components";
import { Theme } from "global/Theme";
import Router from "router";
import GlobalProvider from "contexts/GlobalContext";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalProvider>
        <Router />
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;
