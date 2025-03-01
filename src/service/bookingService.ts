// import { axiosInstance } from "@/utils/axiosInstance";
// import { Seat } from "@/api/bookingApi";

// interface ScreeningDetails {
//   _id: string;
//   seatGrid: any[][];
//   finalPrice: number;
//   // Add other screening details as needed
// }

// export const bookingService = {
//   getScreeningDetails: async (
//     screeningId: string
//   ): Promise<ScreeningDetails> => {
//     const response = await axiosInstance.get(`/screening/${screeningId}`);
//     console.log("🚀 ~ getScreeningDetails: ~ response :", response.data);
//     return response.data;
//   },

//   holdSeats: async (data: { screeningId: string; seats: Seat[] }) => {
//     const response = await axiosInstance.post("/booking/hold", data);
//     return response.data;
//   },

//   confirmBooking: async (data: {
//     screeningId: string;
//     holdId: string;
//     paymentInfo: any;
//   }) => {
//     const response = await axiosInstance.post("/booking/confirm", data);
//     return response.data;
//   },

//   downloadTicket: async (): Promise<string> => {
//     try {
//       const response = await axiosInstance.post(
//         "/booking/download",
//         {},
//         {
//           responseType: "blob",
//         }
//       );

//       // Create a URL for the PDF blob
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       return url;
//     } catch (error) {
//       console.error("Error confirming booking:", error);
//       throw new Error("Failed to download ticket");
//     }
//   },

//   releaseHold: async (holdId: string) => {
//     const response = await axiosInstance.delete(
//       `/booking/hold/release/${holdId}`
//     );
//     return response.data;
//   },
// };



import { axiosInstance } from "@/utils/axiosInstance";
import { Seat } from "@/api/bookingApi";

interface ScreeningDetails {
  _id: string;
  seatGrid: any[][];
  finalPrice: number;
  // Add other screening details as needed
}

export const bookingService = {
  getScreeningDetails: async (
    screeningId: string
  ): Promise<ScreeningDetails> => {
    const response = await axiosInstance.get(`/screening/${screeningId}`);
    console.log("🚀 ~ getScreeningDetails: ~ response :", response.data);
    return response.data;
  },

  holdSeats: async (data: { screeningId: string; seats: Seat[] }) => {
    const response = await axiosInstance.post("/booking/hold", data);
    return response.data;
  },

  confirmBooking: async (data: {
    screeningId: string;
    holdId: string;
    paymentInfo: any;
  }) => {
    const response = await axiosInstance.post("/booking/confirm", data);
    return response.data;
  },

  downloadTicket: async (): Promise<string> => {
    try {
      const response = await axiosInstance.post(
        "/booking/download",
        {},
        {
          responseType: "blob",
        }
      );

      // Create a URL for the PDF blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      return url;
    } catch (error) {
      console.error("Error downloading ticket:", error);
      throw new Error("Failed to download ticket");
    }
  },

  releaseHold: async (holdId: string) => {
    const response = await axiosInstance.delete(
      `/booking/hold/release/${holdId}`
    );
    return response.data;
  },

  initiateKhaltiPayment: async (data: { 
    holdId: string;
    returnUrl: string;
    name?: string;
    email?: string;
    mobile?: string;
  }) => {
    const response = await axiosInstance.post("/payments/khalti/initiate", data);
    return response.data;
  },

  verifyKhaltiPayment: async (data: { pidx: string }) => {
    const response = await axiosInstance.post("/payments/khalti/verify", data);
    return response.data;
  },

  getKhaltiPaymentStatus: async (pidx: string) => {
    const response = await axiosInstance.get(`/payments/khalti/status/${pidx}`);
    return response.data;
  }
};
