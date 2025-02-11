"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InstitutionProps } from "@/interface";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InstitutionsSelector({
  institutions,
}: {
  institutions: InstitutionProps[];
}) {
  const [institutionSelected, setSelectedInstitution] = useState<string | null>(
    null
  );
  const router = useRouter();

  const { data: canAdd, isLoading } = trpc.canAddAccount.useQuery();

  const handleInstitutionSelect = (value: string) => {
    setSelectedInstitution(value);
  };

  const handleLinkAccount = async () => {
    if (!institutionSelected) return;

    try {
      const response = await fetch("/api/user/init-session", {
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

      if (data.error) {
        throw new Error(data.error);
      }

      // @brunel : save requisitionId in the session (pas la session qui persiste unh)
      localStorage.setItem("requisitionId", data.id);

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
        disabled={!institutionSelected || !canAdd || isLoading}
        className="w-full"
      >
        Link your Account
      </Button>
    </div>
  );
}
