// import useAuth from "../../Hooks/useAuth";
// import useBloodRequest from "../../Hooks/useBloodRequest";

// const DonorDashboard = () => {
//     const [bloodRequest] = useBloodRequest()

//     const { user } = useAuth()

//     console.log(bloodRequest);
//     return (
//         <div>
//             <h2 className="text-3xl">
//                 <span>Hi, Welcome </span>
//                 {
//                     user?.displayName ? user.displayName : 'Back'
//                 }
//             </h2>

//             <h1>Blood Requests:</h1>
//             {bloodRequest.map((request, index) => (
//                 <div className="my-10" key={index}>
//                     <h3>Request {index + 1}</h3>
//                     <p>Recipient name: {request.recipientName}</p>
//                     <p>Recipient location: {request.district}, {request.upazila}</p>
//                     <p>Donation Date: {request.donationDate}</p>
//                     <p>Donation Date: {request.donationTime}</p>
//                     <p>Donation Status: {request.donationStatus}</p>
//                     {/* Add other details you want to display */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default DonorDashboard;




import useAuth from "../../Hooks/useAuth";
import useBloodRequest from "../../Hooks/useBloodRequest";

const DonorDashboard = () => {
    const [bloodRequest] = useBloodRequest();
    const { user } = useAuth();

    console.log(bloodRequest);

    const handleDoneClick = (index) => {
        // Handle the "Done" button click for the request at the specified index
        console.log(`Done button clicked for request ${index + 1}`);
    };

    const handleCancelClick = (index) => {
        // Handle the "Cancel" button click for the request at the specified index
        console.log(`Cancel button clicked for request ${index + 1}`);
    };

    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {user?.displayName ? user.displayName : 'Back'}
            </h2>

            <h1 className="text-2xl mt-5 mb-3">Blood Requests</h1>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonorDashboard;

