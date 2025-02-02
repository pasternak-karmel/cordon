"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getInstitutions } from "@/actions/banque/userBanque";
import InstitutionsSelector from "./institutions-selector";

import ErrorDisplay from "@/components/error-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextShimmer } from "@/components/ui/text-shimmer";
import AccountCallback from "./account-callback";

export default function AddCountry() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "GB";
  const ref = searchParams.get("ref");
  const error = searchParams.get("error");

  const [institutions, setInstitutions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      try {
        const data = await getInstitutions(country);
        setInstitutions(data);
      } catch (error) {
        console.error("Failed to fetch institutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, [country]);

  if (error !== null) {
    return ErrorDisplay({ error });
    // return ShowDestructive();
  } else {
    if (ref) return <AccountCallback callback={ref} />;
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Financial Institutions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TextShimmer className="font-mono text-sm">
              Getting institutions available in your country...
            </TextShimmer>
          ) : (
            <InstitutionsSelector institutions={institutions || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
