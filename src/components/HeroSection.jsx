import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/userJobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    dispatch(setSearchedQuery(searchQuery));
    navigate("/browse");
  };

  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <span className="mx-auto px-4 py-2  bg-gray-100 text-[#F83002] font-medium">
            No. 1 Job Search Website
          </span>
          <h1 className="text-5xl font-bold">
            Search, Apply & <br /> Get Your{" "}
            <span className="text-[#6A38C2]">Dream Jobs</span>
          </h1>
          <p className="w-[65%] m-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero
            illum, quibusdam distinctio officiis excepturi voluptas. Maxime
            officia voluptatem ipsa quasi. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatum, sint!
          </p>
          <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mt-3">
            <input
              type="text"
              placeholder="Find your dream jobs"
              className="outline-none border-none w-full"
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
            <Button
              className="rounded-r-full bg-[#6A38C2] text-white"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
