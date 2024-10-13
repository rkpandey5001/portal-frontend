import React, { useEffect } from "react";
import JobsCard from "./JobsCard";
import { useDispatch, useSelector } from "react-redux";

import useGetSearchedJobs from "@/hooks/useGetSearchedJobs";
import { setSearchedJobs } from "@/redux/jobSlice";

const randomJobs = [1, 2, 3, 4, 5, 6];

const Browse = () => {
  const dispatch = useDispatch();
  useGetSearchedJobs();
  const { alljobs } = useSelector((state) => state.job);
  const { searchedjobs } = useSelector((state) => state.job);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-xl my-10">
        Search Results ({searchedjobs.length})
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {searchedjobs?.map((jobs) => (
          <JobsCard key={jobs?._id} jobs={jobs} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
