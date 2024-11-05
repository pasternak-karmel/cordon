"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InstitutionProps } from "@/interface";

export default function InstitutionsSelector({
  institutions,
}: {
  institutions: InstitutionProps[];
}) {
  const [institutionSelected, setSelectedInstitution] = useState<string | null>(
    null
  );
  const router = useRouter();

  const handleInstitutionSelect = (value: string) => {
    setSelectedInstitution(value);
  };

  const handleLinkAccount = async () => {
    if (!institutionSelected) return;

    try {
      const response = await fetch("/api/init-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institutionId: institutionSelected,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize session");
      }

      const data = await response.json();
      router.push(data.link);
    } catch (error) {
      console.error("Error initializing session:", error);
    }
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={handleInstitutionSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your bank" />
        </SelectTrigger>
        <SelectContent>
          {institutions.map((institution) => (
            <SelectItem key={institution.id} value={institution.id}>
              <div className="flex items-center space-x-2">
                {/* J'ai use Image mais il fallait fais le truc de hosting là  (à faire après) */}
                <img
                  src={institution.logo}
                  alt={institution.name}
                  className="w-6 h-6"
                />
                <span>{institution.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleLinkAccount}
        disabled={!institutionSelected}
        className="w-full"
      >
        Link your Account
      </Button>
    </div>
  );
}
