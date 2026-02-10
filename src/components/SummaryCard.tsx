"use client";

import { Flame, Footprints } from "lucide-react";

interface SummaryCardProps {
  totalCalories: number;
  totalSteps: number;
}

export default function SummaryCard({ totalCalories, totalSteps }: SummaryCardProps) {
  return (
    <div className="bg-gradient-to-r from-[#DF0013] to-[#ff3347] rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-80">合計カロリー</p>
            <p className="text-3xl font-bold">
              {totalCalories.toLocaleString()}
              <span className="text-base font-normal ml-1">kcal</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
        <Footprints className="w-5 h-5 opacity-80" />
        <p className="text-sm">
          今日の運動は{" "}
          <span className="font-bold text-lg">{totalSteps.toLocaleString()}歩</span> 分
          （約{totalCalories.toLocaleString()}kcal）に相当します！
        </p>
      </div>
    </div>
  );
}
