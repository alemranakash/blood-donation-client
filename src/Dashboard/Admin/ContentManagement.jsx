import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBlogs from '../../Hooks/useBlogs';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from "sweetalert2";

const ContentManagement = () => {
  const isVolunteer = true;

  const axiosPublic = useAxiosPublic();
  const [blogs, loading, refetch] = useBlogs();
  const [filter, setFilter] = useState('all'); // 'all', 'draft', 'published'

  if (loading) {
    console.log('Data is still loading. Please wait...');
    return <div>Loading...</div>;
  }

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === 'all') {
      return true;
    }
    return blog.blogStatus === filter;
  });

  // * Publish Button
  const handlePublish = (id) => {
    axiosPublic.patch(`/blogs/publish/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Content Published !`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  // * Unpublish Button
  const handleUnpublish = (id) => {
    axiosPublic.patch(`/blogs/unPublish/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Content Unpublished !`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  // * Delete Button
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to delete Blog ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/blogs/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-end mx-auto">
        <Link to="add-blog" className="text-black btn btn-primary font-bold">
          Add Blogs
        </Link>
      </div>

      <div>
        {/* Filter dropdown */}
        <label htmlFor="filter">Filter by Status:</label>
        <select
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        {/* Displaying filtered blogs in a well-organized table format */}
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Thumbnail</th>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Content</th>
              <th style={tableHeaderStyle}>Blog Status</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id} style={tableRowStyle}>
                <td className='flex mx-auto justify-center' style={tableCellStyle}>
                  {blog.photoUrl && <img className='' src={blog.photoUrl} alt={`Thumbnail for ${blog.title}`} style={{ width: '50px', height: 'auto' }} />}
                </td>
                <td className='text-center' style={tableCellStyle}>{blog.title}</td>
                <td className='text-center' style={tableCellStyle} dangerouslySetInnerHTML={{ __html: blog.content }} />
                <td className='text-center font-semibold uppercase' style={tableCellStyle}>{blog.blogStatus}</td>
                <td className='text-center' style={tableCellStyle}>
                  {isVolunteer ? (
                    <span>Actions not available</span>
                  ) : (
                    <div className="dropdown dropdown-left">
                      <label tabIndex={0} className="btn btn-sm bg-black text-white ">
                        Actions
                      </label>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <div className="flex flex-col items-center justify-center gap-3 mb-2">
                          {blog.blogStatus === 'draft' && (
                            <button 
                              className="bg-blue-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                              onClick={() => handlePublish(blog._id)}>Publish</button>
                          )}
                          {blog.blogStatus === 'published' && (
                            <button 
                              className="bg-green-300 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
                              onClick={() => handleUnpublish(blog._id)}>Unpublish</button>
                          )}
                          <div>
                            <button
                              className="bg-red-300 hover:bg-red-700 text-black font-bold py-2 px-4 rounded"
                              onClick={() => handleDeleteClick(blog._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  background: '#f2f2f2',
  padding: '10px',
  border: '1px solid #ddd',
};

const tableRowStyle = {
  background: '#fff',
  padding: '10px',
  border: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

export default ContentManagement;
