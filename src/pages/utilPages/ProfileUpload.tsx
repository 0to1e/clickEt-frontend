import { useProfileImageUpload } from "@/api/authApi";
import ImageUploader from "@/components/common/ImageUploader";
import { useAuth } from "@/hooks/useAuth";
import { getNameInitials } from "@/utils/getNameInitials";

const ProfileUpload = () => {
  const { user } = useAuth();
  const { mutate: uploadImage, isPending } = useProfileImageUpload();
  return (
    <ImageUploader
      uploadFn={uploadImage}
      imageURL={user?.profile_URL}
      fallbackText={getNameInitials(user?.full_name || "")}
      isUploading={isPending}
      buttonText="Profile Image"
    />
  );
};

export default ProfileUpload;
