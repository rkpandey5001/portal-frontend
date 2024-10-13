import { setSearchedJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/host";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetSearchedJobs = () => {
  let dispatch = useDispatch();
  const { searchedquery } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/getjobs?keyword=${searchedquery}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.jobs);
        if (res.data.success) {
          dispatch(setSearchedJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetSearchedJobs;
