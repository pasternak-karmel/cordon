import { getAccountInfo } from "@/actions/banque/userBanque";
import ErrorDisplay from "@/components/error-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountInfo } from "@/interface";
import { Suspense } from "react";
import AccountDetails from "./account-details";

export default async function AccountInfoPage({
  searchParams,
}: {
  searchParams: { requisitionId: string };
}) {
  const { requisitionId } = await searchParams;

  try {
    const accountInfo: AccountInfo = await getAccountInfo(requisitionId);

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading account details...</div>}>
            <AccountDetails accountInfo={accountInfo} />
          </Suspense>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return <ErrorDisplay error={error} />;
  }
}
