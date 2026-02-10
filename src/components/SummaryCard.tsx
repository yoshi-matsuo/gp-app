"use client";

import { Flame, Footprints } from "lucide-react";

interface SummaryCardProps {
  totalCalories: number;
  totalSteps: number;
}

export default function SummaryCard({ totalCalories, totalSteps }: SummaryCardProps) {
  return (
    <div className="bg-gradient-to-r from-[#DF0013] to-[#ff3347] rounded-xl p-3 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">
          <Flame className="w-5 h-5" />
        </div>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-bold">
            {totalCalories.toLocaleString()}
          </p>
          <span className="text-sm font-normal opacity-80">kcal</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5 ml-auto">
          <Footprints className="w-4 h-4 opacity-80" />
          <p className="text-xs">
            <span className="font-bold text-sm">{totalSteps.toLocaleString()}</span>歩相当
          </p>
        </div>
      </div>
    </div>
  );
}
