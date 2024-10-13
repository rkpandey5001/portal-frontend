import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import useGetSingleJob from "@/hooks/useGetSingleJob";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { Application_API_END_POINT, JOB_API_END_POINT } from "@/utils/host";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;

  const { singlejob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const date = singlejob?.job?.createdAt
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-");

  const isIntiallyApplied = singlejob?.job?.applications.some(
    (item) => item.applicant == user?._id || false
  );

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const dispatch = useDispatch();

  const applyHandler = async () => {
    try {
      const res = await axios.get(
        `${Application_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.success) {
        setIsApplied(true);
        console.log(isApplied);
        const updateSingleJob = {
          ...singlejob,
          applications: [...singlejob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data));
          setIsApplied(
            res.data.job.applications.some(
              (item) => item.applicant === user?._id
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singlejob?.job?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singlejob?.job?.position}
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singlejob?.job?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singlejob?.job?.salary}
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-full ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed text-white"
              : "bg-blue-700 text-white hover:bg-white hover:text-black hover:border-2 hover:border-blue-700"
          }`}
          onClick={isApplied ? null : applyHandler}
        >
          {isApplied ? "Aready Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {" "}
            {singlejob?.job?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">{`${singlejob?.job?.experienceLevel} Years`}</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {`${singlejob?.job?.salary} LPA`}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.applications.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">{date}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
