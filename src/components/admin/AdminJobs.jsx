import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchByText } from "@/redux/companySlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchAdminJobs } from "@/redux/adminJobSlice";

const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllAdminJobs();
  const { alladminjobs } = useSelector((state) => state.adminjob);
  const [filter, setFilter] = useState("");
  //   const { singlecompany } = useSelector((state) => state.company);
  console.log(alladminjobs);
  useEffect(() => {
    dispatch(setSearchAdminJobs(filter));
  }, [filter, dispatch]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className=" flex justify-between items-center my-5">
        <Input
          className="w-fit"
          placeholder="Filter by name"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            navigate("/admin/jobs/create");
          }}
        >
          New Jobs
        </Button>
      </div>
      <AdminJobsTable />
    </div>
  );
};

export default AdminJobs;
