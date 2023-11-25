// import { Link } from "react-router-dom";
import useBloodRequest from "../../Hooks/useBloodRequest";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyDonationRequests = () => {
    const [bloodRequest, refetch] = useBloodRequest();
    const axiosPublic = useAxiosPublic
    const { user } = useAuth();



    // * Done Button
    const handleDoneClick = (request) => {
        axiosPublic.patch(`/bloodRequest/done/${request._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {

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
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {

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
    const userHasRequests = bloodRequest.some(request => request.requesterEmail === user?.email);

    if (!userHasRequests) {
        return (
            <div>

                <p className="text-center text-3xl ">No blood donation Requests</p>
            </div>
        );
    }

    return (
        <div>


            <h1 className="text-2xl mt-5 mb-3">My all Blood Requests</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-200 p-2">Recipient Name</th>
                            <th className="border border-gray-200 p-2">Recipient Location</th>
                            <th className="border border-gray-200 p-2">Donation Date</th>
                            <th className="border border-gray-200 p-2">Donation Time</th>
                            <th className="border border-gray-200 p-2">Donation Status</th>
                            <th className="border border-gray-200 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bloodRequest.map((request, index) => (
                            <tr key={index} className="border border-gray-200">
                                <td className="border border-gray-200 p-2">{request.recipientName}</td>
                                <td className="border border-gray-200 p-2">{`${request.district}, ${request.upazila}`}</td>
                                <td className="border border-gray-200 p-2">{request.donationDate}</td>
                                <td className="border border-gray-200 p-2">{request.donationTime}</td>
                                <td className="border border-gray-200 p-2">{request.donationStatus}</td>
                                <td className="border border-gray-200 p-2 space-x-2">

                                    <div className="dropdown dropdown-left">
                                        <label tabIndex={0} className="btn btn-sm bg-black text-white ">Click</label>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <div className="flex space-x-2 mb-2">
                                                {request.donationStatus === "inprogress" && (
                                                    <>
                                                        <button
                                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleDoneClick(index)}
                                                        >
                                                            Done
                                                        </button>
                                                        <button
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleCancelClick(index)}
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
                                                onClick={() => handleDeleteClick(index)}
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
        </div>
    );
};

export default MyDonationRequests;