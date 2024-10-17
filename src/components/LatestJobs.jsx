import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = (job_id) => {
  const { alljobs } = useSelector((state) => state.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="xsm:text-2xl  md:text-3xl font-bold xsm:text-center md:text-left">
        <span className="text-[#6A38C2]">Latest & Top </span>Jobs Opening
      </h1>
      <div className="grid grid-cols-3 xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {alljobs?.jobs?.length == 0 ? (
          <span>Jobs Not Available</span>
        ) : (
          alljobs?.jobs
            ?.slice(0, 6)
            ?.map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
