import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const EventCard = ({ _id, image, date, title, description }) => {
  return (
    <div className="relative group w-full sm:w-80 h-64 overflow-hidden rounded-md shadow-lg cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 backdrop-blur-sm bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center px-4 text-black">
        <div className="bg-white text-black rounded-full p-2 mb-4">
          <Link to={`/event/${_id}`}>
            <FaPlus size={24} />
          </Link>
        </div>
        <p className="text-orange-400 font-semibold">{date}</p>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
