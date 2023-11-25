import  { useState } from 'react';
import useUsers from "../../Hooks/useUsers";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from "sweetalert2";




const AllUsers = () => {
    const axiosPublic = useAxiosPublic();
  const [users, loading, refetch] = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all'); // Default to 'all'
  const itemsPerPage = 5;

  if (loading) {
    console.log("Data is still loading. Please wait...");
    return <div>Loading...</div>;
  }

  // Filter users based on the selected status
  const filteredUsers = selectedStatus === 'all'
    ? users
    : users.filter(user => user.status === selectedStatus);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the users to display on the current page
  const usersOnCurrentPage = filteredUsers.slice(startIndex, endIndex);

// * block button 
const handleBlock = (id) => {
console.log(id);
axiosPublic.patch(`/allUsers/block/${id}`).then((res) => {
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `User Blocked !`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch()
    }
  });
}
// * Unblock button 
const handleUnblock = (id) => {
console.log(id);
axiosPublic.patch(`/allUsers/unBlock/${id}`).then((res) => {
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `User Unblocked !`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch()
    }
  });
}
// * Make Volunteer button 
const handleMakeVolunteer = (id) => {
console.log(id);
axiosPublic.patch(`/allUsers/makeVolunteer/${id}`).then((res) => {
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `SuccessFully make Volunteer !`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch()
    }
  });
}
// * Make Admin button 
const handleMakeAdmin = (id) => {
console.log(id);
axiosPublic.patch(`/allUsers/makeAdmin/${id}`).then((res) => {
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `SuccessFully make Admin !`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch()
    }
  });
}




  return (
    <div>
      <h1 className="text-4xl text-center mb-10">All Users</h1>

      {/* Status filter dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userStatus">
          Filter by User Status
        </label>
        <select
          className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="userStatus"
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1); // Reset to the first page when changing status
          }}
          value={selectedStatus}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="block">Blocked</option>
        </select>
      </div>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Avater</th>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Status</th>
            <th className="border border-gray-200 p-2">Role</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersOnCurrentPage.map((user) => (
            <tr key={user.id} className="border border-gray-200">
              <td className="border justify-center mx-auto flex border-gray-200 p-2">
                <img
                  src={user.photoUrl}
                  alt={`Avatar of ${user.name}`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>
              <td className="border text-center border-gray-200 p-2">{user.name}</td>
              <td className="border text-center border-gray-200 p-2">{user.email}</td>
              <td className="border text-center font-bold uppercase border-gray-200 p-2">{user.status}</td>
              <td className="border text-center font-bold uppercase border-gray-200 p-2">{user.role}</td>
              <td className="border text-center  border-gray-200 p-2 space-x-2">
                <div className="dropdown dropdown-left">
                  <label tabIndex={0} className="btn btn-sm bg-black text-white ">
                    Actions
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleBlock(user._id)}
                            >
                              Block
                            </button>
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleUnblock(user._id)}
                            >
                              Unblock
                            </button>
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleMakeVolunteer(user._id)}
                            >
                              Make Volunteer
                            </button>
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleMakeAdmin(user._id)}
                            >
                              Make admin
                            </button>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 px-4 py-2 border rounded ${
              currentPage === index + 1 ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;


















