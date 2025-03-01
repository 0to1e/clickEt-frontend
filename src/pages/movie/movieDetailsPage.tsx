import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { MovieDetailsSkeleton } from "@/components/skeletons/movie";
import { useFetchMovieBySlug } from "@/api/movieApi";
import { useParams } from "react-router-dom";
import { decodeHTMLEntities } from "@/utils/htmlDecoder";

export default function MovieDetails() {
  const { slug } = useParams();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Start muted
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const playerRef = useRef<YT.Player | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState("20 Nov");
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const hasInteracted = useRef<boolean>(false);

  const { data: movie, isLoading } = useFetchMovieBySlug(slug || "");

  // Initialize YouTube Player
  useEffect(() => {
    if (!movie?.trailerURL) return;

    let isApiLoaded = false;

    const initializePlayer = () => {
      const videoId = getYouTubeVideoId(movie.trailerURL!);
      if (!videoId || !playerContainerRef.current) return;

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 0,
          rel: 0,
          showinfo: 0,
          mute: 1, // Start muted to comply with autoplay policies
          enablejsapi: 1,
          loop: 1
        },
        events: {
          onReady: (event) => {
            setIsPlayerReady(true);
            event.target.playVideo();
            setIsPlaying(true);
            // If user has already interacted, unmute the video
            if (hasInteracted.current) {
              event.target.unMute();
              setIsMuted(false);
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo(); // Loop the video
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Load the API if it hasn't been loaded yet
      if (!isApiLoaded) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          isApiLoaded = true;
          initializePlayer();
        };
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        setIsPlayerReady(false);
      }
    };
  }, [movie?.trailerURL]);

  // Handle user interaction and unmute
  useEffect(() => {
    const handleInteraction = () => {
      hasInteracted.current = true;
      if (playerRef.current && isPlayerReady && isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [isPlayerReady, isMuted]);

  // Handle scroll-based video visibility and playback
  useEffect(() => {
    const handleScroll = () => {
      const shouldShowVideo = window.scrollY === 0;
      setShowVideo(shouldShowVideo);

      if (playerRef.current && isPlayerReady) {
        if (shouldShowVideo) {
          playerRef.current.playVideo();
          setIsPlaying(true);
        } else {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlayerReady]);

  // Handle mute/unmute
  const toggleMute = () => {
    if (playerRef.current && isPlayerReady) {
      if (isMuted) {
        playerRef.current.unMute();
        hasInteracted.current = true; // Mark that user has interacted
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (playerRef.current && isPlayerReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getYouTubeVideoId = (url: string) => {
    const decodedUrl = decodeHTMLEntities(url);
    const urlParams = new URLSearchParams(new URL(decodedUrl).search);
    return urlParams.get("v");
  };

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (!movie) {
    return <div className="text-center text-white">Movie not found</div>;
  }

  const dates = [
    { day: "WED", date: "20 Nov", active: true },
    { day: "THU", date: "21 Nov" },
    { day: "FRI", date: "22 Nov" },
    { day: "SAT", date: "23 Nov" },
    { day: "SUN", date: "24 Nov" },
    { day: "MON", date: "25 Nov" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="relative h-[87vh] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {showVideo && movie.trailerURL ? (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black w-full h-full"
            >
              <div ref={playerContainerRef} className="w-full h-full" />
            </motion.div>
          ) : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={movie.posterURL?.lg || "/kanathara.png"}
              alt={movie.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-8 left-24 px-8">
            <motion.h1
              className="text-6xl font-bold mb-4"
              animate={{ scale: isHovered ? 1.12 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {movie.name || "Unknown Movie"}
            </motion.h1>
            <div className="flex gap-4 mt-8">
              <Button variant="default" size="lg">
                Take a seat
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-secondary-foreground"
                onClick={togglePlayPause}
              >
                <Play className="w-4 h-4 mr-2" />
                {isPlaying ? 'Pause trailer' : 'Play trailer'}
              </Button>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-4 right-10 bg-black/50 hover:bg-black/70"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 pt-4 pb-12">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-400">
              {movie.description || "No description available."}
            </p>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Ticket Schedules</h2>
              <div className="flex gap-2 overflow-x-auto pb-4">
                {dates.map(({ day, date }) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    className="flex-col py-8"
                    onClick={() => setSelectedDate(date)}
                  >
                    <span className="text-sm">{day}</span>
                    <span className="text-lg font-semibold">
                      {date.split(" ")[0]}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Select Cinema</h2>
              <Button variant="outline" className="w-full justify-between">
                Cinema XXI Ambarukmo Plaza
                <span className="text-gray-400">▼</span>
              </Button>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Released Year</h3>
              <p>{new Date(movie.releaseDate).getFullYear() || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-2">
                Available Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {[movie.language || "English"].map((lang: string) => (
                  <span key={lang} className="text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Ratings</h3>
              <div className="flex gap-8">
                <div>
                  <div className="font-semibold">IMDb</div>
                  <div className="flex items-center gap-1">
                    {"★★★★☆".split("").map((star, i) => (
                      <span key={i} className="text-yellow-500">
                        {star}
                      </span>
                    ))}
                    <span className="ml-1">4.5</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Streamvibe</div>
                  <div className="flex items-center gap-1">
                    {"★★★★☆".split("").map((star, i) => (
                      <span key={i} className="text-yellow-500">
                        {star}
                      </span>
                    ))}
                    <span className="ml-1">4</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Genres</h3>
              <div className="flex gap-2">
                <span className="text-sm">Action</span>
                <span className="text-sm">Adventure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
