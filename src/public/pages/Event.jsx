import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Navbar";
import EventCard from "/src/components/Eventcard.jsx";

const EventsSection = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/event/`);
        setEventData(res.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <div className="py-12 px-4 sm:px-16 bg-[#F5EDED] min-h-screen">
        <h2 className="text-center text-sm tracking-widest text-orange-600 font-semibold mb-2">
          EVENTS
        </h2>
        <h1 className="text-center text-3xl sm:text-4xl font-bold mb-10">
          Upcoming Events
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {eventData.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EventsSection;
