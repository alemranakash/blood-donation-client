// import { NavLink, Outlet } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import useAuth from "../Hooks/useAuth";
// import useUsers from "../Hooks/useUsers";



// const Dashboard = () => {
//         const {user}= useAuth()
//         const [users, loading]= useUsers()

//         if (loading) {
//                 console.log("Data is still loading. Please wait...");
//                 return <div>Loading...</div>;
//               }

//               const currentUser = user
// const userList = users

// const matchedUser = userList.find((u) => u.email === currentUser.email);
           
// console.log(matchedUser);

   

//     const isAdmin = !true
//     const isVolunteer = !true





//     return (
//      <div>
//         <Navbar></Navbar>
       
//            <div className="flex ">
            
//         {/* dashboard side bar */}
//         <div className="w-64 min-h-screen bg-orange-400">
//         <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
// {/* Sidebar content here */}



// {/* Donor section */}
// {!isAdmin && !isVolunteer && 
//    <div>

//    <li>
// <NavLink to="/dashboard/donorDashboard"> 
//         Donor Dashboard</NavLink>
// </li>
//    <li>
// <NavLink to="/dashboard/profile"> 
//         Profile</NavLink>
// </li>
//      <li>
// <NavLink to="my-donation-requests">
//         My Donation Request</NavLink>
// </li>
//      <li>
// <NavLink to="create-donation-request">
//        Create Donation Request</NavLink>
// </li>

// <li><a>Donor</a></li>
//    </div>

// }


// {/* Admin section */}
// {isAdmin && 

// <div>
// <li>
// <NavLink to="/dashboard/adminDashboard"> 
//         Admin Dashboard</NavLink>
// </li>
// <li>
// <NavLink to="all-users">
//         All User</NavLink>
// </li>
// <li>
// <NavLink to="all-blood-donation-request">
//         All Blood Donation Request</NavLink>
// </li>
// <li>
// <NavLink to="content-management">
//         Content Management</NavLink>
// </li>
// <li><a>Admin</a></li>
// </div>

// }


// {/* Volunteer section */}
// {isVolunteer && 
// <div>
// <li>
// <NavLink to="/dashboard/volunteerDashboard"> 
//         Volunteer Dashboard</NavLink>
// </li>

// <li>
// <NavLink to="all-blood-donation-request">
//         All Blood Donation Request</NavLink>
// </li>

// <li>
// <NavLink to="content-management">
//         Content Management</NavLink>
// </li>

// <li><a>Volunteer</a></li>
// </div>
// }


// </ul>
//         </div>
//         {/* dashboard content */}
//         <div className="flex-1 pl-20 pt-10">
       
//             <Outlet></Outlet>
//         </div>
//     </div>
//      </div>
//     );
// };

// export default Dashboard;







import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import useAuth from "../Hooks/useAuth";
import useUsers from "../Hooks/useUsers";

const Dashboard = () => {
  const { user } = useAuth();
  const [users, loading] = useUsers();

  if (loading) {
    console.log("Data is still loading. Please wait...");
    return <div>Loading...</div>;
  }

  const currentUser = user;
  const userList = users;

  // Find the user in the userList based on email
  const matchedUser = userList.find((u) => u.email === currentUser.email);

  // Assuming user has a 'role' property
  const userRole = matchedUser?.role;

  const isAdmin = userRole === "admin";
  const isVolunteer = userRole === "volunteer";

  return (
    <div>
      <Navbar />
      <div className="flex ">
        {/* Dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400">
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
                <li>
                  <a>Donor</a>
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
                  <NavLink to="all-users">All User</NavLink>
                </li>
                <li>
                  <NavLink to="all-blood-donation-request">All Blood Donation Request</NavLink>
                </li>
                <li>
                  <NavLink to="content-management">Content Management</NavLink>
                </li>
                <li>
                  <a>Admin</a>
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
                  <NavLink to="all-blood-donation-request">All Blood Donation Request</NavLink>
                </li>
                <li>
                  <NavLink to="content-management">Content Management</NavLink>
                </li>
                <li>
                  <a>Volunteer</a>
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

