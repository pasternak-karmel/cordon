"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { countries } from "@/constant";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Search } from "lucide-react";

const ChooseCountry = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleClick = (country: string) => {
    router.push(`/add-account?country=${country}`);
  };

  return (
    <div className="grid w-full gap-4">
      <Label htmlFor="country" className="text-lg font-medium">
        Select a Country
      </Label>
      <div className="relative">
        <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          id="country"
          placeholder="Search countries..."
          className="h-12 pl-10 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[400px] w-full rounded-md border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
          {filteredCountries.map((country, i) => (
            <div
              key={i}
              onClick={() => handleClick(country.value)}
              className="flex items-center justify-between space-x-4 rounded-md border p-3 transition-colors hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="relative h-6 w-9 overflow-hidden rounded-sm">
                  <Image
                    src={country.flag || "/placeholder.svg"}
                    alt={country.description}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="font-medium">{country.name}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export default ChooseCountry;
