"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccountInfo } from "@/interface";

interface AccountDetailsProps {
  accountInfo: AccountInfo;
}

export default function AccountDetails({ accountInfo }: AccountDetailsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Account ID</TableCell>
          <TableCell>{accountInfo.resourceId}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>IBAN</TableCell>
          <TableCell>{accountInfo.iban}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Currency</TableCell>
          <TableCell>{accountInfo.currency}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Owner Name</TableCell>
          <TableCell>{accountInfo.ownerName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Account Name</TableCell>
          <TableCell>{accountInfo.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell>{accountInfo.product}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Account Type</TableCell>
          <TableCell>{accountInfo.cashAccountType}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
