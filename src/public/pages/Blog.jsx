import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Navbar";

const AddBlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/blog/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-[#fff0f0] to-[#ffe5d9] min-h-screen pt-28 px-4">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 max-w-full">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
              Blog
            </h1>
            <a
              href="/add-blog"
              className="inline-block bg-pink-400 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition duration-300"
            >
              + Add Blog
            </a>
          </div>
          <div className="flex flex-col space-y-6 w-full">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl p-6 flex items-start space-x-6 shadow-md hover:shadow-lg transition duration-300 w-full min-h-[280px]"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-60 h-60 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {blog.content}
                  </p>
                  <a
                    href={`/blog/${blog._id}`}
                    className="text-pink-500 hover:text-pink-600 font-medium"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="text-center text-gray-500 mt-16">
              No blog posts available. Add a new one!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddBlogPage;
