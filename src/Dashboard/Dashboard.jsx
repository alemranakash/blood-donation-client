import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";



const Dashboard = () => {
   

    const isAdmin = true
    const isVolunteer = !true





    return (
     <div>
        <Navbar></Navbar>
       
           <div className="flex ">
            
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
{/* Sidebar content here */}



{/* Donor section */}
{!isAdmin && !isVolunteer && 
   <div>

   <li>
<NavLink to="/dashboard/donorDashboard"> 
        Donor Dashboard</NavLink>
</li>
   <li>
<NavLink to="/dashboard/profile"> 
        Profile</NavLink>
</li>
     <li>
<NavLink to="my-donation-requests">
        My Donation Request</NavLink>
</li>
     <li>
<NavLink to="create-donation-request">
       Create Donation Request</NavLink>
</li>

<li><a>Donor</a></li>
   </div>

}


{/* Admin section */}
{isAdmin && 

<div>
<li>
<NavLink to="/dashboard/adminDashboard"> 
        Admin Dashboard</NavLink>
</li>
<li>
<NavLink to="all-users">
        All User</NavLink>
</li>
<li>
<NavLink to="all-blood-donation-request">
        All Blood Donation Request</NavLink>
</li>
<li><a>Admin</a></li>
</div>

}


{/* Volunteer section */}
{isVolunteer && <li><a>Volunteer</a></li>}


</ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 pl-20 pt-10">
       
            <Outlet></Outlet>
        </div>
    </div>
     </div>
    );
};

export default Dashboard;








// <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
// {/* Sidebar content here */}

// <li>

//     <NavLink to="/dashboard/userProfile">
            
//             Profile</NavLink>
    
//     </li>

// {/* Donor section */}
// {!isAdmin && !isVolunteer && <li><a>Donor</a></li>}


// {/* Admin section */}
// {isAdmin && <li><a>Admin</a></li>}


// {/* Volunteer section */}
// {isVolunteer && <li><a>Volunteer</a></li>}


// </ul>