import React from "react";
import Image from "next/image";

import { getAccessToken } from "@/actions/token/token";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ChevronRight } from "lucide-react";
import { countries } from "@/constant";
import { getInstitutions } from "@/actions/banque/userBanque";

export default async function Country() {
  await getAccessToken();

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
                      await getInstitutions(country.value);
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
