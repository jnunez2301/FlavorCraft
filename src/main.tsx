import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import router from "./router/router.tsx";
import { Toaster } from "react-hot-toast";
import { SessionProvider, } from "./auth/SessionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router}/>
      <Toaster position="top-center" />
    </SessionProvider>
  </StrictMode>
);
