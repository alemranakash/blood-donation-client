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
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import MyDonationRequests from "../Dashboard/Donor/MyDonationRequests";
import EditBloodRequest from "../Dashboard/Donor/EditBloodRequest";
import BloodDonationDetails from "../Dashboard/Donor/BloodDonationDetails";
import AllUsers from "../Dashboard/Admin/AllUsers";
import AllBloodDonationRequest from "../Dashboard/Admin/AllBloodDonationRequest";
import ContentManagement from "../Dashboard/Admin/ContentManagement";
import AddBlogs from "../Dashboard/Admin/AddBlogs";
import VolunteerDashboard from "../Dashboard/Volunteer/VolunteerDashboard";
import SearchPage from "../Pages/Home/SearchPage/SearchPage";
import BloodDonationRequest from "../Pages/BloodDonationRequest/BloodDonationRequest";
import Blog from "../Pages/Blog";
import Funding from "../Pages/Funding/Funding";
import Payment from "../Pages/Funding/Payment";

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
          {
            path: "/donation-request-home",
            element: <BloodDonationRequest></BloodDonationRequest>
          },
          {
            path: "/searchPage",
            element: <SearchPage></SearchPage>
          },
          {
            path: "/blog",
            element: <Blog></Blog>
          },
          {
            path: "/funding",
            element: <PrivateRoutes><Funding></Funding></PrivateRoutes>
          },
          {
            path: "/payment",
            element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
          },
          {
            path: "donation-request-home/bloodDonationDetails/:id",
            element: <PrivateRoutes><BloodDonationDetails></BloodDonationDetails></PrivateRoutes>,
          },

          // *Dashboard
          {
            path: "/dashboard",
            element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
            children:[
              {
                path: "donorDashboard",
                element: <DonorDashboard></DonorDashboard>
              },
              {
                path: "profile",
                element: <PrivateRoutes><UserProfile></UserProfile></PrivateRoutes>,
              },
              {
                path: "profile/updateUser/:id",
                element: <UpdateUser></UpdateUser>,
                // loader: ({params})=> fetch(`http://localhost:5000/users/${params.id}`)
              },
             { path: "create-donation-request",
              element: <PrivateRoutes><CreateDonationRequest></CreateDonationRequest></PrivateRoutes>
            },
            
              {
                path: "my-donation-requests",
                element: <MyDonationRequests></MyDonationRequests>
              },
              {
                path: "my-donation-requests/editBloodRequest/:id",
                element: <PrivateRoutes><EditBloodRequest></EditBloodRequest></PrivateRoutes>,
                // loader: ({params})=> fetch(`http://localhost:5000/bloodRequest/${params.id}`)
              },
              {
                path: "donorDashboard/editBloodRequest/:id",
                element: <PrivateRoutes><EditBloodRequest></EditBloodRequest></PrivateRoutes>,
                // loader: ({params})=> fetch(`http://localhost:5000/bloodRequest/${params.id}`)
              },
              {
                path: "donorDashboard/bloodDonationDetails/:id",
                element: <PrivateRoutes><BloodDonationDetails></BloodDonationDetails></PrivateRoutes>,
              },
              {
                path: "my-donation-requests/bloodDonationDetails/:id",
                element: <PrivateRoutes><BloodDonationDetails></BloodDonationDetails></PrivateRoutes>,
              },
             


              // *Admin section
              {
                path: "adminDashboard",
                element: <AdminDashboard></AdminDashboard>
              },
              {
                path: "all-users",
                element: <AllUsers></AllUsers>
              },
              {
                path: "all-blood-donation-request",
                element: <AllBloodDonationRequest></AllBloodDonationRequest>
              },
              {
                path: "all-blood-donation-request/bloodDonationDetails/:id",
                element: <PrivateRoutes><BloodDonationDetails></BloodDonationDetails></PrivateRoutes>,
              },
              {
                path: "all-blood-donation-request/editBloodRequest/:id",
                element: <PrivateRoutes><EditBloodRequest></EditBloodRequest></PrivateRoutes>,
                
              },
              {
                path: "content-management",
                element: <ContentManagement></ContentManagement>
              },
              {
                path: "content-management/add-blog",
                element: <AddBlogs></AddBlogs>
              },


              // * Volunteer Section
              {
                path: "volunteerDashboard",
                element: <VolunteerDashboard></VolunteerDashboard>
              },

            ]
          },
      ]
    },
  ]);