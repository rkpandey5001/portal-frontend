import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios";
import { Company_API_END_POINT } from "@/utils/host";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCompany } from "@/redux/companySlice";

const CompaniesCreate = () => {
  const { singlecompany } = useSelector((state) => state.company);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const CompanyRegister = async () => {
    try {
      const res = await axios.post(
        `${Company_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data.company);
      if (res?.data?.success) {
        dispatch(setCompany(res.data.company));
        const company_id = res?.data?.company?._id;
        toast.success(res.data.message);
        navigate(`/admin/companies/${company_id}`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500">
          What would you like to give your company name? you can change this
          later.
        </p>
      </div>
      <Label>Comapny Name</Label>
      <Input
        type="text"
        className="my-2"
        placeholder="Microsoft, Google"
        onChange={(e) => {
          setCompanyName(e.target.value);
        }}
      />
      <div className="flex items-center gap-2 my-10">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={CompanyRegister}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CompaniesCreate;
