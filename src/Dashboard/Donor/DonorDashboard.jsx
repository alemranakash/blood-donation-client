
import { NavLink} from "react-router-dom";
// import swal from 'sweetalert';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useBloodRequest from "../../Hooks/useBloodRequest";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const DonorDashboard = () => {
    const [bloodRequest, refetch] = useBloodRequest();
    const { user } = useAuth();
    const axiosPublic= useAxiosPublic()

    // Sort bloodRequests by createdAt in descending order
    const sortedBloodRequest = [...bloodRequest].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Take the first three elements
    const recentBloodRequest = sortedBloodRequest.slice(0, 3);

    console.log(recentBloodRequest);

    // * Done Button
    const handleDoneClick = (request) => {
        axiosPublic.patch(`/bloodRequest/done/${request._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Blood Donation Done!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
        refetch();

    };

    // * Cancel Button
    const handleCancelClick = (id) => {
        axiosPublic.patch(`/bloodRequest/cancel/${id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
               
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Blood Donation Canceled !`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
        refetch();
    };

   

    // * delete button===========

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/bloodRequest/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                           
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch();
                    })
            }
        });
    };

    // *=====================

   

    // Check if the user's email matches the requesterEmail in any blood donation request
    const userHasRequests = recentBloodRequest.some(request => request.requesterEmail === user?.email);

    if (!userHasRequests) {
        return (
            <div>
                <h2 className="text-3xl">
                    <span>Hi, Welcome </span>
                    {user?.displayName ? user.displayName : 'Back'}
                </h2>
                {/* <p>No blood donation requests found for your email.</p> */}
            </div>
        );
    }

    const formatTime = (time) => {
        const formattedTime = new Date(`1970-01-01T${time}`);
        return formattedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };


    return (
        <div>
            <h2 className="text-5xl text-center  mb-5">
                <span>Hi, Welcome </span>
                {user?.displayName ? user.displayName : 'Back'}
            </h2>

            <h1 className="text-2xl text-center mt-5 mb-3">My Recent Blood Requests</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-200 p-2">Recipient Name</th>
                            <th className="border border-gray-200 p-2">Recipient Location</th>
                            <th className="border border-gray-200 p-2">Recipient Blood Group</th>
                            <th className="border border-gray-200 p-2">Donation Date</th>
                            <th className="border border-gray-200 p-2">Donation Time</th>
                            <th className="border border-gray-200 p-2">Donation Status</th>
                            <th className="border border-gray-200 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentBloodRequest.map((request, index) => (
                            <tr key={index} className="border border-gray-200">
                                <td className="border text-center border-gray-200 p-2">{request.recipientName}</td>
                                <td className="border text-center border-gray-200 p-2"> <div>{request.district},</div> <div>{request.upazila}</div></td>
                                <td className="border text-center border-gray-200 p-2">{request.bloodGroup}</td>
                                <td className="border text-center border-gray-200 p-2">{request.donationDate}</td>
                                <td className="border text-center border-gray-200 p-2">{formatTime(request.donationTime)}</td>
                                <td className="border text-center border-gray-200 p-2">
                  {request.donationStatus === "inprogress" ? (
                    <>
                      <div className="text-green-500 font-bold uppercase text-center">{`${request.donationStatus}`}</div>
                      <div>Donor Name: <span className="font-medium">{` ${request.donorName}`}</span> </div>
                      <div>{`Donor Email: ${request.donorEmail}`}</div>
                    </>
                  ) : (
                    <div className="font-bold text-center uppercase">{`${request.donationStatus}`}</div>
                  )}
                </td>
                                <td className="border text-center border-gray-200 p-2 space-x-2">

                                    <div className="dropdown dropdown-left">
                                        <label tabIndex={0} className="btn btn-sm bg-black text-white ">Click</label>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <div className="flex space-x-2 mb-2">
                                                {request.donationStatus === "inprogress" && (
                                                    <>
                                                        <button
                                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleDoneClick(request)}
                                                        >
                                                            Done
                                                        </button>
                                                        <button
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleCancelClick(request._id)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            <Link className="bg-blue-300 text-center hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" to={`editBloodRequest/${request._id}`}>
                                            <button
                                                className=""
                                                
                                            >
                                                Edit
                                            </button>
                                            </Link>
                                            <button
                                                className="bg-blue-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                                                onClick={() => handleDeleteClick(request._id)}
                                            >
                                                Delete
                                            </button>

                                            <Link className="bg-blue-300 text-center hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" to={`bloodDonationDetails/${request._id}`}>
                                            <button
                                                className=""
                                                
                                            >
                                                View
                                            </button>
                                            </Link>
                                        </ul>
                                    </div>

                                </td>




                            </tr>
                        ))}
                    </tbody>
                </table>
               
            </div>
            <NavLink to="/dashboard/my-donation-requests" className="text-black flex w-fit text-center justify-center items-center mx-auto mt-5  btn-info btn font-bold">View my all Request</NavLink>
        </div>
    );
};

export default DonorDashboard;
