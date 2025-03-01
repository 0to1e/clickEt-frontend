// api/screeningApi.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createScreening,
  deleteScreening,
  fetchAllScreenings,
} from "@/service/screeningService";
import { toast } from "sonner";


export const useCreateScreening = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createScreening,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screenings"] });
      toast.success("Screening created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to create screening"
      );
    },
  });
};

export const useFetchAllScreenings = () => {
  return useQuery({
    queryKey: ["screenings"],
    queryFn: fetchAllScreenings,
  });
};

export const useDeleteScreening = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteScreening(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screenings"] });
      toast.success("Screening deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete screening"
      );
    },
  });
};


