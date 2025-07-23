import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSelector, useDispatch } from "react-redux";
import { setIsAuthenticated } from "@/redux/slices/authSlice";
import { logout } from "@/services/auth";
import {
  setId,
  setDate,
  setEmail,
  setImage,
  setName,
} from "@/redux/slices/profileSlice";
import {
  setMessages,
  setSelectedUser,
  setSocketConnect,
} from "@/redux/slices/chatSlice";
import { disconnectSocket } from "@/utils";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { image } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();

    if (result && result.success) {
      localStorage.clear();
      dispatch(setIsAuthenticated({ value: false }));
      dispatch(setId({ value: null }));
      dispatch(setName({ value: null }));
      dispatch(setEmail({ value: null }));
      dispatch(setImage({ value: null }));
      dispatch(setDate({ value: null }));
      dispatch(setMessages({ value: [] }));
      dispatch(setSelectedUser({ value: {} }));
      toast.success("Logout successful.");
      disconnectSocket();
      dispatch(setSocketConnect({ value: null }));
      navigate("/");
    } else {
      toast.error("Logout unsuccessful.");
    }
  };

  useEffect(() => {}, [image]);

  return (
    <header className="bg-stone-900 text-white flex items-center justify-between py-2 sm:py-4 md:py-6 lg:py-9 px-4 sm:px-10 md:px-20 lg:px-40">
      {/* Logo of the App */}
      <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
        <span className="p-2 rounded bg-stone-800 center">
          <MessageSquare size={30} />
        </span>
        <span className="font-semibold text-xl">CHATTING APP</span>
      </Link>

      {/* nav items will be here */}
      <div className="row">
        {isAuthenticated ? (
          <div className="row">
            <Link to={"/profile"}>
              <Avatar className={"size-10"}>
                <AvatarImage
                  className={"object-cover"}
                  src={image ? image : "/default_profile.png"}
                />
                <AvatarFallback className={"text-stone-900"}>CN</AvatarFallback>
              </Avatar>
            </Link>
            <Dialog className={"bg-stone-800"}>
              <DialogTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={"row font-semibold cursor-pointer"}
                >
                  <LogOut size={20} color="black" />
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Logout</DialogTitle>
                  <DialogDescription>
                    Are yor sure you want to logout?
                  </DialogDescription>
                  <DialogFooter
                    className={"flex items-center justify-end gap-4"}
                  >
                    <DialogClose asChild>
                      <Button
                        variant={"secondary"}
                        className={"font-semibold cursor-pointer"}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={handleLogout}
                        variant={"destructive"}
                        className={"font-semibold cursor-pointer"}
                      >
                        Logout
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="row">
            <Button
              asChild
              variant={"secondary"}
              className="font-semibold cursor-pointer"
            >
              <Link to={"/login"}>Login</Link>
            </Button>
            <Button
              asChild
              variant={"secondary"}
              className="font-semibold cursor-pointer"
            >
              <Link to={"/signup"}>Signup</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
