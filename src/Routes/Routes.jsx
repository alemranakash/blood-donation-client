import { createBrowserRouter  } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Dashboard/Dashboard";
import UserProfile from "../Dashboard/UserProfile/UserProfile";
import PrivateRoutes from "./PrivateRoutes";
import UpdateUser from "../Dashboard/UserProfile/UpdateUser";
import CreateDonationRequest from "../Dashboard/Donor/CreateDonationRequest";
import DonorDashboard from "../Dashboard/Donor/DonorDashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
                path: '/',
                element: <Home></Home>
        },
        {
            path: "/login",
            element: <Login></Login>
          },
          {
            path: "/register",
            element: <Register></Register>
          },

          // *Dashboard
          {
            path: "/dashboard",
            element: <Dashboard></Dashboard>,
            children:[
              {
                path: "profile",
                element: <PrivateRoutes><UserProfile></UserProfile></PrivateRoutes>,
              },
              {
                path: "profile/updateUser/:id",
                element: <UpdateUser></UpdateUser>,
                loader: ({params})=> fetch(`http://localhost:5000/users/${params.id}`)
              },
             { path: "create-donation-request",
              element: <PrivateRoutes><CreateDonationRequest></CreateDonationRequest></PrivateRoutes>
            },
              {
                path: "",
                element: <DonorDashboard></DonorDashboard>
              },
            ]
          },
      ]
    },
  ]);