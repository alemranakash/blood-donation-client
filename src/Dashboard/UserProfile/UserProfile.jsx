
// import { Link } from "react-router-dom";
// import useAuth from "../../Hooks/useAuth";
// import useUsers from "../../Hooks/useUsers";

// const UserProfile = () => {
//   const { user } = useAuth();
//   const [users, loading, ] = useUsers();

//   console.log(users);
//   console.log(user.email);

//   // Find the user whose email matches the authenticated user's email
//   const matchingUser = users.find(userData => userData.email === user.email);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {matchingUser ? (
//             <div>
              
//                  <img className="w-36 rounded-md mt-10" src={matchingUser.photoUrl} alt="" />
//               <h1 className="">Email: {matchingUser.email}</h1>
//               <h1>Name: {matchingUser.name}</h1>
             
//               <h1>District: {matchingUser.district}</h1>
//               <h1>Upazila: {matchingUser.upazila}</h1>
//               <h1>Blood Group: {matchingUser.bloodGroup}</h1>

//               <Link to={`updateUser/${matchingUser._id}`}>
//            <button className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black">Update</button>
//            </Link>

//             </div>
//           ) : (
//             <p>No matching user found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;






import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";

const UserProfile = () => {
  const { user } = useAuth();
  const [users, loading] = useUsers();

  console.log(users);
  console.log(user.email);

  // Find the user whose email matches the authenticated user's email
  const matchingUser = users.find(userData => userData.email === user.email);

  return (
    <div className="container mx-auto my-10 p-8 bg-white shadow-lg rounded-md">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-center">
          {matchingUser ? (
            <div>
              <img className="w-36 h-36 rounded-full mx-auto mt-10" src={matchingUser.photoUrl} alt="" />
              <h1 className="text-3xl font-bold mt-4">Email: {matchingUser.email}</h1>
              <h1 className="text-xl">Name: {matchingUser.name}</h1>
              <h1 className="text-xl">District: {matchingUser.district}</h1>
              <h1 className="text-xl">Upazila: {matchingUser.upazila}</h1>
              <h1 className="text-xl">Blood Group: {matchingUser.bloodGroup}</h1>

              <Link to={`updateUser/${matchingUser._id}`}>
                <button className="mt-6 px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
                  Update
                </button>
              </Link>
            </div>
          ) : (
            <p className="text-red-500 mt-4">No matching user found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
