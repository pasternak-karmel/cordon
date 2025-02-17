"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";
import AccountPage from "../(compte)/account/page";

export default function ConnectedAccounts() {
  const {
    data: connectedAccounts,
    isLoading,
    error,
  } = trpc.getConnectedAccounts.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {connectedAccounts && connectedAccounts?.length === 0 ? (
              <AccountPage />
            ) : (
              <Card className="w-full">
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Institution</TableHead>
                        <TableHead>Last Synced</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connectedAccounts?.map((account) => (
                        <TableRow key={account.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            {account.institutionName}
                          </TableCell>
                          <TableCell>
                            {account.lastSyncAt
                              ? new Date(account.lastSyncAt).toLocaleString()
                              : "Never"}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Sync
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
