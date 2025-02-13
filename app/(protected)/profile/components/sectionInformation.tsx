import React from 'react'

export default function SectionInformation ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) {
    return (
      <div className="flex flex-col gap-1">
        <h6 className="text-sm text-gray-400">{title}</h6>
        <h6>{value}</h6>
      </div>
    );
  };
