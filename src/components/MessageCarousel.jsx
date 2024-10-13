import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessageCarousel = () => {
  return (
    <Carousel className="w-full max-w-xs h-20">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="h-35 p-2">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex gap-1">
                    <Avatar className="  h-[20px] w-[20px]">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Logo"
                        className="  h-[20px] w-[20px]"
                      />
                    </Avatar>
                    <div className="font-medium text-sm text-black">Google</div>
                  </div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet..
                </p>
                <div className="text-right text-blue-500 cursor-pointer">
                  Show
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MessageCarousel;
