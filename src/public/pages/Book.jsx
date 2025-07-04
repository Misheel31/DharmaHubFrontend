import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Navbar";

const BooksPage = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/book/");
        setBooks(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F8E1E1] p-6">
        <header className="mt-16 mb-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Books
            </h1>
            <div className="flex">
              <input
                type="text"
                placeholder="Search for books"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 rounded-l-md border border-gray-300 w-64"
              />
              <button className="bg-white border border-gray-300 px-3 rounded-r-md">
                🔍
              </button>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.map((book, index) => (
              <Link
                to={`/books/${book._id}`}
                key={index}
                className="bg-white rounded-md shadow-md p-4 flex gap-4 items-start w-l mx-auto hover:shadow-lg transition"
              >
                <img
                  src={book.imageURL}
                  alt={book.title}
                  className="w-[180px] h-[250px] object-cover rounded"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {book.title}
                  </h2>
                  <p className="text-sm italic text-gray-600 mb-2">
                    {book.author && `by ${book.author}`}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {book.description}
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

export default BooksPage;
