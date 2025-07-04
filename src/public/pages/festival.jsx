import axios from "axios";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Navbar";

const Festival = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [festivals, setFestivals] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFestivals = festivals.filter((festival) =>
    festival?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/festival/");
        setFestivals(res.data);
      } catch (error) {
        console.error("Error fetching festivals:", error);
      }
    };

    fetchFestivals();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/festival/${id}`);
  };

  return (
    <>
      <Header />
      <div className="bg-[#F9EEEE] min-h-screen pt-24 py-10 px-6 shadow-2xl text-center">
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left w-full sm:w-auto">
            Festivals
          </h1>

          <div className="relative w-full sm:w-80">
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search for festivals"
              className="border border-gray-300 rounded-md px-10 py-2 w-full shadow-sm focus:outline-none"
            />
            <FiSearch className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Festival Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFestivals.map((festival) => (
            <div
              key={festival._id}
              className="bg-white shadow-l rounded-lg overflow-hidden"
            >
              <img
                src={festival.imageUrl}
                alt={festival.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{festival.title}</h2>
                <p className="text-gray-600 text-sm">{festival.description}</p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => handleReadMore(festival._id)}
                    className="bg-[#EFBDA0] hover:bg-rose-300 text-gray-800 font-medium px-4 py-2 rounded cursor-pointer"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredFestivals.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No festivals found.</p>
        )}
      </div>
    </>
  );
};

export default Festival;
