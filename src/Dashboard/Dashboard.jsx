


// import { NavLink, Outlet } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import useRole from "../Hooks/useRole";


// const Dashboard = () => {
//         const {isAdmin, isVolunteer, matchedUser}= useRole()




//   return (
//     <div>
//       <Navbar />
//       <div className="flex ">
//         {/* Dashboard side bar */}
//         <div className="w-64 min-h-screen bg-orange-400">
//           <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
//             {/* Sidebar content here */}

//             {/* Donor section */}
//             {!isAdmin && !isVolunteer && matchedUser && (
//               <div>
//                 <li>
//                   <NavLink to="/dashboard/donorDashboard">Donor Dashboard</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/dashboard/profile">Profile</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="my-donation-requests">My Donation Request</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="create-donation-request">Create Donation Request</NavLink>
//                 </li>
//                 <li>
//                   <a>Donor</a>
//                 </li>
//               </div>
//             )}

//             {/* Admin section */}
//             {isAdmin && matchedUser && (
//               <div>
//                 <li>
//                   <NavLink to="/dashboard/adminDashboard">Admin Dashboard</NavLink>
//                 </li>

//                 <li>
//                   <NavLink to="/dashboard/profile">Profile</NavLink>
//                 </li>

//                 <li>
//                   <NavLink to="all-users">All User</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="all-blood-donation-request">All Blood Donation Request</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="content-management">Content Management</NavLink>
//                 </li>
              
//               </div>
//             )}

//             {/* Volunteer section */}
//             {isVolunteer && matchedUser && (
//               <div>
//                 <li>
//                   <NavLink to="/dashboard/volunteerDashboard">Volunteer Dashboard</NavLink>
//                 </li>

//                 <li>
//                   <NavLink to="/dashboard/profile">Profile</NavLink>
//                 </li>

//                 <li>
//                   <NavLink to="all-blood-donation-request">All Blood Donation Request</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="content-management">Content Management</NavLink>
//                 </li>
                
//               </div>
//             )}
//           </ul>
//         </div>
//         {/* Dashboard content */}
//         <div className="flex-1 pl-20 pt-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import useRole from "../Hooks/useRole";
import { useState } from "react";

const Dashboard = () => {
  const { isAdmin, isVolunteer, matchedUser } = useRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        {/* Mobile Drawer Button */}
        <div className="block lg:hidden">
          <button onClick={toggleDrawer} className="text-black p-4">
            ☰
          </button>
        </div>

        {/* Dashboard side bar */}
        <div
          className={`w-64 min-h-screen bg-orange-400 ${isDrawerOpen ? "block" : "hidden"} lg:block`}
        >
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            {/* Donor section */}
            {!isAdmin && !isVolunteer && matchedUser && (
              <div>
                <li>
                  <NavLink to="/dashboard/donorDashboard">Donor Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="my-donation-requests">My Donation Request</NavLink>
                </li>
                <li>
                  <NavLink to="create-donation-request">Create Donation Request</NavLink>
                </li>
              
              </div>
            )}

            {/* Admin section */}
            {isAdmin && matchedUser && (
              <div>
                <li>
                  <NavLink to="/dashboard/adminDashboard">Admin Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="all-users">All User</NavLink>
                </li>
                <li>
                  <NavLink to="all-blood-donation-request">All Blood Donation Request</NavLink>
                </li>
                <li>
                  <NavLink to="content-management">Content Management</NavLink>
                </li>
              </div>
            )}

            {/* Volunteer section */}
            {isVolunteer && matchedUser && (
              <div>
                <li>
                  <NavLink to="/dashboard/volunteerDashboard">Volunteer Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="all-blood-donation-request">All Blood Donation Request</NavLink>
                </li>
                <li>
                  <NavLink to="content-management">Content Management</NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>

        {/* Dashboard content */}
        <div className="flex-1 pl-20 pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
