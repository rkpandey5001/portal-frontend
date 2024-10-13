import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/host.js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const SignUp = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      let res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl mb-5">Sign Up</h1>
        <div className="my-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={handleInput}
            placeholder="Enter your name"
          />
        </div>

        <div className="my-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={handleInput}
            placeholder="Enter Email"
          />
        </div>

        <div className="my-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={handleInput}
            placeholder="Enter Phone Number"
          />
        </div>

        <div className="my-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInput}
            placeholder="Enter Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"
                id="r1"
                checked={input.role === "student"}
                onChange={handleInput}
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                id="r2"
                checked={input.role === "recruiter"}
                onChange={handleInput}
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center gap-2 w-1/2">
          <Label>Profile</Label>
          <input
            accept="image/*"
            type="file"
            name="file"
            onChange={changeFileHandler}
            className="cursor-pointer"
          />
        </div>
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
            Sign Up
          </Button>
        )}
        <span className="text-sm flex items-center justify-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
