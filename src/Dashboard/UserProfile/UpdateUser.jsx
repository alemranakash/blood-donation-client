import { useParams } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateUser = () => {
    const axiosPublic= useAxiosPublic();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { id } = useParams();
    // console.log(id);
    const [users, loading,] = useUsers();
    // console.log(users);
    const matchingUser = users.find((userData) => userData._id === id);
    useEffect(() => {
        
        if (matchingUser) {
          Object.keys(matchingUser).forEach((key) => {
            setValue(key, matchingUser[key]);
          });
        }
      }, [id, users, setValue, matchingUser]);

// * Update functionality
    const onSubmit = async ( data) => {

         // image upload to imgbb and then get an url
  const imageFile = { image: data.image[0] }
  const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
          'content-type': 'multipart/form-data'
      }
  });
//   console.log(res.data);

// ********************************
      


        const updatedName =data.name 
        
        const updatedPhotoUrl = res.data.data.display_url
   
        const updatedPloodGroup = data.bloodGroup
        const updatedDistrict = data.district
        const updatedUpazila = data.upazila
      

    console.log(updatedName, updatedPhotoUrl, updatedPloodGroup , updatedDistrict, updatedUpazila)

    if (res.data.success) {
        // now send the menu item data to the server with the image url
        const updatedUserData = {
             name: updatedName, 
             photoUrl: updatedPhotoUrl, 
             bloodGroup: updatedPloodGroup, 
             district: updatedDistrict, 
             upazila: updatedUpazila
        }
        // 
        const user = await axiosPublic.patch(`/dashboard/userProfile/updateUser/${matchingUser._id}`, updatedUserData);
        console.log(user.data)
        if (user.data.modifiedCount > 0) {
            swal({
                title: 'User Updated',
                text: 'User updated successfully',
                icon: 'success'
            })
        }
    }



    }
    // *=============================



    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : matchingUser ? (
                <div>
                    <h1>User name: {matchingUser.name}</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="shadow-2xl hover:shadow-cyan-600 rounded px-8 pt-6 pb-8 mb-4">


                      


                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>

                        {/* Photo url
    <div className="form-control">
        <label className="label">
            <span className="label-text">Photo Url</span>
        </label>
        <input type="file" name="photoUrl"  placeholder="Photo URL" className="" required />
    </div> */}


                        <div className="form-control w-full my-6">
                            <input {...register('image', { required: false })} type="file" className="file-input w-full max-w-xs" />
                        </div>



                        {/* Blood Group */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blood group</span>
                            </label>
                            {/* <input type="text" name="photoUrl" placeholder="Photo URL" className="input rounded-md input-bordered" required /> */}

                            <select
                                className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                defaultValue="default" {...register('bloodGroup', { required: true })}

                            >
                                <option disabled value="default">Select a Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>


                        {/* district */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">District</span>
                            </label>
                            {/* <input type="text" name="photoUrl" placeholder="Photo URL" className="input rounded-md input-bordered" required /> */}

                            <select
                                className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                defaultValue="default" {...register('district', { required: true })}

                            >
                                <option disabled value="default">Select a District</option>
                                <option value="Cumilla">Cumilla</option>
                                <option value="Feni">Feni</option>
                                <option value="Brahmanbaria">Brahmanbaria</option>
                                <option value="Rangamati">Rangamati</option>
                                <option value="Noakhali">Noakhali</option>
                            </select>
                        </div>

                        {/* Upazila */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            {/* <input type="text" name="photoUrl" placeholder="Photo URL" className="input rounded-md input-bordered" required /> */}

                            <select
                                className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                defaultValue="default" {...register('upazila', { required: true })}

                            >
                                <option disabled value="default">Select a Upazila</option>
                                <option value="Debidwar">Debidwar</option>
                                <option value="Barura">Barura</option>
                                <option value="Brahmanpara">Brahmanpara</option>
                                <option value="Chandina">Chandina</option>
                                <option value="Chauddagram">Chauddagram</option>
                            </select>
                        </div>


                        <div className="form-control mt-6">
        <button className="btn rounded-md   hover:border-black hover:text-black bg-black text-white">Update User</button>
    </div>



                    </form>
                </div>

            ) : (
                <p>No matching user found.</p>
            )}
        </div>
    );
};

export default UpdateUser;