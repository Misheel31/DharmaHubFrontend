import axios from "axios";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSideBar";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/event/");
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="ml-64 p-8">Loading events...</div>;
  if (error) return <div className="ml-64 p-8 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Event List</h1>

        {events.length === 0 ? (
          <p className="text-gray-600">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow p-6 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-[#BB5288] mb-2">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
