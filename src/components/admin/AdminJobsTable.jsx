import { PopoverContent } from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import React, { useEffect, useState } from "react";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetSingleCompany from "@/hooks/useGetSingleCompany";

const AdminJobsTable = () => {
  const { alladminjobs } = useSelector((state) => state.adminjob);
  const [filterInput, setFilter] = useState(alladminjobs);
  const navigate = useNavigate();

  const { searchjobbytext } = useSelector((state) => state.adminjob);

  useEffect(() => {
    const filteredCompany =
      alladminjobs.length !== 0 &&
      alladminjobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchjobbytext.toLowerCase()) ||
          job.company.name.toLowerCase().includes(searchjobbytext.toLowerCase())
      );
    setFilter(filteredCompany);
  }, [searchjobbytext, alladminjobs]);

  const date = (createdDate) => {
    const newDate = createdDate.split("T")[0].split("-").reverse().join("-");

    return newDate;
  };

  const editHandler = (job_id) => {
    navigate(`/admin/jobs/${job_id}`);
    useGetSingleCompany(job_id);
  };

  const applicantHandler = (job_id) => {
    navigate(`/admin/jobs/${job_id}/applicants`);
    useGetSingleCompany(job_id);
  };
  return (
    <Table>
      <TableCaption>A list of your recent posted jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterInput.length <= 0 ? (
          <span>Not any registered company</span>
        ) : (
          filterInput.map((job) => (
            <tr key={job._id}>
              <TableCell>{job.company.name}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{date(job.createdAt)}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-27">
                    <div
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 hover:text-white"
                      onClick={() => {
                        editHandler(job._id);
                      }}
                    >
                      <Edit2 className="w-7" />
                      <span>Edit</span>
                    </div>
                    <div
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 hover:text-white"
                      onClick={() => {
                        applicantHandler(job._id);
                      }}
                    >
                      <Eye className="w-7" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AdminJobsTable;
