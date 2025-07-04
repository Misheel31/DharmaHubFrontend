import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EyesImage from "../../assets/Eye.png";
const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/landing-page", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FCDADA] flex flex-col items-center justify-center text-center">
      <img src={EyesImage} alt="Buddha Eyes" className="w-150 h-full mb-6" />
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
        Embracing Knowledge and Harmony
      </h1>
      <p className="text-md md:text-lg text-gray-700 mt-2">
        Journey Through Wisdom and Growth
      </p>
    </div>
  );
};

export default SplashScreen;
