// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Header from "../../components/Navbar";

// const BlogDetailPage = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/blog/${id}`)
//       .then((res) => {
//         setBlog(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Error fetching blog details.");
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <>
//         <Header />
//         <div className="min-h-screen flex items-center justify-center pt-28">
//           <p>Loading...</p>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Header />
//         <div className="min-h-screen flex items-center justify-center pt-28 text-red-500">
//           <p>{error}</p>
//         </div>
//       </>
//     );
//   }

//   if (!blog) {
//     return (
//       <>
//         <Header />
//         <div className="min-h-screen flex items-center justify-center pt-28">
//           <p>Blog not found.</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="bg-gradient-to-br from-[#fff0f0] to-[#ffe5d9] min-h-screen w-full pt-28 px-4">
//         <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-full">
//           <img
//             src={blog.imageUrl}
//             alt={blog.title}
//             className="w-full h-100 object-cover"
//           />
//           <div className="p-8">
//             <p className="text-sm text-gray-400 mb-2">
//               {new Date(blog.date).toLocaleDateString()}
//             </p>
//             <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
//               {blog.title}
//             </h1>
//             <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

//             <Link
//               to="/blog"
//               className="inline-block mt-8 text-pink-500 hover:text-pink-600 font-medium"
//             >
//               ← Back to Blog
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogDetailPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Navbar";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching blog details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-28">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-28 text-red-500">
          <p>{error}</p>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-28">
          <p>Blog not found.</p>
        </div>
      </>
    );
  }

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const contentPreview = blog.content.slice(0, 300);

  return (
    <>
      <Header />
      <div className="bg-[#F9EEEE] min-h-screen w-full pt-28 px-6 pb-12">
        <div className="max-w-6xl mx-auto bg-white border border-gray-300 shadow-xl rounded-lg overflow-hidden md:grid md:grid-cols-2">
          {/* Left Side: Image */}
          <div className="h-full">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-[480px] object-cover md:rounded-l-lg"
            />
          </div>

          {/* Right Side: Book style content */}
          <div
            className="p-12 font-serif leading-relaxed text-gray-900 max-h-[480px] overflow-y-auto
            bg-[#FFFAF0] border-l-8 border-[#E6D7B9] shadow-inner
            "
            style={{ boxShadow: "inset 10px 0 15px -10px rgba(0,0,0,0.1)" }}
          >
            <p className="text-sm text-gray-500 mb-3">
              {new Date(blog.date).toLocaleDateString()}
            </p>
            <h1 className="text-4xl font-bold mb-8">{blog.title}</h1>
            <p className="whitespace-pre-line text-lg">
              {showFullContent ? blog.content : contentPreview}
              {blog.content.length > 300 && (
                <span
                  onClick={toggleContent}
                  className="text-blue-700 cursor-pointer hover:underline ml-2"
                >
                  {showFullContent ? "Show less" : "... Read more"}
                </span>
              )}
            </p>

            <Link
              to="/blog"
              className="inline-block mt-8 text-pink-500 hover:text-pink-600 font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
