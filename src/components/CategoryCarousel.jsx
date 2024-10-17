import React, { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/userJobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "FrontEnd Developer",
  "BackEnd Developer",
  "FullStack Developer",
  "Data Scientist",
  "Machine Learning ",
  "DevOps Engineer",
  "Software Engineer",
  "Web Developer",
  "Mobile Developer",
  "Game Developer",
];

const CategoryCarousel = () => {
  const disptch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (item) => {
    disptch(setSearchedQuery(item));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="xsm:w-[50%] md:w-full max-w-xl mx-auto md:my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button
                variant="outline"
                className="rounded-full w-full"
                onClick={() => searchHandler(item)}
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
