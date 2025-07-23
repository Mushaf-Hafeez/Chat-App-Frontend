import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setIsSigning } from "@/redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { signup } from "@/services/auth";
import { Eye, EyeClosed, Loader2, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { setId, setName, setEmail, setDate } from "@/redux/slices/profileSlice";
import { setUsersOnline, setSocketConnect } from "@/redux/slices/chatSlice";
import { onlineUsers } from "@/utils";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSigning } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(setIsSigning({ value: true }));

    const result = await signup(data);

    if (result.success) {
      localStorage.setItem("id", JSON.stringify(result.data.id));
      localStorage.setItem("name", JSON.stringify(result.data.name));
      localStorage.setItem("email", JSON.stringify(result.data.email));
      localStorage.setItem("createdAt", JSON.stringify(result.data.createdAt));
      dispatch(setId({ value: result.data.id }));
      dispatch(setName({ value: result.data.name }));
      dispatch(setEmail({ value: result.data.email }));
      dispatch(setDate({ value: result.data.createdAt }));
      toast.success("Signup successful.");
      dispatch(setSocketConnect({ value: connectSocket() }));
      dispatch(setUsersOnline({ value: onlineUsers }));
      reset();
      navigate("/");
    } else {
      toast.error(result.message || "An unexpected error occurred.");
    }

    dispatch(setIsSigning({ value: false }));
  };

  return (
    <div className="main-container center column pt-16 md:mt-20 lg:mt-24 ">
      <span className="p-2 bg-stone-700 center rounded mb-4">
        <MessageSquare size={50} />
      </span>
      <h3 className="font-semibold text-stone-200 text-xl">Create Account</h3>
      <p className="text-sm text-stone-400">
        Get started with your free account
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="column w-full p-10 sm:w-1/2 lg:w-1/4 items-start my-2 gap-6"
      >
        <div className="w-full">
          <Label className={"mb-2"} htmlFor="name">
            Name
          </Label>
          <Input
            placeholder="Enter your name..."
            className={"border-none bg-stone-800"}
            id="name"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <div className="w-full">
          <Label className={"mb-2"} htmlFor="email">
            Email
          </Label>
          <Input
            placeholder="Enter your email..."
            className={"border-none bg-stone-800"}
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
        </div>
        <div className="relative w-full">
          <Label htmlFor="password" className={"relative mb-2"}>
            Password
          </Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password..."
            className={"border-none bg-stone-800"}
            id="password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute z-40 top-8 right-2 cursor-pointer"
          >
            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
          </span>
        </div>
        <div className="relative w-full">
          <Label htmlFor="confirmPassword" className={"relative mb-2"}>
            Confirm Password
          </Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password..."
            className={"border-none bg-stone-800"}
            id="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
            })}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute z-40 top-8 right-2 cursor-pointer"
          >
            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* login Button */}
        <Button
          variant={"secondary"}
          className={"font-semibold cursor-pointer w-full"}
        >
          {isSigning ? (
            <span className="center">
              <Loader2 className="animate-spin" />
              Signing in
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
        <Link
          to={"/login"}
          className="text-sm text-stone-500 cursor-pointer hover:underline hover:text-stone-300 transition-colors"
        >
          Already have an account?
        </Link>
      </form>
      {errors && errors.name && (
        <span className="text-red-500 text-sm">Name is required.</span>
      )}
      {errors && errors.email && (
        <span className="text-red-500 text-sm">Email is required/invalid.</span>
      )}
      {errors && errors.password && (
        <span className="text-red-500 text-sm">Password is required.</span>
      )}
    </div>
  );
};

export default SignupPage;
