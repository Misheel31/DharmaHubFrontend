import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Slider from "../../components/Imageslider";
import Header from "../../components/Navbar";

const Homepage = () => {
  const navigate = useNavigate();

  const goToFestivalPage = () => {
    navigate("/festival");
  };

  const goToDharmaPage = () => {
    navigate("/learnthedharma");
  };

  const goToEventPage = () => {
    navigate("/events");
  };

  return (
    <div className="bg-[#F8E1E1] max-h-screen font-serif flex flex-col shadow">
      <Header />
      {/* Hero Section */}
      <section className="w-full">
        <Slider />
      </section>

      {/* Explore Section */}
      <section className="bg-[#F5EDED] text-center py-10">
        <h2 className="text-2xl font-semibold mb-8">
          Explore Buddhism Through These Paths
        </h2>
        <div className="grid md:grid-cols-3 gap-6 px-6">
          {/* Learn Dharma Card */}
          <div className="bg-[#f1e9f9] p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Learn the Dharma</h3>
            <img
              src="../src/assets/Dharma.png"
              alt="Learn the Dharma"
              className="h-36 w-full object-cover rounded mb-2"
            />
            <p className="text-sm mb-4">
              Discover the fundamental teachings of Buddhism. Explore the Four
              Noble Truths and understand the path to enlightenment.
            </p>
            <button
              onClick={goToDharmaPage}
              className="bg-[#7e5bef] text-white py-1 px-4 rounded  cursor-pointer"
            >
              Learn More
            </button>
          </div>

          {/* Festivals Card */}
          <div className="bg-[#ffe9db] p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">View Festivals</h3>
            <img
              src="../src/assets/festival.png"
              alt="Festival"
              className="h-36 w-full object-cover rounded mb-2"
            />
            <p className="text-sm mb-4">
              Immerse yourself in the rich cultural celebrations and honor
              Buddhist traditions.
            </p>
            <button
              onClick={goToFestivalPage}
              className="bg-[#7e5bef] text-white py-1 px-4 rounded cursor-pointer"
            >
              View Festivals
            </button>
          </div>

          {/* Events Card */}
          <div className="bg-[#e5ddff] p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">View Events</h3>
            <img
              src="../src/assets/events.png"
              alt="Events"
              className="h-36 w-full object-cover rounded mb-2"
            />
            <p className="text-sm mb-4">
              Join dharma talks, and community gatherings.
            </p>
            <button
              onClick={goToEventPage}
              className="bg-[#7e5bef] text-white py-1 px-4 rounded  cursor-pointer"
            >
              View Events
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
