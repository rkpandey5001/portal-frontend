import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_API_END_POINT } from "@/utils/host";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

const AdminJobsCreate = () => {
  const { allcompanys } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = allcompanys.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    setLoading(true);
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log("error");
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen my-5">
      <form
        className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        onSubmit={submitHandler}
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>No. Of Position</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          {allcompanys.length > 0 && (
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  {allcompanys.map((company) => {
                    return (
                      <>
                        <SelectItem value={company.name.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      </>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        {loading ? (
          <Button className="w-full my-4 MT-4 bg-black text-whit text-white hover:bg-green-600">
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className="w-full my-4 bg-black text-white hover:bg-green-600"
            type="submit"
          >
            {" "}
            Post New Job
          </Button>
        )}
        {allcompanys.length === 0 && (
          <p className="text-xs text-red-600 text-center my-3">
            *Please register a company first,before posting jobs
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminJobsCreate;
