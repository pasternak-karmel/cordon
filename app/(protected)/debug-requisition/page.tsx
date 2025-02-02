import { getAccessToken } from "@/actions/token/token";
import ErrorDisplay from "@/components/error-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getOneRequisition(id: string, token: string) {
  console.log(id);
  const response = await fetch(
    `https://bankaccountdata.gocardless.com/api/v2/requisitions/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // 1fcdb202-0101-4c80-a31b-708a2aadd938
  if (!response.ok) {
    throw new Error(
      `Failed to fetch requisition: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export default async function DebugRequisitionPage({
  searchParams,
}: {
  searchParams: { requisitionId: string };
}) {
  const { requisitionId } = await searchParams;

  try {
    const token = await getAccessToken();
    console.log("Access token obtained:", token.slice(0, 10) + "...");

    const requisitionData = await getOneRequisition(requisitionId, token);
    console.log("Requisition data fetched successfully");

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Requisition Data (Debug)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(requisitionData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return ErrorDisplay({ error: error as Error });
  }
}
