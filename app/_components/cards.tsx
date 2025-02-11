"use client";
import { BarChartComponent } from "@/app/_components/chartComponent";
import { PieChartComponent } from "@/app/_components/piechart";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { initialState, useNextPaymentStore } from "@/store/useNextPaymentStore";
import { CalendarDays, Check, ChevronRight, Wallet, X } from "lucide-react";
import Image from "next/image";
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
  const { updateSubscription } = useNextPaymentStore();
  return (
    <div
      className="flex flex-col justify-center w-full h-[210px] p-3 bg-white shadow-md rounded-md text-sm sm:text-base"
      onClick={() => {
        updateSubscription({
          SubscriptionTitle: title,
          subscriptionLogoUrl: imageUrl,
          subscriptionCategory: subscriptionCategory,
          remainingDays: remainingDays,
          startingDate: startingDate,
          endingDate: endingDate,
          subscriptionPrice: subscriptionPrice,
          subscriptionType: "",
          paymentsHistory: [],
        });
      }}
    >
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
        <div className="bg-gray-100 rounded-sm flex justify-center items-center p-1 my-3 text-nowrap">
          <CalendarDays />
          <span className="text-blue-600 mx-1">From</span> : {startingDate}
          <CalendarDays className="ml-1" />
          <span className="text-blue-600 mx-1">To</span>: {endingDate}
        </div>
        <div className=" flex flex-row justify-between">
          <div className="flex justify-center items-center flex-row space-x-2 bg-gray-100 w-[65%] p-2 rounded mt-2">
            <h3 className="text-4xl font-semibold">{remainingDays}</h3>
            <h6 className="text-gray-600">Days Left</h6>
          </div>
          <div className="flex flex-row justify-center items-center space-x-2 bg-gray-100 p-2 rounded mt-2 w-[30%] text-lg">
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
    <div className="w-full p-3 rounded-md bg-white shadow-md">
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
  subscriptionPrice: string | number;
  subscriptionCategory: string;
  endingDate: string;
}) {
  return (
    <div className="bg-white border border-gray-200 shadow-md flex flex-row h-[75px] p-3 justify-between text-nowrap w-full rounded-md">
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
    <div className="bg-white shadow-md w-[350px] h-[200px] py-8 rounded-md">
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
    <div className="h-full">
      <PieChartComponent />
    </div>
  );
}

export function BarChartCard({ total }: { total: number | null }) {
  return (
    <div className="h-full">
      <BarChartComponent total={total} />
    </div>
  );
}

export function SubscriptionDetailsCard() {
  const { subscription, updateSubscription } = useNextPaymentStore();
  return (
    <div className="bg-white shadow-md rounded-md w-[370px] h-[80vh] p-3 flex flex-col justify-between text-gray-500 relative">
      <button
        onClick={() => {
          updateSubscription(initialState);
        }}
        className="absolute right-0 -top-5 bg-white h-8 w-8 bg-transparent rounded-md flex items-center justify-center"
      >
        <X size={16} color="black" />
      </button>
      <div className="flex justify-between bg-gray-100 h-[80px] rounded-md px-6  items-center">
        <div className="flex space-x-5">
          <Image
            src={subscription.subscriptionLogoUrl}
            width={50}
            height={50}
            className="rounded-full overflow-hidden w-[50px] h-[50px]"
            alt="Subscription logo"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl text-gray-800">
              {subscription.SubscriptionTitle}
            </h2>
            <h6 className="text-sm text-gray-400">
              {subscription.subscriptionType}
            </h6>
          </div>
        </div>
        <ChevronRight />
      </div>
      <div className="space-y-3">
        <h5>Plan details</h5>

        <div className="bg-gray-100 h-[80px] rounded-md px-6 flex justify-between items-center">
          <div>
            <h3 className="text-gray-800 text-xl">
              {subscription.SubscriptionTitle}
            </h3>
            <h6 className="text-sm">{subscription.subscriptionCategory}</h6>
          </div>
          <Button variant="shine" className="bg-blue-500 text-white">
            Change
          </Button>
        </div>
        <div className="flex flex-row bg-gray-100 p-6">
          <div className="space-y-2 border-r w-1/3">
            <h5>Active</h5>
            <h5>Started at</h5>
            <h5>Ends at</h5>
          </div>
          <div className="space-y-2 ml-8 text-gray-800">
            <h5>{subscription.remainingDays} Days left</h5>
            <h5>{subscription.startingDate}</h5>
            <h5>{subscription.endingDate}</h5>
          </div>
        </div>
        <div className="">
          <h3>Payment History</h3>
          <ScrollArea className="h-[100px]">
            <div className="space-y-2">
              {subscription.paymentsHistory.map((payment, i) => {
                return (
                  <div
                    key={i}
                    className="bg-gray-100 h-[80px] rounded-md p-6 flex justify-between"
                  >
                    <div className="-translate-y-2">
                      <h5 className="text-gray-800 text-lg">
                        {payment.paymentDate}
                      </h5>
                      <h6 className="text-sm">{payment.paymentCategory}</h6>
                    </div>
                    <div className="h-6 w-6 bg-blue-600 rounded-full flex justify-center items-center ">
                      <Check color="white" size={18} />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
      <Button
        variant={"gooeyLeft"}
        type="button"
        className="text-white text-center bg-blue-600 w-full hover:bg-blue-800 p-2 rounded-md"
      >
        <Wallet className="mr-3" />
        Renew for ${subscription.subscriptionPrice}
      </Button>
    </div>
  );
}
