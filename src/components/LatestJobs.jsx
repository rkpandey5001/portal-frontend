import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = (job_id) => {
  const { alljobs } = useSelector((state) => state.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-3xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Jobs Opening
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
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
