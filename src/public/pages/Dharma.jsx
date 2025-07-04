import { Link } from "react-router-dom";
import Header from "../../components/Navbar";

const dharmaTopics = [
  {
    title: "Introduction to Buddhism",
    description:
      "Discover the basics of Buddhism, its history, and core teaching.",
    image: "../src/assets/Buddha1.png",
  },
  {
    title: "Understanding the Four Noble Truths",
    description:
      "An exploration of the Four Noble Truths and their significance in Buddhist practice.",
    image: "../src/assets/NobleTruth.png",
  },
  {
    title: "The Eightfold Path Explained",
    description:
      "A guide to the Eightfold Path and how to incorporate it into your daily life.",
    image: "../src/assets/eightfold.png",
  },
];

const LearnDharma = () => {
  return (
    <>
      <Header />
      {/* <div className="bg-[#F5EDED] max-h-screen font-sans"> */}
      <div className="flex flex-col sm:flex-row items-stretch bg-[#BB5288]">
        <div className="sm:w-1/3">
          <img
            src="../src/assets/Buddha.png"
            alt="Buddha"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Heading */}
        <div className="flex items-center justify-center sm:w-1/2 p-10 text-white">
          <h1 className="text-4xl sm:text-5xl font-semibold text-center sm:text-left">
            Learn About Dharma
          </h1>
        </div>
      </div>
      {/* Content Cards */}
      <div className="w-full px-6 sm:px- py-12 flex justify-center bg-[#F5EDED]">
        <div className="w-full max-w-screen-l space-y-8">
          {dharmaTopics.map((topic, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row bg-gray-100 p-6 rounded shadow-md"
            >
              <div className="w-full sm:w-1/3 h-64 sm:h-72 mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3">{topic.title}</h3>
                <p className="text-gray-700 text-lg">{topic.description}</p>
                <Link to={`/dharma/${index}`}>
                  <button className="mt-4 bg-[#EFBDA0] hover:bg-[#b4b5f0] text-gray-800 font-medium px-5 py-2 rounded cursor-pointer">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default LearnDharma;
