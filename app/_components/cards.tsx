import React from "react";
import Image from "next/image";
import { ChevronRight, CalendarDays } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PieChartComponent } from "@/app/_components/piechart";
import { BarChartComponent } from "@/app/_components/chartComponent";
export function SubscriptionCard({
  title,
  imageUrl,
  remainingDays,
  startingDate,
  endingDate,
  subscriptionCategory,
  subscriptionPrice,
}: {
  title: string;
  imageUrl: string;
  remainingDays: number;
  startingDate: string;
  endingDate: string;
  subscriptionCategory: string;
  subscriptionPrice: number;
}) {
  return (
    <div className="flex flex-col w-[350px] h-[230px] p-3 bg-white rounded-md shadow-sm">
      <div className="flex justify-between">
        <div className="flex space-x-5">
          <Image
            src={imageUrl}
            width={50}
            height={50}
            className="rounded-full overflow-hidden w-[50px] h-[50px]"
            alt="Subscription logo"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl">{title}</h2>
            <h6 className="text-sm text-gray-400">{subscriptionCategory}</h6>
          </div>
        </div>
        <ChevronRight />
      </div>
      <div>
        <div className="bg-gray-200 rounded-sm flex justify-center items-center p-1 my-3 text-nowrap">
          <CalendarDays />
          <span className="text-blue-600 mx-1">From</span> : {startingDate}
          <CalendarDays className="ml-1" />
          <span className="text-blue-600 mx-1">To</span>: {endingDate}
        </div>
        <div className=" flex flex-row justify-between">
          <div className="flex justify-center items-center flex-row space-x-2 bg-gray-200 w-[65%] p-2 rounded mt-2">
            <h3 className="text-4xl font-semibold">{remainingDays}</h3>
            <h6 className="text-gray-600">Days Left</h6>
          </div>
          <div className="flex flex-row justify-center items-center space-x-2 bg-gray-200 p-2 rounded mt-2 w-[30%]">
            {" "}
            ${subscriptionPrice}
          </div>
        </div>
      </div>
    </div>
  );
}
export function CreditCardCard({
  cardNumber,
  cardType,
}: {
  cardNumber: string;
  cardType: "Visa" | "Apple Pay" | "MasterCard" | "PayPal";
}) {
  const cardsLogo: {
    Visa?: string;
    "Apple Pay"?: string;
    MasterCard?: string;
    PayPal?: string;
  } = {
    Visa: "/visaImage.jpg",
    "Apple Pay": "/applePayImage.jpg",
    MasterCard: "/masterCardImage.jpg",
    PayPal: "/paypalImage.jpg",
  };
  function splitStringToChunks(str: string, chunkSize: number): string[][] {
    const result = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      result.push(str.slice(i, i + chunkSize).split(""));
    }
    return result;
  }
  return (
    <div className="w-full p-3 rounded-md bg-white">
      <h6>State Bank</h6>
      <div className="flex justify-between w-full">
        <div className="w-[70%] flex justify-between">
          {splitStringToChunks(cardNumber, 4).map((l, i) => {
            return (
              <span key={i} className="text-gray-400">
                {l.join("")}
              </span>
            );
          })}
        </div>

        <Image
          src={cardsLogo[cardType] ? cardsLogo[cardType] : ""}
          width={40}
          height={40}
          alt="Card type image"
        />
      </div>
    </div>
  );
}
export function SubscriptionsTypes() {
  return <div className="bg-white"></div>;
}

export function RecentSubscriptions({
  title,
  SubscriptionImage,
  subscriptionPrice,
  subscriptionCategory,
  endingDate,
}: {
  title: string;
  SubscriptionImage: string;
  subscriptionPrice: number;
  subscriptionCategory: string;
  endingDate: string;
}) {
  return (
    <div className="bg-white flex flex-row h-[75px] p-3 justify-between text-nowrap w-full rounded-md">
      <div className="flex flex-row space-x-3">
        <Image
          src={SubscriptionImage}
          height={90}
          width={90}
          className="h-full rounded-md"
          alt="Subscription Company Logo"
        />
        <div className="flex flex-col">
          <h2 className="text-xl">{title}</h2>
          <h6 className="text-sm text-gray-500">until {endingDate}</h6>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-blue-600 text-xl">${subscriptionPrice}</h3>
        <h6 className="text-sm text-gray-500">{subscriptionCategory}</h6>
      </div>
    </div>
  );
}
export function SubscriptionsRecommandations() {
  const SubscriptionsSuggestions: { imageUrl: string; linkUrl: string }[] = [
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
    { imageUrl: "/netflix.jpg", linkUrl: "#" },
  ];
  return (
    <div className="bg-white w-[350px] py-8 rounded-md">
      <h2 className="text-2xl mb-3 pl-4">Our Recommended App For You</h2>
      <div>
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {SubscriptionsSuggestions.map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-[30%]">
                <div className="p-1">
                  <div className="flex w-fit items-center justify-center rounded-md overflow-hidden">
                    <Image
                      src="/netflix.jpg"
                      width={80}
                      height={50}
                      alt="Apple App Store Logo"
                      className="w-[80px] h-[50px]"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export function PieChartCard() {
  return (
    <div className="">
      <PieChartComponent />
    </div>
  );
}

export function BarChartCard() {
  return (
    <div>
      <BarChartComponent />
    </div>
  );
}
