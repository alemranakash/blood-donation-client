import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useBloodRequest from "../../Hooks/useBloodRequest";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';


const EditBloodRequest = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { id } = useParams();
    const [bloodRequest, loading, refetch]= useBloodRequest()

    if (loading) {
        console.log("Data is still loading. Please wait...");
        return;
    }

const singleData = bloodRequest.find(request => request._id === id)
console.log(singleData);

    // console.log(id);
    // console.log(bloodRequest);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            console.log("Data is still loading. Please wait...");
            return;
        }

      
        const updatedRecipientName = e.target.recipientName.value;
        const updatedDistrict = e.target.district.value;
        const updatedUpazila = e.target.upazila.value;
        const updatedHospitalName = e.target.hospitalName.value;
        const updatedFullAddress = e.target.fullAddress.value;
        const updatedDonationDate = e.target.donationDate.value;
        const updatedDonationTime = e.target.donationTime.value;
        const updatedRequestMessage = e.target.requestMessage.value;
       

        const updatedBloodRequest = {
            
            recipientName: updatedRecipientName,
            district: updatedDistrict,
            upazila: updatedUpazila,
            hospitalName: updatedHospitalName,
            fullAddress: updatedFullAddress,
            donationDate: updatedDonationDate,
            donationTime: updatedDonationTime,
            requestMessage: updatedRequestMessage,
           
        };

        const updatedBlood = await axiosPublic.patch(`/dashboard/donorDashboard/editBloodRequest/${singleData._id}`, updatedBloodRequest);
        console.log(updatedBlood.data)
        if (updatedBlood.data.modifiedCount > 0) {
            swal({
                title: 'Blood Request Updated',
                text: 'Blood Request updated successfully',
                icon: 'success'
            })
        }

    }


    return (

        <div>
            <div>
                <div className=''>
                    <h1 className="text-center text-4xl mt-10 mb-5">Create Donation Request</h1>
                    <div className="border-b-4 text-center w-56 mb-10 mx-auto border-black"></div>
                    <div className="flex lg:flex-row flex-col-reverse justify-center items-center my-10">
                        <div className="shadow-2xl hover:shadow-purple-600 rounded-md lg:w-1/2 mx-auto ">
                            <form onSubmit={handleFormSubmit} className=" rounded px-8 pt-6 pb-8 mb-4">

                                {/* requester name (read-only) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Requester Name
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
                                        Requester Email
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        name="requesterEmail"
                                    />
                                </div>

                                {/* recipient name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientName">
                                        Recipient Name
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="recipientName"
                                        type="text"
                                        placeholder="Recipient Name"
                                        required
                                        name="recipientName"
                                        defaultValue={singleData?.recipientName || ""}
                                    />
                                </div>

                                {/* recipient district (select option) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">
                                        Recipient District
                                    </label>
                                    <select
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="district"
                                        name="district"
                                        defaultValue={singleData?.district || ""}
                                    >
                                        <option disabled value="default">Select a District</option>
                                        <option value="Cumilla">Cumilla</option>
                                        <option value="Feni">Feni</option>
                                        <option value="Brahmanbaria">Brahmanbaria</option>
                                        <option value="Rangamati">Rangamati</option>
                                    </select>
                                </div>

                                {/* recipient upazila (select option) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upazila">
                                        Recipient Upazila
                                    </label>
                                    <select
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="upazila"
                                        name="upazila"
                                        defaultValue={singleData?.upazila || ""}
                                    >
                                        <option disabled value="default">Select a Upazila</option>
                                        <option value="Debidwar">Debidwar</option>
                                        <option value="Barura">Barura</option>
                                        <option value="Brahmanpara">Brahmanpara</option>
                                        <option value="Chandina">Chandina</option>
                                    </select>
                                </div>

                                {/* hospital name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospitalName">
                                        Hospital Name
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="hospitalName"
                                        type="text"
                                        placeholder="Hospital Name"
                                        required
                                        name="hospitalName"
                                        defaultValue={singleData?.hospitalName || ""}
                                    />
                                </div>

                                {/* full address line */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullAddress">
                                        Full Address Line
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="fullAddress"
                                        type="text"
                                        placeholder="Full Address Line"
                                        required
                                        name="fullAddress"
                                        defaultValue={singleData?.fullAddress || ""}
                                    />
                                </div>

                                {/* donation date */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donationDate">
                                        Donation Date
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="donationDate"
                                        type="date"
                                        required
                                        name="donationDate"
                                        defaultValue={singleData?.donationDate || ""}
                                    />
                                </div>

                                {/* donation time */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donationTime">
                                        Donation Time
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="donationTime"
                                        type="time"
                                        required
                                        name="donationTime"
                                        defaultValue={singleData?.donationTime || ""}
                                    />
                                </div>

                                {/* request message */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requestMessage">
                                        Request Message
                                    </label>
                                    <textarea
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="requestMessage"
                                        placeholder="Request Message"
                                        required
                                        name="requestMessage"
                                        defaultValue={singleData?.requestMessage || ""}
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        className="btn btn-sm rounded-md border-black hover:bg-black hover:text-white bg-none text-black"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBloodRequest;