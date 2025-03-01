import { Movie } from "@/interfaces/movie/IMovie";
import { axiosInstance } from "@/utils/axiosInstance";
import { decodeHTMLEntities } from "@/utils/htmlDecoder";

export const fetchMovies = async (variant: string): Promise<Movie[]> => {
    const url = `/movie/${variant}`;
    const response = await axiosInstance.get(url);
  
    // If the response data is undefined or null, return an empty array
    if (!response.data?.movies) {
      return [];
    }
  
    // Decode HTML entities in the URLs
    const decodedMovies = response.data.movies.map((movie: Movie) => ({
      ...movie,
      posterURL: {
        sm: decodeHTMLEntities(movie.posterURL.sm),
        lg: decodeHTMLEntities(movie.posterURL.lg),
      },
      trailerURL: decodeHTMLEntities(movie.trailerURL),
    }));
  
    return decodedMovies;
  };