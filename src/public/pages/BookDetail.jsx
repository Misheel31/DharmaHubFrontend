import axios from "axios";
import { useEffect, useState } from "react";
import { FaBookOpen, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Header from "../../components/Navbar";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/book/${id}`);
        setBook(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F8E1E1] flex justify-center items-center">
          <p className="text-gray-600 text-lg">Loading book details...</p>
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F8E1E1] flex justify-center items-center">
          <p className="text-red-600 text-lg">Book not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="h-full bg-[#F8E1E1] pt-32 px-6 pb-12 flex flex-col md:flex-row gap-10 justify-center items-start">
        {/* Book Image */}
        <div className="w-full md:w-[300px] flex justify-center">
          <img
            src={book.imageURL}
            alt={book.title}
            className="w-[370px] h-[450px] object-cover rounded shadow-lg"
          />
        </div>

        <div className="max-w-3xl bg-white p-4 rounded-md">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            {book.title}
          </h1>
          <p className="text-gray-700 font-medium">
            Author: <span className="italic">{book.author}</span>
          </p>
          {book.genre && <p className="text-gray-700">Genre: {book.genre}</p>}
          {book.pages && (
            <p className="text-gray-700 mb-4">Pages: {book.pages}</p>
          )}
          <h2 className="font-semibold text-lg mt-4 mb-1 text-gray-800">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {book.description}
          </p>
          {book.keyTakeaways?.length > 0 && (
            <>
              <h2 className="font-semibold text-lg mt-6 mb-2 text-gray-800">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {book.keyTakeaways.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            {book.readLink && (
              <a
                href={book.readLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-yellow-600 text-white px-5 py-2 text-sm rounded-full font-semibold hover:bg-yellow-700 transition"
              >
                <FaBookOpen />
                Read Now
              </a>
            )}

            {/* {book.downloadLink && (
              <a
                href={book.downloadLink}
                download
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 text-sm rounded-full font-semibold hover:bg-green-700 transition"
              >
                <FaDownload />
                Download
              </a>
            )} */}

            <button className="flex items-center gap-2 bg-red-400 text-white px-5 py-2 text-sm rounded-full font-semibold hover:bg-red-500 transition cursor-pointer">
              <FaHeart />
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailPage;
