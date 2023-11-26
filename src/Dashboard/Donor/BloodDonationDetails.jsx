// import useAuth from "../../Hooks/useAuth";
// import { useParams } from "react-router-dom";
// import useBloodRequest from "../../Hooks/useBloodRequest";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import Swal from "sweetalert2";


// const BloodDonationDetails = () => {
//     const axiosPublic = useAxiosPublic()
//     const { user } = useAuth();
//     const { id } = useParams();
//     const [bloodRequest, loading, refetch] = useBloodRequest()

//     if (loading) {
//         console.log("Data is still loading. Please wait...");
//         return;
//     }

//     const singleData = bloodRequest.find(request => request._id === id)
//     console.log(singleData);

//     const formatTime = (time) => {
//         const formattedTime = new Date(`1970-01-01T${time}`);
//         return formattedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     };

//     const donorInfo= {
//         donorName: user.displayName,
//         donorEmail: user.email
//     }
//     console.log(donorInfo);

//     // * Done Button
//     const handleDonate = (id) => {
//         axiosPublic.patch(`/bloodRequest/donate/${id}`, {donorInfo})
//         .then(res =>{
//             console.log(res.data)
//             if(res.data.modifiedCount > 0){
                
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `Blood Donation Done!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                   });
//             }
//         })
//         .then(refetch);

//     };

//     return (
//         <div>
//             <h1>Requester name: {singleData.requesterName} </h1>
//             <h1>Requester email: {singleData.requesterEmail} </h1>
//             <h1>Recipient name: {singleData.recipientName}</h1>
//             <h1>Recipient District: {singleData.district}</h1>
//             <h1>Recipient Upazila: {singleData.upazila}</h1>
//             <h1>Recipient Blood Group: {singleData.bloodGroup}</h1>
//             <h1>Hospital Name: {singleData.hospitalName}</h1>
//             <h1>Full address line: {singleData.fullAddress}</h1>
//             <h1>Donation date: {singleData.donationDate}</h1>
//             <h1>Donation time: {formatTime(singleData.donationTime)}</h1>
//             <h1>Request message: {singleData.requestMessage}</h1>
//             <h1>Donation status: {singleData.donationStatus}</h1>
//             <button
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleDonate(singleData._id)}
//             >
//                 Donate
//             </button>
//         </div>
//     );
// };

// export default BloodDonationDetails;















import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import useBloodRequest from "../../Hooks/useBloodRequest";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const BloodDonationDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { id } = useParams();
  const [bloodRequest, loading, refetch] = useBloodRequest();

  if (loading) {
    return <div>Loading...</div>;
  }

  const singleData = bloodRequest.find((request) => request._id === id);

  const formatTime = (time) => {
    const formattedTime = new Date(`1970-01-01T${time}`);
    return formattedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };



  const donorInfo = {
    donorName: user.displayName,
    donorEmail: user.email,
  };

  const handleDonate = (id) => {
    axiosPublic
      .patch(`/bloodRequest/donate/${id}`, { donorInfo })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Blood Donation Done!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .then(refetch);
  };

  return (
    <div>
        <h1 className="text-3xl text-center my-5 font-bold mb-6">Blood Donation Request Details</h1>
        <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
        
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Requester Name:</span> {singleData.requesterName}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Requester Email:</span> {singleData.requesterEmail}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Recipient Name:</span> {singleData.recipientName}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Recipient District:</span> {singleData.district}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Recipient Upazila:</span> {singleData.upazila}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Recipient Blood Group:</span> {singleData.bloodGroup}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Hospital Name:</span> {singleData.hospitalName}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Full Address Line:</span> {singleData.fullAddress}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Donation Date:</span> {singleData.donationDate}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Donation Time:</span> {formatTime(singleData.donationTime)}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Request Message:</span> {singleData.requestMessage}
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-bold">Donation Status:</span> {singleData.donationStatus}
        </div>



<div>
   
<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>document.getElementById('my_modal_5').showModal()}>Donate</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
   
  <form action="">
     {/* requester name (read-only) */}
     <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Donor Name
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        value={user.displayName}
                                        readOnly
                                        name="requesterName"
                                    />
                                </div>

                                {/* requester email (read-only) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Donor Email
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        name="requesterEmail"
                                    />
                                </div>
  </form>
    <div className="modal-action">
      <form method="dialog">
        
      <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDonate(singleData._id)}
        >
          Confirm
        </button>
      </form>
    </div>
  </div>
</dialog>
</div>


       



      </div>
    </div>
    </div>
  );
};

export default BloodDonationDetails;




  







