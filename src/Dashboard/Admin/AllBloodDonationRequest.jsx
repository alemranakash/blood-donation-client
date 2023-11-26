import { useState } from 'react';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useBloodRequest from '../../Hooks/useBloodRequest';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';



const AllBloodDonationRequest = () => {
  const isVolunteer = !true


    const [bloodRequest, loading, refetch] = useBloodRequest();
  const axiosPublic = useAxiosPublic();
  // const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all'); // Default to 'all'
  const itemsPerPage = 5;

  if (loading) {
    console.log("Data is still loading. Please wait...");
    return <div>Loading...</div>;
  }

  const sortedBloodRequest = [...bloodRequest].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Filter blood requests based on selectedStatus
  const filteredBloodRequest = selectedStatus === 'all'
    ? sortedBloodRequest
    : sortedBloodRequest.filter(request => request.donationStatus === selectedStatus);

  // Check if the user's email matches the requesterEmail in any blood donation request for the current page
  const userHasRequests = filteredBloodRequest
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    

  if (!userHasRequests) {
    return (
      <div>
        <p className="text-center text-3xl">No blood donation Requests</p>
      </div>
    );
  }

  const handleDoneClick = (request) => {
    axiosPublic.patch(`/bloodRequest/done/${request._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Blood Donation Done!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
    
  };

  const handleCancelClick = (id) => {
    axiosPublic.patch(`/bloodRequest/cancel/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Blood Donation Canceled !`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
    
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/bloodRequest/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  const currentRequests = filteredBloodRequest.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to the first page when changing status
  };

  const formatTime = (time) => {
    const formattedTime = new Date(`1970-01-01T${time}`);
    return formattedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

  return (
    <div>
      <h1 className="text-2xl mt-5 mb-3">All Blood Requests</h1>
      {/* Filter dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donationStatus">
          Filter by Donation Status
        </label>
        <select
          className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="donationStatus"
          onChange={(e) => handleStatusChange(e.target.value)}
          value={selectedStatus}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

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
            {currentRequests.map((request, index) => (
              <tr key={index} className="border border-gray-200">
                <td className="border text-center border-gray-200 p-2">{request.recipientName}</td>
                <td className="border text-center border-gray-200 p-2">{`${request.district}, ${request.upazila}`}</td>
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
                <td className="border border-gray-200 p-2 space-x-2">
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-sm bg-black text-white ">
                      Click
                    </label>
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

                      {!isVolunteer && (
            <>

                      <Link
                        className="bg-blue-300 text-center hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                        to={`editBloodRequest/${request._id}`}
                      >
                        <button>{`Edit`}</button>
                      </Link>
                      <button
                        className="bg-blue-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteClick(request._id)}
                      >
                        {`Delete`}
                      </button>
                      <Link
                        className="bg-blue-300 text-center hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                        to={`bloodDonationDetails/${request._id}`}
                      >
                        <button>{`View`}</button>
                      </Link>

                      </>
          )}


                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredBloodRequest.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 border rounded ${
              currentPage === index + 1 ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;