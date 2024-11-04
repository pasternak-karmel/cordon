import { Suspense } from "react";
import InstitutionsList from "./institutions-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getAccessToken() {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/token/new/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //Pas forcément les deux
        secret_id: process.env.SECRET_ID,
        secret_key: process.env.SECRET_KEY,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access;
}

async function getInstitutions(accessToken: string) {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/institutions/",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch institutions: ${response.statusText}`);
  }

  return response.json();
}

async function fetchInstitutionsData() {
  const accessToken = await getAccessToken();
  return getInstitutions(accessToken);
}

export default async function InstitutionsPage() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Financial Institutions</CardTitle>
        <CardDescription>
          List of available financial institutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading institutions...</div>}>
          <InstitutionsList institutionsPromise={fetchInstitutionsData()} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
