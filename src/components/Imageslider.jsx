import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/assets/image.png",
      heading: (
        <blockquote className="text-4xl italic px-6 text-black max-w-xl mx-auto md:mx-0">
          “Peace comes from within.
          <br />
          Do not seek it Without.”
          <br />
          <span className="text-sm not-italic">- Buddha</span>
        </blockquote>
      ),
    },
    {
      image: "/assets/slider1.png",
      heading: (
        <blockquote className="text-4xl italic px-6 text-black max-w-xl mx-auto md:mx-0">
          “Experience the vibrant <br />
          celebrations of Buddhist culture.”
          <br />
          <span className="text-sm not-italic">- Buddha</span>
        </blockquote>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] flex bg-[#E99D9E] overflow-hidden rounded-md shadow-md">
      {/* Left Image */}
      <div
        className="w-3/5 h-full bg-center bg-cover"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      ></div>

      {/* Right Text Overlay */}
      <div className="w-3/5 flex items-center px-6  bg-opacity-50 text-black">
        {slides[currentSlide].heading}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-4xl text-black opacity-75 hover:opacity-100 transition cursor-pointer z-10"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <IoIosArrowBack />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-4xl text-black opacity-75 hover:opacity-100 transition cursor-pointer z-10"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Slider;
