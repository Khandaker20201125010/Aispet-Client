import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layers/Main";
import Home from "./Pages/Home";
import AddServices from "./Pages/AddServices";
import Services from "./comonents/OurServices/Services";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManageServices from "./Pages/ManageServices";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },

      {
        path: "/addServices",
        element: <AddServices></AddServices>,
      },
      {
        path: "/manageServices",
        element: <ManageServices></ManageServices>,
      },
    ],
  },
]);
const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}> <RouterProvider router={router} /></QueryClientProvider>
  </StrictMode>
);
