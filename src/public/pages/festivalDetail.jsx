import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Navbar";

const FestivalDetail = () => {
  const { id } = useParams();
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/festival/${id}`);
        setFestival(res.data);
      } catch (error) {
        console.error("Error fetching festival:", error);
      }
    };

    fetchFestival();
  }, [id]);

  if (!festival) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <>
      <Header />

      <div className="w-full bg-white p-6 rounded-lg shadow-xl">
        <img
          src={festival.imageUrl}
          alt={festival.title}
          className="w-full h-[400px] object-cover rounded mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{festival.title}</h1>
        <p className="text-gray-700 text-lg text-justify">
          {festival.fullDescription}
        </p>
        <Link
          to="/festival"
          className="inline-block mt-8 text-pink-500 hover:text-pink-600 font-medium"
        >
          ← Back to Festival
        </Link>
      </div>
    </>
  );
};

export default FestivalDetail;
