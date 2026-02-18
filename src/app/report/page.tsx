"use client";

import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Flame, Footprints, Trophy } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { getAllDayRecords } from "@/lib/storage";
import { calcTotalCalories, caloriesToSteps } from "@/lib/constants";
import {
  formatDate,
  getWeekRange,
  getMonthRange,
  getYearRange,
  getDaysInRange,
} from "@/lib/date-utils";
import { DayRecord } from "@/lib/types";

type TabKey = "week" | "month" | "year" | "total";

const TABS: { key: TabKey; label: string }[] = [
  { key: "week", label: "週" },
  { key: "month", label: "月" },
  { key: "year", label: "年" },
  { key: "total", label: "累計" },
];

interface ChartDataItem {
  label: string;
  calories: number;
  steps: number;
}

function recordCalories(r: DayRecord): number {
  return calcTotalCalories(r.activities) + (r.freeCalories ?? 0);
}

function buildWeekData(records: DayRecord[]): ChartDataItem[] {
  const today = new Date();
  const { start } = getWeekRange(today);
  const days = getDaysInRange(start, today);
  const recordMap = new Map(records.map((r) => [r.date, r]));

  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];
  return days.map((d, i) => {
    const r = recordMap.get(d);
    const cal = r ? recordCalories(r) : 0;
    return { label: weekDays[i] || d.slice(8), calories: cal, steps: caloriesToSteps(cal) };
  });
}

function buildMonthData(records: DayRecord[]): ChartDataItem[] {
  const today = new Date();
  const { start } = getMonthRange(today);
  const recordMap = new Map(records.map((r) => [r.date, r]));

  // Group by week
  const weeks: ChartDataItem[] = [];
  let weekStart = new Date(start);
  let weekNum = 1;

  while (weekStart <= today) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const actualEnd = weekEnd > today ? today : weekEnd;
    const days = getDaysInRange(weekStart, actualEnd);
    let totalCal = 0;
    days.forEach((d) => {
      const r = recordMap.get(d);
      if (r) totalCal += recordCalories(r);
    });
    weeks.push({
      label: `${weekNum}週`,
      calories: totalCal,
      steps: caloriesToSteps(totalCal),
    });
    weekStart = new Date(weekEnd);
    weekStart.setDate(weekStart.getDate() + 1);
    weekNum++;
  }
  return weeks;
}

function buildYearData(records: DayRecord[]): ChartDataItem[] {
  const today = new Date();
  const recordMap = new Map(records.map((r) => [r.date, r]));
  const months: ChartDataItem[] = [];
  const monthLabels = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

  for (let m = 0; m <= today.getMonth(); m++) {
    const mStart = new Date(today.getFullYear(), m, 1);
    const mEnd = m === today.getMonth() ? today : new Date(today.getFullYear(), m + 1, 0);
    const days = getDaysInRange(mStart, mEnd);
    let totalCal = 0;
    days.forEach((d) => {
      const r = recordMap.get(d);
      if (r) totalCal += recordCalories(r);
    });
    months.push({
      label: monthLabels[m],
      calories: totalCal,
      steps: caloriesToSteps(totalCal),
    });
  }
  return months;
}

function buildTotalData(records: DayRecord[]): { totalCalories: number; totalSteps: number; days: number } {
  let totalCalories = 0;
  records.forEach((r) => {
    totalCalories += recordCalories(r);
  });
  return {
    totalCalories,
    totalSteps: caloriesToSteps(totalCalories),
    days: records.length,
  };
}

export default function ReportPage() {
  const [tab, setTab] = useState<TabKey>("week");
  const [records, setRecords] = useState<DayRecord[]>([]);

  useEffect(() => {
    setRecords(getAllDayRecords());
  }, []);

  const weekData = useMemo(() => buildWeekData(records), [records]);
  const monthData = useMemo(() => buildMonthData(records), [records]);
  const yearData = useMemo(() => buildYearData(records), [records]);
  const totalData = useMemo(() => buildTotalData(records), [records]);

  const chartData = tab === "week" ? weekData : tab === "month" ? monthData : yearData;

  return (
    <div className="min-h-screen bg-bg pb-20">
      <header className="bg-[#DF0013] text-white px-4 pt-12 pb-6">
        <h1 className="text-lg font-bold text-center">レポート</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4">
        {/* Tabs */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm mb-5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                tab === t.key
                  ? "bg-[#DF0013] text-white shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab !== "total" ? (
          <>
            {/* Chart */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
              <h2 className="text-sm font-bold text-gray-600 mb-3">
                消費カロリー（kcal）
              </h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value: number | undefined, name: string | undefined) => [
                      `${(value ?? 0).toLocaleString()}${name === "calories" ? "kcal" : "歩"}`,
                      name === "calories" ? "カロリー" : "歩数換算",
                    ]}
                  />
                  <Legend
                    formatter={(value: string | undefined) =>
                      value === "calories" ? "カロリー" : "歩数換算"
                    }
                  />
                  <Bar dataKey="calories" fill="#DF0013" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Steps Chart */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
              <h2 className="text-sm font-bold text-gray-600 mb-3">
                歩数換算（歩）
              </h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()}歩`, "歩数換算"]}
                  />
                  <Bar dataKey="steps" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Period Summary */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Flame className="w-6 h-6 text-[#DF0013] mx-auto mb-1" />
                <p className="text-xs text-gray-500">期間合計カロリー</p>
                <p className="text-xl font-bold text-gray-800">
                  {chartData.reduce((s, d) => s + d.calories, 0).toLocaleString()}
                  <span className="text-xs font-normal ml-0.5">kcal</span>
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Footprints className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-gray-500">期間合計歩数換算</p>
                <p className="text-xl font-bold text-gray-800">
                  {chartData.reduce((s, d) => s + d.steps, 0).toLocaleString()}
                  <span className="text-xs font-normal ml-0.5">歩</span>
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Total / Cumulative */
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#DF0013] to-[#ff3347] rounded-2xl p-6 text-white shadow-lg text-center">
              <Trophy className="w-10 h-10 mx-auto mb-2 opacity-90" />
              <p className="text-sm opacity-80 mb-1">累計記録日数</p>
              <p className="text-4xl font-bold">{totalData.days}<span className="text-lg ml-1">日</span></p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                <Flame className="w-7 h-7 text-[#DF0013] mx-auto mb-2" />
                <p className="text-xs text-gray-500 mb-1">累計カロリー</p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalData.totalCalories.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                <Footprints className="w-7 h-7 text-orange-500 mx-auto mb-2" />
                <p className="text-xs text-gray-500 mb-1">累計歩数換算</p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalData.totalSteps.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">歩</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
