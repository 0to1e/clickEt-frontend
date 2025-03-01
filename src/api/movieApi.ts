import { addMovie, fetchMovieBySlug, fetchAllMoviesbyStatus, fetchAllMovies } from "@/service/movieService";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Movie } from "@/interfaces/IMovie";

export const useFetchAllMoviesByStatus = (variant: string) => {
  return useQuery<Movie[], Error>({
    queryKey: ["movies", variant], // Unique key for the query
    queryFn: () => fetchAllMoviesbyStatus(variant), // Use the service function
  });
};
export const useFetchAllMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ["movies"], // Unique key for the query
    queryFn: () => fetchAllMovies(), // Use the service function
  });
};
export const useFetchMovieBySlug = (slug: string) => {
  return useQuery<Movie, Error>({
    queryKey: ["movies", slug], // Unique key for the query
    queryFn: () => fetchMovieBySlug(slug), // Use the service function
  });
};

export const useAddMovie = () => {
  return useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      toast.success("Movie Added Successfully", {
        className: "text-white border-success", // Tailwind classes for success toast
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Adding Movie failed", {
        className: "bg-error text-white border-error", // Tailwind classes for error toast
      });
    },
  });
};
