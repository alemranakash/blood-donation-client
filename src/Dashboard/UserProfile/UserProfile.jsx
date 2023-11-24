
// import useAuth from "../../Hooks/useAuth";
// import useUsers from "../../Hooks/useUsers";

// const UserProfile = () => {
//   const { user } = useAuth();
//   const [users] = useUsers();

//   console.log(users);
//   console.log(user.email);

//   // Find the user whose email matches the authenticated user's email
//   const matchingUser = users.find(userData => userData.email === user.email);
// // console.log(matchingUser);

//   return (
//     <div>
//       <h1>User Email: {matchingUser.email}</h1>
//       <h1>User Name: {matchingUser.name}</h1>
     
//     </div>
//   );
// };

// export default UserProfile;





import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";

const UserProfile = () => {
  const { user } = useAuth();
  const [users, loading, ] = useUsers();

  console.log(users);
  console.log(user.email);

  // Find the user whose email matches the authenticated user's email
  const matchingUser = users.find(userData => userData.email === user.email);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {matchingUser ? (
            <div>
                 <img className="w-36 rounded-md mt-10" src={matchingUser.photoUrl} alt="" />
              <h1 className="">Email: {matchingUser.email}</h1>
              <h1>Name: {matchingUser.name}</h1>
             
              <h1>District: {matchingUser.district}</h1>
              <h1>Upazila: {matchingUser.upazila}</h1>
              <h1>Blood Group: {matchingUser.bloodGroup}</h1>

              <Link to={`updateUser/${matchingUser._id}`}>
           <button className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black">Update</button>
           </Link>

            </div>
          ) : (
            <p>No matching user found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

