import { AuthContextProvider } from "./hooks/auth";

import { Routes } from "./routes";

import "./styles/global.scss";

function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}

export default App;
