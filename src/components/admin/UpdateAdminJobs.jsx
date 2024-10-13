import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/host";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setCompany } from "@/redux/companySlice";
import useGetSingleCompany from "@/hooks/useGetSingleCompany";

const UpdateAdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  useGetSingleCompany(params.id);
  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    setInput({
      name: singlecompany?.name || "",
      description: singlecompany?.description || "",
      website: singlecompany?.website || "",
      location: singlecompany?.location || "",
      file: singlecompany?.logo || null,
    });
  }, [singlecompany, dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const logoHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const company_id = params.id;
      console.log(company_id);
      setLoading(true);
      const res = await axios.put(
        `${Company_API_END_POINT}/update/${company_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        dispatch(setCompany(res.data.company));
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <form onSubmit={submitHandler}>
        <div className="flex items-center  gap-5 p-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-semibold text-xl">Job SetUp</h1>
        </div>
        <div className="grid grid-cols-2 gap-5 p-8">
          <Label>Job Title</Label>
          <Input
            type="text"
            name="name"
            value={input.name}
            onChange={inputHandler}
          />
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={input.description}
            onChange={inputHandler}
          />
          <Label>Requirements</Label>
          <Input
            type="text"
            name="website"
            value={input.website}
            onChange={inputHandler}
          />

          <Label>Salary</Label>
          <Input
            type="text"
            name="website"
            value={input.website}
            onChange={inputHandler}
          />
          <Label>Experience</Label>
          <Input
            type="text"
            name="website"
            value={input.website}
            onChange={inputHandler}
          />

          <Label>Location</Label>
          <Input
            type="text"
            name="location"
            value={input.location}
            onChange={inputHandler}
          />

          <Label>Job Type</Label>
          <Input
            type="text"
            name="location"
            value={input.location}
            onChange={inputHandler}
          />

          <Label>Positions</Label>
          <Input
            type="text"
            name="location"
            value={input.location}
            onChange={inputHandler}
          />
          <Label>Logo</Label>
          <Input type="file" accept="image/*" onChange={logoHandler} />
        </div>
        {loading ? (
          <Button className="w-full my-4 bg-green-500 text-white hover:bg-green-600">
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className="w-full my-4 bg-green-500 text-white hover:bg-green-600"
            type="submit"
          >
            Update
          </Button>
        )}
      </form>
    </div>
  );
};

export default UpdateAdminJobs;
