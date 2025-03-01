import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/shadcn/card";
import { Movie, MovieSectionProps } from "@/interfaces/movie/IMovie";
import { fetchMovies } from "@/api/movieApi";

const MovieSection = ({ variant }: MovieSectionProps) => {
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies", variant], // Unique key for caching
    queryFn: () => fetchMovies(variant),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching movies. Please try again later.</div>;
  }

  // Handle the case where there are no movies
  if (movies.length === 0) {
    return (
      <section className="flex justify-start w-full pl-[10vw]">
        <div className="flex flex-col items-center py-10 gap-12">
          <span className="w-full text-4xl text-primary font-semibold border-l-[6px] pl-2 flex items-center border-primary">
            {variant === "showing" ? "Now Showing" : "Upcoming Movies"}
          </span>
          <div className="text-gray-500 text-lg">
            No {variant === "showing" ? "now showing" : "upcoming"} movies
            available.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-start w-full pl-[10vw]">
      <div className="flex flex-col items-center py-10 gap-12">
        <span className="w-full text-4xl text-primary font-semibold border-l-[6px] pl-2 flex items-center border-primary">
          {variant === "showing" ? "Now Showing" : "Upcoming Movies"}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie: Movie) => (
            <Card key={movie._id}>
              <CardContent
                className="h-full w-[50dvw] max-w-[16rem] min-h-[22rem] rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${movie.posterURL.sm})` }}
              >
                {/* Optional: Add overlay or movie details here */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieSection;
