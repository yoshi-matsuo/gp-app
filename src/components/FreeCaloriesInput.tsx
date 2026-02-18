"use client";

interface FreeCaloriesInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FreeCaloriesInput({ value, onChange }: FreeCaloriesInputProps) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="text-2xl w-10 text-center shrink-0">📝</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-800">その他の運動</p>
          <p className="text-xs text-gray-400">フリー入力</p>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={0}
            max={9999}
            value={value || ""}
            placeholder="0"
            onChange={(e) => {
              const v = parseInt(e.target.value) || 0;
              onChange(Math.min(9999, Math.max(0, v)));
            }}
            className="w-20 h-9 text-center text-lg font-bold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF0013]"
          />
          <span className="text-xs text-gray-500">kcal</span>
        </div>
      </div>
    </div>
  );
}
