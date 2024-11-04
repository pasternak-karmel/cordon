"use client";

import { use, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function InstitutionsList({ institutionsPromise }) {
  const [filter, setFilter] = useState("");
  const institutions = use(institutionsPromise);

  const filteredInstitutions = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Filter institutions..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInstitutions.map((inst) => (
            <TableRow key={inst.id}>
              <TableCell>{inst.name}</TableCell>
              <TableCell>{inst.id}</TableCell>
              <TableCell>{inst.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
