import useAuth from "./useAuth";
import useUsers from "./useUsers";


const useRole = () => {
    const { user } = useAuth();
      const [users, loading] = useUsers();
    
      if (loading) {
        console.log("Data is still loading. Please wait...");
        return <div>Loading...</div>;
      }
    
      const currentUser = user;
      const userList = users;
    
      // Find the user in the userList based on email
      const matchedUser = userList.find((u) => u.email === currentUser.email);
    
      // Assuming user has a 'role' property
      const userRole = matchedUser?.role;
    
      const isAdmin = userRole === "admin";
      const isVolunteer = userRole === "volunteer";

return {isAdmin, isVolunteer, matchedUser}
}

export default useRole;