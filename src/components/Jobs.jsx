import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import JobsCard from "./JobsCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { alljobs, filtervalue } = useSelector((state) => state.job);
  const [jobsValue, setJobsValue] = useState(alljobs.jobs);

  useEffect(() => {
    if (filtervalue) {
      const filteredJobs = alljobs?.jobs?.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(filtervalue?.toLowerCase()) ||
          job?.location?.toLowerCase().includes(filtervalue?.toLowerCase()) ||
          job?.description?.toLowerCase().includes(filtervalue?.toLowerCase())
        );
      });
      setJobsValue(filteredJobs);
    } else {
      setJobsValue(alljobs.jobs);
    }
  }, [alljobs, filtervalue]);

  return (
    <div className="max-w-7xl mx-auto sm:mt-[130px] md:mt-5">
      <div className="flex sm:gap-2 md:gap-5">
        <div className="xsm:w-8% md:w-20%">
          <FilterCard />
        </div>
        {jobsValue.length <= 0 ? (
          <span>No Jobs Found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid xsm:flex xsm:flex-wrap  sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
              {jobsValue?.map((jobs) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <JobsCard key={jobs?._id} jobs={jobs} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
