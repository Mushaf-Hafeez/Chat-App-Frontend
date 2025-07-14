import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed, Loader2, MessageSquare } from "lucide-react";
import { checkAuth, login } from "@/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setIsLogging } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  setId,
  setName,
  setEmail,
  setDate,
  setImage,
} from "../redux/slices/profileSlice";
import { connectSocket, onlineUsers } from "@/utils";
import { setUsersOnline, setSocketConnect } from "@/redux/slices/chatSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogging } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(setIsLogging({ value: true }));

    const result = await login(data); // No need for a try-catch here since login handles it

    if (result.success) {
      localStorage.setItem("id", JSON.stringify(result.data.id));
      localStorage.setItem("name", JSON.stringify(result.data.name));
      localStorage.setItem("email", JSON.stringify(result.data.email));
      if (result.data.image) {
        localStorage.setItem("image", JSON.stringify(result.data.image));
      }
      localStorage.setItem("createdAt", JSON.stringify(result.data.createdAt));
      dispatch(setId({ value: result.data.id }));
      dispatch(setName({ value: result.data.name }));
      dispatch(setEmail({ value: result.data.email }));
      if (result.data.image) {
        dispatch(setImage({ value: result.data.image }));
      }
      dispatch(setDate({ value: result.data.createdAt }));
      toast.success("Login successful.");
      // dispatch(setIsAuthenticated({ value: true }));
      dispatch(setSocketConnect({ value: connectSocket() }));
      dispatch(setUsersOnline({ value: onlineUsers }));
      reset();
      navigate("/");
    } else {
      toast.error(result.message || "An unexpected error occurred.");
    }

    dispatch(setIsLogging({ value: false }));
  };

  const checking = async () => {
    try {
      const result = await checkAuth();

      console.log("result in the checking function in login page is: ", result);

      if (result.success) {
        dispatch(setIsAuthenticated({ value: true }));
        navigate("/");
      }
    } catch (error) {
      console.log("Error in the checking function: ", error.message);
    }
  };

  useEffect(() => {
    checking();
  }, []);

  return (
    <div className="main-container column">
      <span className="p-2 bg-stone-700 center rounded mb-4">
        <MessageSquare size={50} />
      </span>
      <h3 className="font-semibold text-stone-200 text-xl">Welcome Back</h3>
      <p className="text-sm text-stone-400">Login to your account</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="column w-full p-10 sm:w-1/2 lg:w-1/4 items-start my-2 gap-6"
      >
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

        {/* login Button */}
        <Button
          variant={"secondary"}
          className={"font-semibold cursor-pointer w-full"}
        >
          {isLogging ? (
            <span className="center">
              <Loader2 className="animate-spin" />
              Logging in
            </span>
          ) : (
            "Login"
          )}
        </Button>
        <Link
          to={"/signup"}
          className="text-sm text-stone-500 cursor-pointer hover:underline hover:text-stone-300 transition-colors"
        >
          Don't have an account?
        </Link>
      </form>
      {errors && errors.email && (
        <span className="text-red-500 text-sm">Email is required/invalid.</span>
      )}
      {errors && errors.password && (
        <span className="text-red-500 text-sm">Password is required.</span>
      )}
    </div>
  );
};

export default LoginPage;
