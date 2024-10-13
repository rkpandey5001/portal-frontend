import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const JobsCard = ({ jobs }) => {
  const navigate = useNavigate();
  const createdDate = (createdAt) => {
    const create = new Date(createdAt);
    const dateNow = new Date();
    const diff = dateNow - create;
    const date = Math.floor(diff / (1000 * 60 * 60 * 24));
    return date;
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {createdDate(jobs.createdAt)} days
        </p>
        <Button
          variant="outline"
          className="rounded-full border-none"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 border-none" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={jobs.company.logo} alt="avatar" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{jobs.company.name}</h1>
          <p className="text-sm text-gray-500">{jobs.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{jobs.title}</h1>
        <p className="text-sm text-gray-600">{jobs.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {jobs.position}
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {jobs.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {jobs.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="bg-black text-white"
          onClick={() => {
            navigate(`/description/${jobs._id}`);
          }}
        >
          Details
        </Button>
        <Button className="bg-emerald-500 text-white hover:text-black">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default JobsCard;
