import React from "react";
import { LayoutGrid } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex flex-col">
      <div>
        <h4>Logo</h4>
      </div>
      <div>
        <div>
          <LayoutGrid />
        </div>
        <div>
          <LayoutGrid />
        </div>
        <div>
          <LayoutGrid />
        </div>
        <div>
          <LayoutGrid />
        </div>
        <div>
          <LayoutGrid />
        </div>
      </div>
    </div>
  );
}
