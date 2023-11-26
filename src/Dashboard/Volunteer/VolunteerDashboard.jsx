
import { FaUserAlt } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { MdBloodtype } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";
import useBloodRequest from "../../Hooks/useBloodRequest";


const VolunteerDashboard = () => {
    const { user } = useAuth();
    const [users, loading, ] = useUsers();
    const [bloodRequest]= useBloodRequest()

    if (loading) {
        console.log("Data is still loading. Please wait...");
        return;
    }

console.log(users.length);
console.log(bloodRequest.length);

    return (
        <div>
            <h2 className="text-5xl text-center  mb-10">
                <span>Hi, Welcome </span>
                {user?.displayName ? user.displayName : 'Back'}
            </h2>


  <div className="w-fit justify-center mx-auto">
  <div className="stats stats-vertical lg:stats-horizontal border-2 shadow  ">
  
  <div className="stat place-items-center">
    <div className="stat-figure text-blue-600">
      <h1 className="text-6xl"><FaUserAlt></FaUserAlt></h1>
    </div>
    <div className="stat-title">Total User</div>
    <div className="stat-value">{users.length}</div>
    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
  </div>
  




  <div className="stat place-items-center">
    <div className="stat-figure text-green-500">
      <h1 className="text-6xl"><RiRefund2Line /></h1>
    </div>
    <div className="stat-title">Total Funding</div>
    <div className="stat-value">0</div>
    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
  </div>
  




  <div className="stat place-items-center">
    <div className="stat-figure text-red-600">
     <h1 className="text-6xl"><MdBloodtype /></h1>
    </div>
    <div className="stat-title">Total Blood Donation Request</div>
    <div className="stat-value">{bloodRequest.length}</div>
    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
  </div>
  
</div>
  </div>
        </div>
    );
}

export default VolunteerDashboard;