// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { bookingService } from "@/service/bookingService";

// export interface Seat {
//   section: number;
//   row: number;
//   seatNumber: number;
// }

// interface BookingHoldRequest {
//   screeningId: string;
//   seats: Seat[];
// }

// interface BookingHoldResponse {
//   holdId: string;
//   expiresAt: string;
//   message: string;
// }

// interface BookingConfirmRequest {
//   screeningId: string;
//   holdId: string;
//   paymentInfo: any;
// }

// export const useGetScreeningDetails = (screeningId: string) => {
//   return useQuery({
//     queryKey: ["screening", screeningId],
//     queryFn: () => bookingService.getScreeningDetails(screeningId),
//     refetchInterval: 5000, // Poll every 5 seconds
//   });
// };

// export const useHoldSeats = () => {
//   return useMutation<BookingHoldResponse, Error, BookingHoldRequest>({
//     mutationFn: (data) => bookingService.holdSeats(data),
//     onError: (error) => {
//       toast.error(error.message || "Failed to hold seats");
//     },
//   });
// };

// export const useConfirmBooking = () => {
//   const queryClient = useQueryClient();

//   return useMutation<any, Error, BookingConfirmRequest>({
//     mutationFn: (data) => bookingService.confirmBooking(data),
//     onSuccess: () => {
//       toast.success("Booking confirmed successfully");
//       queryClient.invalidateQueries({ queryKey: ["screening"] });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to confirm booking");
//     },
//   });
// };
// export const useReleaseHold = () => {
//   return useMutation<any, Error, string>({
//     mutationFn: (holdId) => bookingService.releaseHold(holdId),
//     onSuccess: () => {
//       toast.success("Hold released successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to release hold");
//     },
//   });
// };


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bookingService } from "@/service/bookingService";

export interface Seat {
  section: number;
  row: number;
  seatNumber: number;
}

interface BookingHoldRequest {
  screeningId: string;
  seats: Seat[];
}

interface BookingHoldResponse {
  holdId: string;
  expiresAt: string;
  message: string;
}

interface BookingConfirmRequest {
  screeningId: string;
  holdId: string;
  paymentInfo: any;
}

interface KhaltiPaymentRequest {
  holdId: string;
  returnUrl: string;
  name?: string;
  email?: string;
  mobile?: string;
}

interface KhaltiPaymentResponse {
  payment_url: string;
  pidx: string;
}

interface KhaltiVerifyRequest {
  pidx: string;
}

export const useGetScreeningDetails = (screeningId: string) => {
  return useQuery({
    queryKey: ["screening", screeningId],
    queryFn: () => bookingService.getScreeningDetails(screeningId),
    refetchInterval: 5000, // Poll every 5 seconds
  });
};

export const useHoldSeats = () => {
  return useMutation<BookingHoldResponse, Error, BookingHoldRequest>({
    mutationFn: (data) => bookingService.holdSeats(data),
    onError: (error) => {
      toast.error(error.message || "Failed to hold seats");
    },
  });
};

export const useConfirmBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, BookingConfirmRequest>({
    mutationFn: (data) => bookingService.confirmBooking(data),
    onSuccess: () => {
      toast.success("Booking confirmed successfully");
      queryClient.invalidateQueries({ queryKey: ["screening"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to confirm booking");
    },
  });
};

export const useReleaseHold = () => {
  return useMutation<any, Error, string>({
    mutationFn: (holdId) => bookingService.releaseHold(holdId),
    onSuccess: () => {
      toast.success("Hold released successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to release hold");
    },
  });
};

export const useInitiateKhaltiPayment = () => {
  return useMutation<KhaltiPaymentResponse, Error, KhaltiPaymentRequest>({
    mutationFn: (data) => bookingService.initiateKhaltiPayment(data),
    onError: (error) => {
      toast.error(error.message || "Failed to initiate payment");
    },
  });
};

export const useVerifyKhaltiPayment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, KhaltiVerifyRequest>({
    mutationFn: (data) => bookingService.verifyKhaltiPayment(data),
    onSuccess: () => {
      toast.success("Payment verified successfully");
      queryClient.invalidateQueries({ queryKey: ["screening"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to verify payment");
    },
  });
};

export const useGetKhaltiPaymentStatus = (pidx: string | null) => {
  return useQuery({
    queryKey: ["khalti-payment", pidx],
    queryFn: () => bookingService.getKhaltiPaymentStatus(pidx as string),
    enabled: !!pidx, // Only run if pidx is available
    refetchInterval: 3000, // Poll every 3 seconds while checking payment status
  });
};