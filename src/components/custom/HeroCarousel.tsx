import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const images = [
  "https://picsum.photos/id/337/1920/1080",
  "https://picsum.photos/id/338/1920/1080",
  "https://picsum.photos/id/339/1920/1080",
  "https://picsum.photos/id/340/1920/1080",
  "https://picsum.photos/id/341/1920/1080",
];

const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds
const USER_INACTIVITY_TIMEOUT = 5000; // 10 seconds

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, []);

  const handleUserInteraction = useCallback(() => {
    setIsAutoScrolling(false);
    setLastInteractionTime(Date.now());
  }, []);

  useEffect(() => {
    let autoScrollTimer: NodeJS.Timeout;
    let userInactivityTimer: NodeJS.Timeout;

    if (isAutoScrolling) {
      autoScrollTimer = setInterval(nextSlide, AUTO_SCROLL_INTERVAL);
    } else {
      userInactivityTimer = setTimeout(() => {
        if (Date.now() - lastInteractionTime >= USER_INACTIVITY_TIMEOUT) {
          setIsAutoScrolling(true);
        }
      }, USER_INACTIVITY_TIMEOUT);
    }

    return () => {
      clearInterval(autoScrollTimer);
      clearTimeout(userInactivityTimer);
    };
  }, [isAutoScrolling, lastInteractionTime, nextSlide]);

  return (
    <div className="relative w-screen h-[80vh] overflow-hidden">
      <div className="w-full h-full overflow-hidden">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute top-0 w-full h-full transition-transform duration-1000 ease-in-out ${
              index === currentIndex
                ? "left-0"
                : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            {" "}
            <Link to={"/register"}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-md hover:bg-primary transition-all duration-300"
        onClick={() => {
          handleUserInteraction();
          prevSlide();
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-md hover:bg-primary transition-all duration-300"
        onClick={() => {
          handleUserInteraction();
          nextSlide();
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
