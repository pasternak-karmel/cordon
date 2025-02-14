"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChartProps } from "@/interface";

export function BarChartComponent({ data, total }: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{total ? `$${total}` : "0$"}</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="fill-primary opacity-80"
                />
              ))}
            </Bar>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0].payload.name}
                          </span>
                          <span className="font-bold text-muted-foreground">
                            ${payload[0].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
