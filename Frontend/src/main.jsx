import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import { ErrorBoundary } from "react-error-boundary";
import FallbackC from "./errorHandling/FallbackC.jsx";
import { Toaster } from "react-hot-toast";
import { TasksContextProvider } from "./contexts/TasksContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={FallbackC}>
      <BrowserRouter>
        <UserContextProvider>
          <TasksContextProvider>
            <App />
            <Toaster position="top-center" />
          </TasksContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
