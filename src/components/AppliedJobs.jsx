import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  let { allappliedjobs } = useSelector((state) => state.user);
  return (
    <div>
      <Table>
        <TableCaption>A list your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allappliedjobs?.applicants <= 0 ? (
            <span>You cannot applied for any job</span>
          ) : (
            allappliedjobs?.applications?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {item.createdAt
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </TableCell>
                  <TableCell>{item?.job?.title}</TableCell>
                  <TableCell>{item?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`${
                        item?.status == "accepted"
                          ? "bg-green-500 text-white rounded"
                          : item.status == "pending"
                          ? "bg-gray-400 text-white rounded"
                          : "bg-green-400 text-white rounded"
                      }`}
                    >
                      {item?.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
