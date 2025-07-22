import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Image, Send, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/services/chat";
import toast from "react-hot-toast";
import { addMessage } from "@/redux/slices/chatSlice";

const ChatInput = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { register, handleSubmit, setValue, reset, watch } = useForm();

  const handleClick = () => {
    setPreview("");
    setValue("pic", null);
  };

  const message = watch("message");
  const pic = watch("pic");

  const onSubmit = async (data) => {
    const loadingId = toast.loading("sending...");

    const formData = new FormData();
    if (data.message && data.message.length > 0) {
      formData.append("text", data.message);
    }
    if (data.pic && data.pic.length > 0) {
      formData.append("image", data.pic[0]);
    }
    dispatch(
      addMessage({
        value: {
          receiverId: selectedUser._id,
          text: data.message && data.message.length > 0 && data.message,
          image: data.pic && data.pic.length > 0 && data.pic[0],
          createdAt: new Date().toISOString(),
        },
      })
    );
    const result = await sendMessage(selectedUser._id, formData);
    if (result.success) {
      toast.success("Sent successfully.", { id: loadingId });
    }
    setPreview(null);
    reset();
  };

  useEffect(() => {
    if (!message && !pic) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [message, pic]);

  return (
    <div className="bg-stone-900 w-full p-4 absolute bottom-0">
      {preview && (
        <span className="relative">
          <img
            className="rounded size-20 m-2 object-cover"
            src={preview}
            alt="Error while previewing the selected image."
          />
          <X
            onClick={handleClick}
            size={16}
            className="absolute -top-2 left-20 bg-stone-700 rounded-full cursor-pointer"
          />
        </span>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <Input
          {...register("message")}
          type="text"
          className={"outline-none border-none bg-stone-800 px-4 py-2"}
          placeholder={"Type message here..."}
        />
        <Label htmlFor={"file"} className={"cursor-pointer"}>
          <Image />
        </Label>
        <Input
          className={"hidden"}
          type={"file"}
          id="file"
          {...register("pic", {
            onChange: (e) => {
              const image = e.target.files[0];
              if (image) {
                setPreview(URL.createObjectURL(image));
              }
            },
          })}
        />
        <button
          disabled={disabled}
          type="submit"
          className={`p-2 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <Send />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
