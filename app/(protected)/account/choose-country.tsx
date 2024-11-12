"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { countries } from "@/constant";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Search } from "lucide-react";

const ChooseCountry = () => {
  const router = useRouter();

  const handleClick = (country: string) => {
    router.push(`/add-account?country=${country}`);
  };

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="country" className="text-xl">
        Select a country
      </Label>
      <div className="relative">
        <Search className="absolute top-3 left-2" />
        <Input
          type="text"
          id="country"
          placeholder="Search..."
          className="h-12 pl-9 text-lg"
        />
        <ScrollArea className="grid grid-cols-2 gap-3 mt-4 w-full h-[400px] bg-red-500">
          {countries.map((country, i) => {
            return (
              <div
                onClick={() => handleClick(country.value)}
                key={i}
                className="flex flex-row justify-between border rounded-md py-4 px-4 hover:bg-gray-50"
              >
                <div className="flex space-x-3">
                  <Image
                    src={country.flag}
                    width={30}
                    height={20}
                    alt={country.description}
                  />
                  <span>{country.name}</span>
                </div>
                <ChevronRight />
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
};
export default ChooseCountry;
