import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import router from "./router/router.tsx";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "./auth/SessionContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </ThemeProvider>
    </SessionProvider>
  </StrictMode>
);
