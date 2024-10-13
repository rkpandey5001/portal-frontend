import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setFilterValue } from "@/redux/jobSlice";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Front End Developer",
      "Back End Developer",
      "Full Stack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-20K", "20-40K", "40-60K", "60-80K", "80K+"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    dispatch(setFilterValue(filter));
  }, [filter]);

  return (
    <div className="w-full bg-white p-3 rounded-md ">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup onValueChange={handleFilterChange} value={filter}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-md">{data.filterType}</h1>

            {data.array.map((item, itemindex) => {
              const itemId = `id ${index} - ${itemindex}`;
              return (
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
