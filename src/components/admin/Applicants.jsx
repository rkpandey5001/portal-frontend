import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { Application_API_END_POINT } from "@/utils/host";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setApplicants, setNumberOfApplicants } from "@/redux/adminJobSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  let [numberOfApplicants, setNumberOfApplicants] = useState(0);
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${Application_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
          dispatch(setNumberOfApplicants(res.data.job.applications.length));
          setNumberOfApplicants(res.data.job.applications.length);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApplicants();
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({numberOfApplicants})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
