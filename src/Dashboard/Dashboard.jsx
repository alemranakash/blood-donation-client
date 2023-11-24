import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Dashboard = () => {
    const {user} = useAuth();

    const isAdmin = !true
    const isVolunteer = !true





    return (
        <div className="flex ">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
{/* Sidebar content here */}

<li>

    <NavLink to="/dashboard/userProfile">
            
            Profile</NavLink>
    
    </li>

{/* Donor section */}
{!isAdmin && !isVolunteer && <li><a>Donor</a></li>}


{/* Admin section */}
{isAdmin && <li><a>Admin</a></li>}


{/* Volunteer section */}
{isVolunteer && <li><a>Volunteer</a></li>}


</ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 pl-20 pt-10">
        <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
            <Outlet></Outlet>
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