import { setAllCompanies } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { Company_API_END_POINT } from "@/utils/host";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${Company_API_END_POINT}/getcompany`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCompanies();
  }, []);
};

export default useGetAllCompanies;
