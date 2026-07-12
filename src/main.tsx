import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AppBar from "./Components/AppBar";
import Footer from "./Components/Footer";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppBar />
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>,
);
