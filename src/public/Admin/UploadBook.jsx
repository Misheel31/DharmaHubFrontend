import axios from "axios";
import { useState } from "react";
import AdminSidebar from "../Admin/AdminSideBar";

const CreateBookPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    pages: "",
    description: "",
    imageURL: "",
    readLink: "",
    downloadLink: "",
    keyTakeaways: "",
  });

  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      ...formData,
      pages: Number(formData.pages),
      keyTakeaways: formData.keyTakeaways
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    try {
      await axios.post("http://localhost:3000/api/book/create", bookData);
      setMessage("Book uploaded successfully!");
      setFormData({
        title: "",
        author: "",
        genre: "",
        pages: "",
        description: "",
        imageURL: "",
        readLink: "",
        downloadLink: "",
        keyTakeaways: "",
      });
    } catch (err) {
      setMessage("Error uploading book.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Upload a New Book
        </h1>

        {message && <p className="mb-4 text-blue-700 font-medium">{message}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 max-w-3xl"
        >
          {[
            { label: "Title", name: "title" },
            { label: "Author", name: "author" },
            { label: "Genre", name: "genre" },
            { label: "Pages", name: "pages", type: "number" },
            { label: "Image URL", name: "imageURL" },
            { label: "Read Link", name: "readLink" },
            { label: "Download Link", name: "downloadLink" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Key Takeaways (one per line)
            </label>
            <textarea
              name="keyTakeaways"
              rows="4"
              value={formData.keyTakeaways}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-pink-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Upload Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookPage;
