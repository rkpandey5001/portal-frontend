import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/host";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialouge = ({ open, setOpen }) => {
  let [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  let dispatch = useDispatch();

  const [input, setInput] = useState({
    name: user?.fullname,
    email: user?.email,
    phone: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", input.name);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phone);
    formdata.append("bio", input.bio);
    formdata.append("skills", input.skills);
    if (input.file) {
      formdata.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully");
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="p-5 bg-white border-none max-w-[680px] sm:max-w-[425px]"
          onInteractOutside={() => {
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Phone
                </Label>
                <Input
                  id="number"
                  name="number"
                  type="text"
                  value={input.phone}
                  className="col-span-3"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  className="col-span-3"
                  onChange={changeEventHandler}
                  value={input.bio}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  className="col-span-3"
                  onChange={changeEventHandler}
                  value={input.skills}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                  onChange={fileChangeHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 bg-green-500 text-white hover:bg-green-600">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  className="w-full my-4 bg-green-500 text-white hover:bg-green-600"
                  type="submit"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialouge;
