import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/host";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  let dispatch = useDispatch();
  const { searchedquery } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
