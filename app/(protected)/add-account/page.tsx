"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import InstitutionsSelector from "./institutions-selector";
import { getInstitutions } from "@/actions/banque/userBanque";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountCallback from "./account-callback";

export default function AddCountry() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "GB";
  const callback = searchParams.get("ref" || "error");

  const [institutions, setInstitutions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching country");
    const fetchInstitutions = async () => {
      setLoading(true);
      try {
        const data = await getInstitutions(country);
        setInstitutions(data);
        console.log("country fetched");
      } catch (error) {
        console.error("Failed to fetch institutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, [country]);

  if (callback) return <AccountCallback callback={callback} />;

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Financial Institutions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Getting institutions...</div>
          ) : (
            <InstitutionsSelector institutions={institutions || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
