// import useAuth from "../../Hooks/useAuth";


// const CreateDonationRequest = () => {
//     const {user}=useAuth()


//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//     }

//     return (
//         <div>
//              <div>
//             <div className=''>
//             <h1 className="text-center text-4xl mt-10 mb-5">Create Donation Request</h1>
//             <div className="border-b-4 text-center w-56 mb-10 mx-auto border-black">
//   </div>
//    <div className="flex lg:flex-row flex-col-reverse justify-center items-center my-10">
//     {/* <img className="" src="https://i.ibb.co/wwfc0RJ/register.png" alt="" /> */}
//    <div className="shadow-2xl hover:shadow-purple-600 rounded-md lg:w-1/2 mx-auto ">
//   <form onSubmit={handleFormSubmit} className=" rounded px-8 pt-6 pb-8 mb-4">

//     {/* img */}
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//         Image URL
//       </label>
//       <input
//         className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="image"
//         type="text"
//         placeholder="Image URL"
//         required
//         name="image"
//       />
//     </div>

// {/* title */}
//     <div className="mb-4">
//       <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//         Title
//       </label>
//       <input
//         className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="name"
//         type="text"
//         placeholder="Blog title"
//         required
//         name="title"
//       />
//     </div>

// {/* category */}
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//         Category
//       </label>
//       <select
//         className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="category"
//         name="category"

//       >
//         <option value="Technology">Technology</option>
//         <option value="Education">Education</option>
//         <option value="Entertainment">Entertainment</option>
//         <option value="Food and Cooking">Food and Cooking</option>
//         <option value="Health">Health</option>
//       </select>
//     </div>

// {/* short description */}
// <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="short_description">
//         Short Description
//       </label>
//       <textarea
//         className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="short_description"
//         placeholder="Short Description"
//         required
//         name="short_description"
//         rows="3"
//       ></textarea>
//     </div>

// {/* long description */}
// <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="long_description">
//         Long Description
//       </label>
//       <textarea
//         className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="long_description"
//         placeholder="Long Description"
//         required
//         name="long_description"
//         rows="3"
//       ></textarea>
//     </div>








//     <div className="flex items-center justify-between">
//       <button
//         className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black"
//         type="submit"
//       >
//         Submit
//       </button>
//     </div>


//   </form>
// </div>
//    </div>

//         </div>
//         </div>
//         </div>
//     );
// };

// export default CreateDonationRequest;


import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import swal from 'sweetalert';
// import useBloodRequest from "../../Hooks/useBloodRequest";
import { useParams } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";




const CreateDonationRequest = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { id } = useParams();
    console.log(id);

    console.log(user);
    const [users, loading, refetch] = useUsers()

    if (loading) {
        console.log("Data is still loading. Please wait...");
        return;
    }

    const singleUser = users.find(request => request.email === user.email)
    console.log(singleUser);

    console.log(singleUser.status);



    // *================================

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const requesterName = user.displayName;
        const requesterEmail = user.email;
        const recipientName = e.target.recipientName.value;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;
        const hospitalName = e.target.hospitalName.value;
        const fullAddress = e.target.fullAddress.value;
        const donationDate = e.target.donationDate.value;
        const donationTime = e.target.donationTime.value;
        const requestMessage = e.target.requestMessage.value;
        const createdAt = new Date();

        const createRequest = {
            requesterName,
            requesterEmail,
            recipientName,
            district,
            upazila,
            hospitalName,
            fullAddress,
            donationDate,
            donationTime,
            requestMessage,
            donationStatus: "pending",
            createdAt
        };

        try {
            const response = await axiosPublic.post('/bloodRequest', createRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);

            if (response.data.insertedId) {
                swal({
                    title: 'Blood Donation Request Created',
                    text: 'Your donation request has been successfully created.',
                    icon: 'success',
                });
            }
        } catch (error) {
            console.error(error);
            swal({
                title: 'Error',
                text: 'An error occurred while creating the donation request. Please try again.',
                icon: 'error',
            });
        }
        e.target.reset();
    }

    // *================================



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
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        className="btn btn-sm rounded-md border-black hover:bg-black hover:text-white bg-none text-black"
                                        type="submit"
                                        disabled={singleUser.status === "block"}
                                    >
                                        {singleUser.status === "block" ? "Blocked" : "Request"}
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

export default CreateDonationRequest;
