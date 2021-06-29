import { AuthContextProvider } from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes } from "./routes";

import "./styles/global.scss";

function App() {
  return (
    <AuthContextProvider>
      <Routes />
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;
