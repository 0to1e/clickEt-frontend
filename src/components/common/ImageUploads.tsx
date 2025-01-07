import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Button } from "@/components/shadcn/button";
import { Card } from "@/components/shadcn/card";
import { Upload, X } from "lucide-react";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import { getNameInitials } from "@/utils/getNameInitials";

const ImageUploader = () => {
  const { user } = useAuth();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  // Handle drop events
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) setImage(file);
  };

  // Handle file input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) setImage(file);
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axiosInstance.post("/auth/user/updateimage", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 200) {
        alert("Profile image uploaded successfully!");
        setImage(null);
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Handle image removal
  const handleRemove = () => {
    setImage(null);
    setDragActive(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 h-96 flex flex-col items-center justify-center gap-12 p-6">
        <div
          className={`relative w-64 h-64 rounded-full overflow-hidden ${
            dragActive ? 'before:absolute before:inset-0 before:rounded-full before:border-4 before:border-primary before:animate-pulse before:z-10' : ''
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          
          {!image && user?.profile_URL === "null" && (
            <div className="w-full h-full bg-primary center text-white text-8xl">
              {getNameInitials(user?.full_name || "")}
            </div>
          )}
          
          {!image && user?.profile_URL && user.profile_URL !== "null" && (
            <img
              src={user.profile_URL}
              alt={user.full_name}
              className="w-full h-full object-cover"
            />
          )}
          
          {image && (
            <div className="relative w-full h-full">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div
            className="absolute inset-0 flex items-center justify-center bg-primary/0 hover:bg-primary/80 transition-colors group cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <div className="opacity-0 group-hover:opacity-100 text-white text-center p-4">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <p>Drop image here or click to upload</p>
            </div>
          </div>

          {(dragActive || image) && (
            <div
              onClick={handleRemove}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-secondary hover:bg-primary text-sm font-medium rounded-sm shadow-lg transition-colors"
            >
              <X/>
            </div>
          )}
        </div>

        <Button 
          onClick={handleUpload} 
          disabled={!image || uploading}
          className="w-full"
        >
          {uploading ? "Updating..." : "Update profile picture"}
        </Button>
      </Card>
    </div>
  );
};

export default ImageUploader;