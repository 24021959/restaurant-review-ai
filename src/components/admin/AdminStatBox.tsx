
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminStatBoxProps {
  title: string;
  value: number | null;
  icon: React.ReactNode;
  color?: string;
}

export default function AdminStatBox({
  title,
  value,
  icon,
  color = "bg-gray-200",
}: AdminStatBoxProps) {
  return (
    <div className={`p-5 rounded-xl shadow-xl flex items-center gap-4 ${color} min-h-[108px]`}>
      <div className="flex items-center justify-center rounded-lg bg-black/10 w-12 h-12">
        {icon}
      </div>
      <div>
        <div className="text-white text-lg font-semibold">{title}</div>
        {value === null ? (
          <Skeleton className="h-7 w-24 mt-1 bg-white/30" />
        ) : (
          <div className="text-2xl font-bold text-white mt-1">{value}</div>
        )}
      </div>
    </div>
  );
}
