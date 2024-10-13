import { setAllAdminJobs } from "@/redux/adminJobSlice";
import { Admin_Job_API_END_POINT, Company_API_END_POINT } from "@/utils/host";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${Admin_Job_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
