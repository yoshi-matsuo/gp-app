"use client";

import { Minus, Plus } from "lucide-react";
import { ActivityConfig } from "@/lib/types";

interface ActivityRowProps {
  config: ActivityConfig;
  rounds: number;
  onChange: (rounds: number) => void;
}

export default function ActivityRow({ config, rounds, onChange }: ActivityRowProps) {
  const calories = rounds * config.caloriesPerRound;

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
      <div className="text-2xl w-10 text-center shrink-0">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-800">{config.label}</p>
        <p className="text-xs text-gray-400">{config.caloriesPerRound}kcal / R</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(0, rounds - 1))}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <input
          type="number"
          min={0}
          max={99}
          value={rounds}
          onChange={(e) => {
            const v = parseInt(e.target.value) || 0;
            onChange(Math.min(99, Math.max(0, v)));
          }}
          className="w-12 h-9 text-center text-lg font-bold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF0013]"
        />
        <button
          onClick={() => onChange(Math.min(99, rounds + 1))}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#DF0013] active:bg-[#b8000f] transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>
      <div className="w-16 text-right shrink-0">
        <p className="text-sm font-bold text-[#DF0013]">{calories}<span className="text-xs font-normal">kcal</span></p>
      </div>
    </div>
  );
}
