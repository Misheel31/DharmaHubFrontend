import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
    video: "",
    organizer: {
      name: "",
      phone: "",
      email: "",
    },
    startDate: "",
    endDate: "",
    cost: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("organizer.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        organizer: {
          ...prev.organizer,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3000/api/event/create", formData);
      setSuccess("Event created successfully!");
      setTimeout(() => navigate("/EventList"), 1500);
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F3F3]">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8 pt-20">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold mb-6 text-pink-600">
            Create New Event
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <input
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
            <input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />

            {/* Dates */}
            <div className="flex gap-4">
              <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-md"
              />
              <input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-md"
              />
            </div>

            {/* Media */}
            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
            <input
              name="video"
              placeholder="Video URL (optional)"
              value={formData.video}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />

            {/* Cost */}
            <input
              name="cost"
              type="number"
              placeholder="Cost (0 if free)"
              value={formData.cost}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />

            {/* Organizer Info */}
            <h3 className="text-xl font-semibold mt-6 mb-2">
              Organizer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="organizer.name"
                placeholder="Name"
                value={formData.organizer.name}
                onChange={handleChange}
                required
                className="border p-2 rounded-md"
              />
              <input
                name="organizer.phone"
                placeholder="Phone"
                value={formData.organizer.phone}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
              <input
                name="organizer.email"
                placeholder="Email"
                value={formData.organizer.email}
                onChange={handleChange}
                required
                className="border p-2 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600"
            >
              Submit Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
