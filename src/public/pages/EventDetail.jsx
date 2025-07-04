import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Navbar";
import { useAuth } from "../../Context/AuthContext";

const EventDetail = () => {
  const { id } = useParams();
  const { username } = useAuth();
  const [event, setEvent] = useState(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:3000/api/event/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  useEffect(() => {
    const allJoinedEvents = JSON.parse(
      localStorage.getItem("joinedEvents") || "{}"
    );
    const userEvents = allJoinedEvents[username] || [];
    if (userEvents.includes(id)) {
      setJoined(true);
    }
  }, [id, username]);

  const handleJoinEvent = async () => {
    if (!username) {
      alert("You need to be logged in to join events.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/event/join", {
        eventId: id,
        username: username,
      });
      setJoined(true);
      alert(`You have joined the event: ${event.title}`);
    } catch (error) {
      console.error("Failed to join event:", error);
      alert("Failed to join event, please try again");
    }
  };

  const formatDateTime = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";

  if (!event)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Loading event details...
      </p>
    );

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-8 bg-[#F9EEEE] rounded-lg shadow-lg mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Details */}
          <div className="space-y-8">
            <h1 className="text-5xl font-extrabold text-black-700 leading-tight">
              {event.title}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
              {event.description}
            </p>

            <section className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-100">
              <h2 className="text-2xl font-semibold text-black-700 mb-4 border-b border-purple-300 pb-2">
                Event Details
              </h2>
              <div className="space-y-2 text-gray-800">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {event.date || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Start:</span>{" "}
                  {formatDateTime(event.startDate)}
                </p>
                <p>
                  <span className="font-semibold">End:</span>{" "}
                  {formatDateTime(event.endDate)}
                </p>
              </div>
            </section>

            <section className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-100">
              <h2 className="text-2xl font-semibold text-black-700 mb-4 border-b border-purple-300 pb-2">
                Location & Cost
              </h2>
              <div className="space-y-2 text-gray-800">
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {event.location || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Cost:</span>{" "}
                  {typeof event.cost === "number"
                    ? `Rs. ${event.cost.toFixed(2)}`
                    : "Free"}
                </p>
              </div>
            </section>

            <section className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-100">
              <h2 className="text-2xl font-semibold text-black-700 mb-4 border-b border-purple-300 pb-2">
                Organizer
              </h2>
              <div className="space-y-2 text-gray-800">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {event.organizer?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {event.organizer?.phone || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {event.organizer?.email || "N/A"}
                </p>
              </div>
            </section>

            <div>
              <button
                onClick={handleJoinEvent}
                disabled={joined}
                className={`w-full md:w-auto bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition 
                  ${
                    joined
                      ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                      : "cursor-pointer"
                  }
                `}
              >
                {joined ? "Already Joined" : "Join Event"}
              </button>
            </div>
          </div>

          <div className="relative rounded-lg shadow-lg overflow-hidden max-h-[450px] -mt-100">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default EventDetail;
