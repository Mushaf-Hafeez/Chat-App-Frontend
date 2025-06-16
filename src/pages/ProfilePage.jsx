import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import { setIsUpdating } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateImage } from "@/services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setImage } from "@/redux/slices/profileSlice";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  const { isUpdating } = useSelector((state) => state.auth);
  const { name, email, image, createdAt } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsUpdating({ value: true }));
    const formData = new FormData();
    formData.append("image", selectedImage);
    const result = await updateImage(formData);

    if (result && result.success) {
      localStorage.setItem(
        "image",
        JSON.stringify(result.data.image ? result.data.image : null)
      );
      dispatch(setImage({ value: result.data.image }));
      toast.success("Image uploaded.");
      navigate("/");
    } else {
      toast.error(result.message);
    }
    dispatch(setIsUpdating({ value: false }));
  };

  useEffect(() => {}, [image]);

  return (
    <div className="main-container column">
      <h3 className="text-3xl font-semibold text-stone-300">Profile</h3>
      <p className="text-stone-400">Your profile information</p>
      <form
        onSubmit={handleSubmit}
        className="column w-full p-10 sm:w-1/2 lg:w-1/4 items-start my-2 gap-6"
      >
        <div className="relative mx-auto">
          <Avatar className={"size-32"}>
            <AvatarImage
              src={preview ? preview : image ? image : "/default_profile.png"}
              className={"object-cover"}
            />
            <AvatarFallback className={"text-stone-900"}>CN</AvatarFallback>
          </Avatar>
          <Label htmlFor={"image"}>
            <Avatar
              className={`absolute bottom-2 right-0 ${
                isUpdating ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <AvatarFallback className={"bg-stone-500"}>
                <Camera />
              </AvatarFallback>
            </Avatar>
          </Label>
        </div>
        <Input
          disabled={isUpdating}
          onChange={handleChange}
          type={"file"}
          className={"hidden"}
          id={"image"}
        />
        <div className="column w-full items-start">
          <Label>Full Name</Label>
          <Input
            value={name}
            className={
              "cursor-not-allowed border-none bg-stone-800 text-stone-400"
            }
            readOnly
          />
        </div>
        <div className="column w-full items-start">
          <Label>Email Address</Label>
          <Input
            value={email}
            className={
              "cursor-not-allowed border-none bg-stone-800 text-stone-400"
            }
            readOnly
          />
        </div>
        <div className="w-full column text-stone-400">
          <h3 className="text-lg font-semibold self-start">
            Account Information
          </h3>
          <div className="w-full text-sm flex items-center justify-between border-b border-stone-600">
            <p>Member Since</p>
            <p>{createdAt.split("T")[0]}</p>
          </div>
          <div className="w-full text-sm flex items-center justify-between">
            <p>Account Status</p>
            <p className="text-green-600">Active</p>
          </div>
        </div>

        <Button
          type={"submit"}
          variant={"secondary"}
          className={"w-full cursor-pointer font-semibold"}
        >
          {isUpdating ? (
            <span className="row">
              <Loader2 className="animate-spin" />
              Updating
            </span>
          ) : (
            "Apply Changes"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
