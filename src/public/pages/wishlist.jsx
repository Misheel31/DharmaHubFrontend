import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import heartsutraImage from "../../assets/heartsutra.png";
import Header from "../../components/Navbar";

const Wishlist = () => {
  const [wishlistTracks, setWishlistTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please log in to view your wishlist.");
      return;
    }

    fetch(`http://localhost:3000/api/wishlist/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWishlistTracks(data);
        } else {
          console.error("Expected array, got:", data);
          setWishlistTracks([]);
        }
      })
      .catch((error) => console.error("Failed to fetch wishlist:", error))
      .finally(() => setLoading(false));
  }, []);

  const playAudio = (track) => {
    if (currentAudio !== track.audio) {
      setCurrentAudio(track.audio);
      setIsPlaying(true);
      setTimeout(() => {
        audioPlayer.current?.load();
        audioPlayer.current?.play();
      }, 100);
    } else {
      if (audioPlayer.current.paused) {
        audioPlayer.current.play();
        setIsPlaying(true);
      } else {
        audioPlayer.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRemove = async (track) => {
    try {
      await fetch(`http://localhost:3000/api/wishlist/${track._id}`, {
        method: "DELETE",
      });

      setWishlistTracks((prev) =>
        prev.filter((item) => item._id !== track._id)
      );
      alert("Removed from wishlist");
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading wishlist...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-[#F5EDED] min-h-screen pb-24">
        <div className="relative w-full h-[250px] bg-[#F5EDED] flex items-center justify-center pb-6">
          <h1 className="text-4xl font-bold text-gray-800">My Wishlist</h1>
        </div>

        {/* Wishlist Cards */}
        <div className="px-10 mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistTracks.length === 0 ? (
            <p>No wishlist items found.</p>
          ) : (
            wishlistTracks.map((track) => {
              const isThisTrackPlaying =
                currentAudio === track.audio && isPlaying;

              return (
                <div
                  key={track._id}
                  className="bg-white shadow-md rounded-xl overflow-hidden"
                >
                  {/* <div className="w-full h-48 bg-gray-200">
                    <img
                      src={heartsutraImage}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                  </div> */}

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{track.title}</h3>
                      <FaHeart
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleRemove(track)}
                        title="Remove from Wishlist"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {track.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        className="text-purple-700 font-medium"
                        onClick={() => playAudio(track)}
                      >
                        {isThisTrackPlaying ? "⏸ Pause" : "▶ Play"}
                      </button>
                      <span className="text-sm text-gray-500">
                        {typeof track.duration === "number"
                          ? new Date(track.duration * 1000)
                              .toISOString()
                              .substr(14, 5)
                          : track.duration || "00:00"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Audio Player */}
        {currentAudio && (
          <div className="bg-[#f0d7d7] px-6 py-4 shadow fixed bottom-0 w-full z-50">
            <audio
              ref={audioPlayer}
              onEnded={handleEnded}
              controls
              style={{ width: "100%" }}
            >
              <source
                src={`http://localhost:3000/${currentAudio}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
