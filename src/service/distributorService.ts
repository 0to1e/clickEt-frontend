import { ImageUploadResponse } from "@/interfaces/auth/IImage";
import { DistributorBase, DistributorLogoRequest, GetAllDistributorsResponse } from "@/interfaces/distributor/Idistributor";
import { axiosInstance } from "@/utils/axiosInstance";




export async function addDistributor(credentials: DistributorBase) {
  const { data } = await axiosInstance.post("/distributor/add", credentials);
  return data;
}

export const fetchDistributorByName = async (): Promise<GetAllDistributorsResponse> => {
  const url = "/distributor/getAll";
  const response = await axiosInstance.get(url);

  return response.data.distriutor;
};


export const uploadDistributorLogo = async ({
  image,
  currentImageUrl,
  distributorId,
}: DistributorLogoRequest): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("distributorId", distributorId);
  if (currentImageUrl) {
    formData.append("currentImageUrl", currentImageUrl);
  }
  
  const response = await axiosInstance.post<ImageUploadResponse>(
    "/distributor/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};
