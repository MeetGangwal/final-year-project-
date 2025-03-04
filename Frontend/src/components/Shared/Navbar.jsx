import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Trash, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { setUser } from "@/Redux/authSlice";

// disappare of login and signup button after its process is left other then this most of stuff is done
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profilePath =
    user?.role === "Director"
      ? `/admin/CDprofile/${user._id}` // Director Profile
      : "/profile"; // Actor Profile
   
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    };
  
  };

  const deleteAccountHandler = async () => {//added 
    if (!user) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;
  
    try {
      const res = await axios.delete(`${USER_API_END_POINT}/delete-account`, {
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="pt-5 w-full z-20 bg-transparent ">
      <div className="flex  items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div className="flex items-center gap-2 w-fit">
        <Link to={user?.role === "Director" ? "/admin" : "/"} className="inline-block">
        <img
            src="/Images/STARCONNECT.svg"
            alt="StarConnect Logo"
            className=" w-[180px] max-w-full"
          />
            
          </Link>
        </div>
        <div className="flex items-center  gap-10">
          <ul className="flex gap-3 items-center  text-white font-bold">
          {
              user && user.role === 'Director' ? (
                <>
                   <li><Link to="/admin">HOME</Link></li>
                  <li><Link to="/admin/Companies">COMPANIES</Link></li>
                  <li><Link to="/admin/jobs">JOBS</Link></li>
                  <li><Link to="/admin/FindTalent">TALENTS</Link> </li>
                 
                </>
              ) : (
                <>
                  <li><Link to="/">HOME</Link></li>
                  <li><Link to="/JOBS">JOBS</Link></li>
                  <li><Link to="/NEWS">NEWS</Link></li>
                  <li><Link to="/FindDirector">DIRECTORS</Link></li>
                </>
              )
            }
         
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/Login"}>
                <Button varient="outline" className="text-white rounded">
                  Login
                </Button>
              </Link>
              <Link to={"/SignUp"}>
                <Button className=" text-white rounded">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer object-cover">
                  <AvatarImage className="object-cover" src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                     
                      src={user?.profile?.profilePhoto}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium "> {user?.fullname} </h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to={profilePath}>View profile</Link>
                    </Button>
                  </div>

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">{/*added*/}
                    <Trash />
                    <Button onClick={deleteAccountHandler} variant="link" className="text-red-500">
                      Delete Account
                    </Button>
                  </div>;
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
