import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import LinkBankAccount from "./link-bank-account";
import InstitutionsSelector from "./institutions-selector";

async function getAccessToken() {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/token/new/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret_id: process.env.GO_CARDLESS_SECRET_ID,
        secret_key: process.env.GO_CARDLESS_SECRET_KEY,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access;
}

//pour initier une session
// async function initSession(accessToken: string) {
//   const response = await fetch(
//     "https://bankaccountdata.gocardless.com/api/v2/requisitions/?country=gb",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({
//         redirect: "https://gocardless.com",
//         institution_id: "REVOLUT_REVOGB21",
//         reference: crypto.randomUUID(),
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Failed to initialize session: ${response.statusText}`);
//   }

//   return response.json();
// }

async function getInstitutions(accessToken: string) {

  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/institutions/?country=GB",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    //Après on crée le composant pour handle les erreurs et après throw the error
    throw new Error(`Failed to fetch institutions: ${response.statusText}`);
  }

  return response.json();
}

export default async function InstitutionsPage() {
  //a ne pas call toute les fois donc when neccessary
  const accessToken = await getAccessToken();
  //for testing purpose
  // const sessionData = await initSession(accessToken);
  const institutions = await getInstitutions(accessToken);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Financial Institutions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* with special institutions id */}
        {/* <Suspense fallback={<div>Chargement...</div>}>
          <LinkBankAccount linkUrl={sessionData.link} />
        </Suspense> */}
        <Suspense fallback={<div>Loading institutions...</div>}>
          <InstitutionsSelector
            institutions={institutions}
            accessToken={accessToken}
          />
        </Suspense>
        {/* <pre>{JSON.stringify(InstitutionData, null, 2)}</pre> */}
      </CardContent>
    </Card>
  );
}

{
  /* <Suspense fallback={<div>Loading institutions...</div>}>
          <InstitutionsList institutionsPromise={fetchInstitutionsData()} />
        </Suspense> */
}

// async function getInstitutions(accessToken: string) {
//   const response = await fetch(
//     "https://bankaccountdata.gocardless.com/api/v2/institutions/",
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Failed to fetch institutions: ${response.statusText}`);
//   }

//   return response.json();
// }

// async function PrendreInstitutions() {
//   const accessToken = await getAccessToken();
//   return getInstitutions(accessToken);
// }
