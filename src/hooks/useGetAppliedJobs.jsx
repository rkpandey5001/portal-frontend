import { setAllAdminJobs } from "@/redux/adminJobSlice";
import { setAllJobs } from "@/redux/jobSlice";
import { setAllAppliedJobs } from "@/redux/userJobSlice";
import { Application_API_END_POINT, JOB_API_END_POINT } from "@/utils/host";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${Application_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
