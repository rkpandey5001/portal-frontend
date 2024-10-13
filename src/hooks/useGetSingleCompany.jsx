import { setAllCompanies, setCompany } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { Company_API_END_POINT } from "@/utils/host";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleCompany = (company_id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${Company_API_END_POINT}/get/${company_id}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setCompany(res.data.company));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleCompany();
  }, []);
};

export default useGetSingleCompany;
