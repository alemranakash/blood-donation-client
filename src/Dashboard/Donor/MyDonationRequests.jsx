// import { Link } from "react-router-dom";
import useBloodRequest from "../../Hooks/useBloodRequest";
import useAuth from "../../Hooks/useAuth";

const MyDonationRequests = () => {
    const [bloodRequest] = useBloodRequest();
    const { user } = useAuth();

 

    const handleDoneClick = (index) => {
        console.log(`Done button clicked for request ${index + 1}`);
    };

    const handleCancelClick = (index) => {
        console.log(`Cancel button clicked for request ${index + 1}`);
    };

    const handleEditClick = (index) => {
        console.log(`Edit button clicked for request ${index + 1}`);
    };

    const handleDeleteClick = (index) => {
        console.log(`Delete button clicked for request ${index + 1}`);
    };

    const handleViewClick = (index) => {
        console.log(`View button clicked for request ${index + 1}`);
    };


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
        <button
            className="bg-blue-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            onClick={() => handleEditClick(index)}
        >
            Edit
        </button>
        <button
            className="bg-blue-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            onClick={() => handleDeleteClick(index)}
        >
            Delete
        </button>

        <button
            className="bg-blue-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            onClick={() => handleViewClick(index)}
        >
            View
        </button>
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