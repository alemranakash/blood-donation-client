import { useState } from 'react';

import { Link } from "react-router-dom";
import useBloodRequest from '../../Hooks/useBloodRequest';


const BloodDonationRequest = () => {
    const [bloodRequest, loading, ] = useBloodRequest();
  
  
  
    if (loading) {
      console.log("Data is still loading. Please wait...");
      return <div>Loading...</div>;
    }
  
    const sortedBloodRequest = [...bloodRequest].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
   

  // Filter only pending requests
  const pendingRequests = sortedBloodRequest.filter((request) => request.donationStatus === 'pending');

  
 
  
  
    const formatTime = (time) => {
      const formattedTime = new Date(`1970-01-01T${time}`);
      return formattedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  
    return (
      <div>
        <h1 className="text-4xl text-center my-10">Blood Donation requests</h1>
        {/* Filter dropdown */}
     
  
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2">Requester Name</th>
                <th className="border border-gray-200 p-2">Location</th>
                <th className="border border-gray-200 p-2">Donation Date</th>
                <th className="border border-gray-200 p-2">Donation Time</th>
                <th className="border border-gray-200 p-2">Donation Status</th>
                <th className="border border-gray-200 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request, index) => (
                <tr key={index} className="border border-gray-200">
                  <td className="border text-center border-gray-200 p-2">{request.requesterName}</td>
                  <td className="border text-center border-gray-200 p-2">{`${request.district}, ${request.upazila}`}</td>
                  <td className="border text-center border-gray-200 p-2">{request.donationDate}</td>
                  <td className="border text-center border-gray-200 p-2">{formatTime(request.donationTime)}</td>
                  <td className="border text-center border-gray-200 p-2">
                   
                      <div className="font-bold text-center uppercase">{`${request.donationStatus}`}</div>
               
                  </td>
                  <td className="border border-gray-200 p-2 space-x-2">
                  
                     
                    
                        <Link
                          className="bg-blue-300 text-center hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                          to={`bloodDonationDetails/${request._id}`}
                        >
                          <button>{`View`}</button>
                        </Link>
  
             

                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination buttons */}
      
      </div>
    );
};

export default BloodDonationRequest;