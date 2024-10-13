import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CompaniesTable from "./admin/CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchByText } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  const { allcompanys } = useSelector((state) => state.company);
  const [filter, setFilter] = useState("");
  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(setSearchByText(filter));
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
            navigate("/admin/companies/create");
          }}
        >
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;
