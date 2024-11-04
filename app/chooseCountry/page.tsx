"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getInstitutions } from "@/lib/function";
import { getAccessToken } from "@/lib/function";

export default function Country() {
  useEffect(() => {
    getAccessToken();
  }, []);
  const countries: {
    flag: string;
    name: string;
    description: string;
    value: string;
  }[] = [
    {
      flag: "/austria.svg",
      name: "Austria",
      description: "Austria's flag",
      value: "AS",
    },
    {
      flag: "/germany.png",
      name: "Germany",
      description: "Germany's flag",
      value: "AS",
    },
    {
      flag: "/denmark.png",
      name: "Denmark",
      description: "Denmark's flag",
      value: "AS",
    },
    {
      flag: "/finland.png",
      name: "Finland",
      description: "Finland's flag",
      value: "AS",
    },
    {
      flag: "/uk.svg",
      name: "United Kingdom",
      description: "United Kingdom's flag",
      value: "AS",
    },
    {
      flag: "/netherlands.png",
      name: "Netherlands",
      description: "Netherlands's flag",
      value: "AS",
    },
    {
      flag: "/norway.png",
      name: "Norway",
      description: "Norway's flag",
      value: "AS",
    },
    {
      flag: "/sweden.png",
      name: "Sweden",
      description: "Sweden's flag",
      value: "AS",
    },
  ];
  return (
    <div className="h-screen w-full flex">
      <div className="bg-gray-50 w-[45%] h-full flex justify-center items-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dicta
        id vitae aperiam minima dolores nihil tempora, cum error maiores qui,
        porro consequuntur unde veritatis fugit doloribus. Soluta, minima a.
      </div>
      <div className="bg-white w-[55%] h-full flex flex-col justify-center items-center px-20">
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
            <div className="grid grid-cols-2 gap-3 mt-4">
              {countries.map((country, i) => {
                return (
                  <div
                    onClick={async () => {
                      const a = await getInstitutions(country.value);
                      console.log(a);
                    }}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
