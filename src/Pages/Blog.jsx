import React from 'react';
import useBlogs from '../Hooks/useBlogs';

const Blog = () => {
  const [blogs, loading] = useBlogs();

  if (loading) {
    console.log('Data is still loading. Please wait...');
    return <div>Loading...</div>;
  }

  // Filter blogs with status "published"
  const publishedBlogs = blogs.filter((blog) => blog.blogStatus === 'published');

  console.log(publishedBlogs);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold my-5">Blogs</h1>
      {publishedBlogs.map((blog) => (
        <div key={blog.id} className="border border-gray-300 rounded-md p-4 mb-4">
         <div className='flex gap-10 '>

         <img src={blog.photoUrl} alt={blog.title} className="w-1/2 flex-1 mb-4 rounded-md" />

         <div className='flex-1'>
         <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className="mb-4" />
         </div>

         </div>
         
        </div>
      ))}
    </div>
  );
};

export default Blog;
