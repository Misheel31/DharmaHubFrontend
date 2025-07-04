import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Navbar";
import { useAuth } from "../../Context/AuthContext";

const JoinedEvents = () => {
  const { username } = useAuth();
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchJoinedEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/event/join/${username}`
        );
        setEventsData(res.data);
      } catch (err) {
        console.error("Failed to load joined events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [username]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Loading joined events...
      </p>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-[#F9EEEE] w-full min-h-screen pt-24 px-6">
        <h1 className="text-3xl font-bold mb-6">Your Joined Events</h1>

        {eventsData.length === 0 ? (
          <p className="text-gray-600">You haven’t joined any events yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventsData.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-70 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                  <p className="text-gray-600 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default JoinedEvents;
