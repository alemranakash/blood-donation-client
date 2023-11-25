import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import useBloodRequest from "../../Hooks/useBloodRequest";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const BloodDonationDetails = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { id } = useParams();
    const [bloodRequest, loading, refetch] = useBloodRequest()

    if (loading) {
        console.log("Data is still loading. Please wait...");
        return;
    }

    const singleData = bloodRequest.find(request => request._id === id)
    console.log(singleData);

    const formatTime = (time) => {
        const formattedTime = new Date(`1970-01-01T${time}`);
        return formattedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const donorInfo= {
        donorName: user.displayName,
        donorEmail: user.email
    }
    console.log(donorInfo);

    // * Done Button
    const handleDonate = (id) => {
        axiosPublic.patch(`/bloodRequest/donate/${id}`, {donorInfo})
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
        .then(refetch);

    };

    return (
        <div>
            <h1>Requester name: {singleData.requesterName} </h1>
            <h1>Requester email: {singleData.requesterEmail} </h1>
            <h1>Recipient name: {singleData.recipientName}</h1>
            <h1>Recipient District: {singleData.district}</h1>
            <h1>Recipient Upazila: {singleData.upazila}</h1>
            <h1>Hospital Name: {singleData.hospitalName}</h1>
            <h1>Full address line: {singleData.fullAddress}</h1>
            <h1>Donation date: {singleData.donationDate}</h1>
            <h1>Donation time: {formatTime(singleData.donationTime)}</h1>
            <h1>Request message: {singleData.requestMessage}</h1>
            <h1>Donation status: {singleData.donationStatus}</h1>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDonate(singleData._id)}
            >
                Donate
            </button>
        </div>
    );
};

export default BloodDonationDetails;