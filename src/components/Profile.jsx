import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobs from "./AppliedJobs";
import UpdateProfileDialouge from "./UpdateProfileDialouge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const skills = [
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Express.js",
];

const Profile = () => {
  useGetAppliedJobs();
  let [open, setOpen] = useState(false);
  let { user } = useSelector((state) => state.auth);
  let isResume = true;
  return (
    <div className="max-w-6xl mx-auto bg-white">
      <div className="border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.profile.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p>{user.profile.bio}</p>
            </div>
          </div>
          <Button
            className="text-right border border-gray-200"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>
        <div className="mx-28 ">
          <div className="flex items-center gap-3 my-5">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-5">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className="flex mx-28 my-5">
          <h1 className="font-bold text-md">Skills</h1>
          <div className="flex gap-2 mx-5">
            {user.profile.skills.length != 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-black text-white rounded-full "
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>Not Available</span>
            )}
          </div>
        </div>

        <div className="flex mx-28 my-5">
          <Label className="font-bold text-md">Resume</Label>
          <div className="flex gap-2 mx-5">
            {isResume ? (
              <a
                target="blank"
                href={user.profile.resume}
                className="text-blue-700 hover:underline cursor-pointer"
              >
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span>Not Available</span>
            )}
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl my-5 p-8">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobs />
      </div>
      <UpdateProfileDialouge open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
