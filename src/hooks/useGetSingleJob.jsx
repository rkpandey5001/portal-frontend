import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/host";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (jobId) => {
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleJob();
  }, []);
};

export default useGetSingleJob;
