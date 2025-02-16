import { addDistributor, uploadDistributorLogo } from "@/service/distributorService";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { DistributorLogoRequest } from "@/interfaces/distributor/Idistributor";

export const useAddDistributor = () => {
  return useMutation({
    mutationFn: addDistributor,
    onSuccess: () => {
      toast.success("Distributor Added Successfully", {
        className: "text-white border-success",
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Adding Distributor failed", {
        className: "bg-error text-white border-error",
      });
    },
  });
};


export const useDistributorLogoUpload = () => {
  return useMutation({
    mutationFn: (request: DistributorLogoRequest) => uploadDistributorLogo(request),
    onSuccess: () => {
      toast.success("Image uploaded successfully", {
        className: "text-white border-success",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
    onError: (error: any) => {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Upload failed");
    },
  });
};