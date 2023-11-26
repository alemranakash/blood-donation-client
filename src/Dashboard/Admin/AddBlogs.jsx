
import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import swal from 'sweetalert';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const AddBlogs = () => {
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset, formState: { errors },setValue } = useForm();

    const onSubmit = async (data) => {
       
// ********************************

  // image upload to imgbb and then get an url
  const imageFile = { image: data.image[0] }
  const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
          'content-type': 'multipart/form-data'
      }
  });
  console.log(res.data);

// ********************************

const title = data.title
const photoUrl = res.data.data.display_url
const content = data.content

if (res.data.success) {
    // now send the menu item data to the server with the image url
    const blogData = {
       title,  photoUrl, content, blogStatus: 'draft'
    }
    console.log(blogData);
    // 
    const blog = await axiosPublic.post('/blogs', blogData);
    console.log(blog.data)
    if (blog.data.insertedId) {
        swal({
            title: 'Blog Created',
            text: 'Blog has been successfully created.',
            icon: 'success',
        });
    }
    
}




      
    };

    return (
        <div>
            <h1 className='text-4xl text-center'>Add Blogs</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

            {/* title */}
<div className="form-control">
        <label className="label">
            <span className="label-text font-bold text-lg">Title</span>
        </label>
        <input type="title"  {...register("title", { required: true })} name="title" placeholder="title" className="input input-bordered rounded-md" />
                                {errors.title && <span className="text-red-600">Title is required</span>}
      
    </div>


{/* photo url */}
<div className="form-control w-full my-6">
<label className="label">
            <span className="label-text text-lg font-bold">Upload Thumbnail</span>
        </label>
                        <input {...register('image', { required: true })} type="file" className="file-input w-full rounded-md" />
                        {errors.image && <span className="text-red-600">Image is required</span>}
                    </div>

                <div>
                    <label className='font-bold text-lg' htmlFor="content ">Content:</label>
                    <JoditEditor
                        id="content"
                        onChange={(content) => setValue('content', content)}
                    />
                </div>
                <div>
                    <button className='btn btn-primary rounded-md mt-5 flex justify-center mx-auto' type="submit">Create Blog</button>
                </div>
            </form>
        </div>
    );
};

export default AddBlogs;
