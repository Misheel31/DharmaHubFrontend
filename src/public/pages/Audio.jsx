import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import chantImage from "../../assets/chant.png";
import Header from "../../components/Navbar";

const Audio = () => {
  const [audioTracks, setAudioTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [likedTracks, setLikedTracks] = useState({});
  const [resumeTime, setResumeTime] = useState(0);
  const [username, setUsername] = useState(null);

  const audioPlayer = useRef(null);

  // Get logged-in username
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername);
  }, []);

  // Fetch audio tracks
  useEffect(() => {
    fetch("http://localhost:3000/api/audio")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch audio tracks");
        return res.json();
      })
      .then((data) => setAudioTracks(data))
      .catch((error) => console.error("Error fetching audio tracks:", error))
      .finally(() => setLoading(false));
  }, []);

  // Restore last audio state per user
  useEffect(() => {
    if (!username) {
      // No user logged in: clear audio state
      setCurrentAudio(null);
      setResumeTime(0);
      setIsPlaying(false);
      return;
    }

    const savedAudio = localStorage.getItem(`currentAudio_${username}`);
    const savedTime = parseFloat(
      localStorage.getItem(`currentTime_${username}`)
    );
    const wasPlaying = localStorage.getItem(`isPlaying_${username}`) === "true";

    if (savedAudio) {
      setCurrentAudio(savedAudio);
      setResumeTime(isNaN(savedTime) ? 0 : savedTime);
      setIsPlaying(wasPlaying);
    } else {
      // No saved data for this user
      setCurrentAudio(null);
      setResumeTime(0);
      setIsPlaying(false);
    }
  }, [username]);

  // When resumeTime or currentAudio changes, update the audio player's currentTime
  useEffect(() => {
    if (audioPlayer.current && currentAudio) {
      audioPlayer.current.currentTime = resumeTime;
    }
  }, [resumeTime, currentAudio]);

  // Save audio state per user every second
  useEffect(() => {
    if (!username) return; // don't save if no user

    const saveAudioState = () => {
      if (audioPlayer.current) {
        localStorage.setItem(`currentAudio_${username}`, currentAudio || "");
        localStorage.setItem(
          `currentTime_${username}`,
          audioPlayer.current.currentTime
        );
        localStorage.setItem(`isPlaying_${username}`, isPlaying);
      }
    };
    const interval = setInterval(saveAudioState, 1000);
    return () => clearInterval(interval);
  }, [currentAudio, isPlaying, username]);

  // Wishlist per user
  useEffect(() => {
    if (!username) {
      setWishlist([]);
      return;
    }

    const savedWishlist = JSON.parse(
      localStorage.getItem(`wishlist_${username}`) || "[]"
    );
    setWishlist(savedWishlist);
  }, [username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`wishlist_${username}`, JSON.stringify(wishlist));
    }
  }, [wishlist, username]);

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

  // Ensure new audio is loaded before playing
  useEffect(() => {
    if (audioPlayer.current && currentAudio) {
      audioPlayer.current.load();
      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  }, [currentAudio]);

  const toggleLike = async (track) => {
    if (!username) {
      alert("Please login to add to wishlist");
      return;
    }

    const isLiked = likedTracks[track._id];

    setLikedTracks((prev) => ({
      ...prev,
      [track._id]: !isLiked,
    }));

    if (isLiked) {
      const itemToRemove = wishlist.find((item) => item._id === track._id);
      if (itemToRemove) {
        try {
          await fetch(
            `http://localhost:3000/api/wishlist/${itemToRemove._id}`,
            {
              method: "DELETE",
            }
          );
          setWishlist((prev) => prev.filter((item) => item._id !== track._id));
          alert("Removed from wishlist");
        } catch (error) {
          console.error("Failed to remove from wishlist:", error);
        }
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
            audio: track.audio,
            imageUrl: track.imageUrl,
            username,
          }),
        });

        const newItem = await res.json();
        setWishlist((prev) => [...prev, newItem]);
        alert("Added to wishlist!");
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (username) {
      localStorage.removeItem(`isPlaying_${username}`);
      localStorage.removeItem(`currentTime_${username}`);
    }
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

        {/* Show audio player only if user logged in AND there is an audio playing */}
        {username && currentAudio && (
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

export default Audio;
