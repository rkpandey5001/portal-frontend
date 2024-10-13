import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Application_API_END_POINT } from "@/utils/host";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const { applicants, numberofapplications } = useSelector(
    (state) => state.adminjob
  );
  console.log(applicants);
  const shortlistingStatus = ["Accepted", "Rejected"];

  const changeStatus = async (applicant_id, value) => {
    console.log(applicant_id, value);
    try {
      const res = await axios.put(
        `${Application_API_END_POINT}/status/${applicant_id}/update`,
        { status: value },
        { withCredentials: "true" }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((jobseeker, index) => {
            return (
              <tr>
                <TableCell>{jobseeker.applicant.fullname}</TableCell>
                <TableCell>{jobseeker.applicant.email}</TableCell>
                <TableCell>{jobseeker.applicant.phoneNumber}</TableCell>
                <TableCell>
                  <a href={jobseeker.applicant.profile.resume}>
                    {jobseeker.applicant.profile.resumeOriginalName}
                  </a>
                </TableCell>
                <TableCell>{jobseeker.applicant.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              changeStatus(
                                jobseeker._id,
                                shortlistingStatus[index].toLowerCase()
                              );
                            }}
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
