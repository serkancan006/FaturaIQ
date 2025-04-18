import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./hooks/AuthContext.tsx";
import { HotToastContainer } from "./services/NotifyService.tsx";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <HotToastContainer />
      <App />
    </AuthProvider>
  </StrictMode>
);
