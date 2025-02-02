import { getAccountDetails } from "@/actions/banque/userBanque";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

function AccountDetails({ accountInfo }: { accountInfo: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(accountInfo).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{key}</TableCell>
            <TableCell>
              {Array.isArray(value) ? (
                // Handle arrays like "transactions.booked" and "transactions.pending"
                <div>
                  {value.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold">Transaction {index + 1}</h3>
                      <Table>
                        <TableBody>
                          {Object.entries(item).map(([subKey, subValue]) => (
                            <TableRow key={subKey}>
                              <TableCell className="font-medium">
                                {subKey}
                              </TableCell>
                              <TableCell>
                                {typeof subValue === "object" &&
                                subValue !== null ? (
                                  // If the value is a nested object (like debtorAccount or transactionAmount), render its fields
                                  <Table>
                                    <TableBody>
                                      {Object.entries(subValue).map(
                                        ([nestedKey, nestedValue]) => (
                                          <TableRow key={nestedKey}>
                                            <TableCell className="font-medium">
                                              {nestedKey}
                                            </TableCell>
                                            <TableCell>
                                              {String(nestedValue)}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>
                                ) : (
                                  String(subValue)
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              ) : typeof value === "object" && value !== null ? (
                // Handle nested objects like "transactions"
                <AccountDetails accountInfo={value} />
              ) : (
                // Render primitive values (strings, numbers)
                String(value)
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type Params = Promise<{ id: string }>;

export default async function AccountPage(props: { params: Params }) {
  const { id } = await props.params;
  // console.log("this is my id", id);

  try {
    // const monId = "4972f160-e90e-4f92-9ce2-7b18457eea17";
    //
    const accountInfo = await getAccountDetails(id);

    if (!accountInfo) {
      notFound();
    }

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading account details...</div>}>
            <AccountDetails accountInfo={accountInfo} />
          </Suspense>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("Error fetching account details:", error);

    return (
      <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching account details."}
        </AlertDescription>
      </Alert>
    );
  }
}
