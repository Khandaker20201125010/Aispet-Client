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
import UpdateServices from "./Pages/UpdateServices";
import Login from "./Pages/Login&signUp/Login";
import AuthProvider from "./comonents/Provider/AuthProvider";
import SignUp from "./Pages/Login&signUp/SignUp";
import DetailsPage from "./Pages/DetailsPage/DetailsPage";
import Error from "./Pages/Error/Error";
import Interest from "./comonents/Interest/Interest";
import Discover from "./comonents/Aboutus/Discover";
import PriveteRoutes from "./comonents/PrivetRoutes/PriveteRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<Error></Error>,
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
        element: <PriveteRoutes><AddServices></AddServices></PriveteRoutes>,
      },
      {
        path: "/manageServices",
        element: <PriveteRoutes><ManageServices></ManageServices></PriveteRoutes>,
      },
      {
        path: "/updateServices/:id",
        element:<UpdateServices></UpdateServices>,
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
      {
        path: "/signUp",
        element:<SignUp></SignUp>,
      },
      {
        path: "/myInterests",
        element:<Interest></Interest>,
      },
      {
        path: "/details/:id",
        element:<DetailsPage></DetailsPage>,
      },
      {
        path: "/discover",
        element:<Discover></Discover>,
      },
    ],
  },
]);
const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}> <AuthProvider><RouterProvider router={router} /></AuthProvider></QueryClientProvider>
  </StrictMode>
);
