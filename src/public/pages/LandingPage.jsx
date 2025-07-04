import { Flower } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token && username) {
      if (username === "admin@gmail.com") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [navigate]);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#fce4ec] via-[#f8e1e1] to-[#fdebd0] flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 md:px-12 py-4">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/logo.png"
            alt="logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold text-gray-900">The Dharma Hub</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={goToSignUp}
            className="bg-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition cursor-pointer"
          >
            Sign Up
          </button>
          <button
            onClick={goToLogin}
            className="bg-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition cursor-pointer"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20 py-16 flex-1">
        {/* Left: Text */}
        <div className="text-center md:text-left max-w-xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
            Begin your path <br /> to inner peace
          </h2>

          <p className="text-lg text-gray-700">
            Discover teachings, mindfulness practices, and a supportive
            community to guide your spiritual journey.
          </p>

          <div className="space-y-3">
            <button className="bg-[#EABFBF] text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-[#d98e8e] transition">
              Explore the Dharma
            </button>
            <p className="text-sm text-gray-600">
              Already a member?{" "}
              <span
                onClick={goToLogin}
                className="underline cursor-pointer text-[#a45b5b]"
              >
                Login here
              </span>
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="mb-10 md:mb-0 md:ml-12">
          <div className="rounded-2xl shadow-xl overflow-hidden">
            <img
              src="/src/assets/monk.png"
              alt="Monks"
              className="w-[280px] md:w-[360px] h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Inspirational Quote */}
      <div className="text-center pb-10 px-4">
        <div className="inline-flex items-center justify-center gap-2 text-gray-700 italic text-lg">
          <Flower className="w-6 h-6 text-[#c97a7a]" />
          <span>
            “Peace comes from within. Do not seek it without.” – Buddha
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
