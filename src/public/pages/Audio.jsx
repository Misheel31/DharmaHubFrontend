import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import chantImage from "../../assets/chant.png";
import Header from "../../components/Navbar";
import { useAuth } from "../../Context/AuthContext";

const Audio = () => {
  const { _id: userId, username, isLoggedIn } = useAuth();

  const [audioTracks, setAudioTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [likedTracks, setLikedTracks] = useState({});
  const [resumeTime, setResumeTime] = useState(0);

  const audioPlayer = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/audio")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch audio tracks");
        return res.json();
      })
      .then(setAudioTracks)
      .catch((error) => console.error("Error fetching audio tracks:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!userId) {
      setWishlist([]);
      setLikedTracks({});
      return;
    }

    fetch(`http://localhost:3000/api/wishlist/user/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        return res.json();
      })
      .then((data) => {
        setWishlist(data);
        const likedMap = {};
        data.forEach((item) => {
          likedMap[item._id] = true;
        });
        setLikedTracks(likedMap);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setWishlist([]);
        setLikedTracks({});
      });
  }, [userId]);

  const playAudio = (track) => {
    const isSameTrack = currentAudio === track.audio;

    if (!isSameTrack) {
      setCurrentAudio(track.audio);
      setResumeTime(0);
      setIsPlaying(true);
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

  useEffect(() => {
    if (audioPlayer.current && currentAudio) {
      audioPlayer.current.load();
      audioPlayer.current.currentTime = resumeTime;
      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  }, [currentAudio, isPlaying, resumeTime]);

  const toggleLike = async (track) => {
    if (!isLoggedIn || !userId) {
      alert("Please login to add to wishlist");
      return;
    }

    const existingItem = wishlist.find(
      (item) => item.audio === track.audio && item.title === track.title
    );

    if (existingItem) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/wishlist/${existingItem._id}`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) throw new Error("Failed to remove from wishlist");

        setWishlist((prev) =>
          prev.filter((item) => item._id !== existingItem._id)
        );
        setLikedTracks((prev) => {
          const copy = { ...prev };
          delete copy[existingItem._id];
          return copy;
        });
        alert("Removed from wishlist");
      } catch (error) {
        console.error("Failed to remove from wishlist:", error);
        alert("Could not remove from wishlist.");
      }
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/wishlist/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: track.title,
            description: track.description,
            audio: track.audio.replace(/\\/g, "/"),
            imageUrl: track.imageUrl || "",
            userId,
          }),
        });

        if (!res.ok) throw new Error("Failed to add to wishlist");

        const newItem = await res.json();
        setWishlist((prev) => [...prev, newItem]);
        setLikedTracks((prev) => ({ ...prev, [newItem._id]: true }));
        alert("Added to wishlist!");
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
        alert("Could not add to wishlist.");
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setResumeTime(0);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-[#F5EDED] min-h-screen pb-24">
        <div className="relative w-full h-[500px] overflow-hidden">
          <img
            src={chantImage}
            alt="Chant and Meditate"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-8 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audioTracks.map((track, index) => {
            const isThisTrackPlaying =
              currentAudio === track.audio && isPlaying;
            const isLiked = likedTracks[track._id];

            return (
              <div
                key={track._id || index}
                className="bg-white shadow rounded-xl overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{track.title}</h3>
                    <FaHeart
                      className={`cursor-pointer transition ${
                        isLiked ? "text-red-500" : "text-gray-400"
                      }`}
                      onClick={() => toggleLike(track)}
                      title={
                        isLiked ? "Remove from Wishlist" : "Add to Wishlist"
                      }
                    />
                  </div>
                  <p className="text-sm text-gray-600">{track.description}</p>
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
                        : track.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {currentAudio && (
          <div className="bg-[#f0d7d7] px-6 py-4 shadow fixed bottom-0 w-full">
            <audio
              ref={audioPlayer}
              onEnded={handleEnded}
              controls
              className="w-full"
              onLoadedMetadata={() => {
                if (audioPlayer.current && resumeTime > 0) {
                  audioPlayer.current.currentTime = resumeTime;
                }
              }}
            >
              <source
                src={`http://localhost:3000/${currentAudio.replace(
                  /\\/g,
                  "/"
                )}`}
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

export default Audio;
