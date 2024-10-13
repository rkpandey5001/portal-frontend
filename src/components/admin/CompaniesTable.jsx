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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetSingleCompany from "@/hooks/useGetSingleCompany";

const CompaniesTable = () => {
  const { allcompanys } = useSelector((state) => state.company);
  const [filterInput, setFilter] = useState(allcompanys);
  const navigate = useNavigate();

  const { searchbytext } = useSelector((state) => state.company);

  useEffect(() => {
    const filteredCompany =
      allcompanys.length !== 0 &&
      allcompanys.filter((company) =>
        company.name.toLowerCase().includes(searchbytext.toLowerCase())
      );
    setFilter(filteredCompany);
  }, [searchbytext, allcompanys]);

  const date = (createdDate) => {
    const newDate = createdDate.split("T")[0].split("-").reverse().join("-");

    return newDate;
  };

  const editHandler = (company_id) => {
    navigate(`/admin/companies/${company_id}`);
    useGetSingleCompany(company_id);
  };

  return (
    <Table>
      <TableCaption>A list of your recent registered companies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterInput.length <= 0 ? (
          <span>Not any registered company</span>
        ) : (
          filterInput.map((company) => (
            <tr key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{date(company.createdAt)}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-27">
                    <div
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 hover:text-white"
                      onClick={() => {
                        editHandler(company._id);
                      }}
                    >
                      <Edit2 className="w-7" />
                      <span>Edit</span>
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

export default CompaniesTable;
