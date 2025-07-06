import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Navbar";

const AddBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3000/api/blog/create", formData);
      setSuccess("Blog added successfully!");
      setTimeout(() => navigate("/blog"), 1500);
    } catch (err) {
      setError("Failed to add blog. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#F9EEEE] justify-center items-start pt-24 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Add New Blog
          </h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-600 mb-4 text-center">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Content
              </label>
              <textarea
                name="content"
                rows="6"
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition duration-300"
              >
                Submit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogPage;
