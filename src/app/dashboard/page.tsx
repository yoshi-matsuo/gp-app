"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import DatePicker from "@/components/DatePicker";
import ActivityRow from "@/components/ActivityRow";
import FreeCaloriesInput from "@/components/FreeCaloriesInput";
import SummaryCard from "@/components/SummaryCard";
import BottomNav from "@/components/BottomNav";
import { ACTIVITIES, calcTotalCalories, caloriesToSteps } from "@/lib/constants";
import { getRecord, updateActivity, updateFreeCalories } from "@/lib/storage";
import { formatDate } from "@/lib/date-utils";
import { ActivityType, DayRecord } from "@/lib/types";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [record, setRecord] = useState<DayRecord | null>(null);

  const loadRecord = useCallback((date: string) => {
    setRecord(getRecord(date));
  }, []);

  useEffect(() => {
    loadRecord(selectedDate);
  }, [selectedDate, loadRecord]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleRoundsChange = (activity: ActivityType, rounds: number) => {
    const updated = updateActivity(selectedDate, activity, rounds);
    setRecord({ ...updated });
  };

  const handleFreeCaloriesChange = (value: number) => {
    const updated = updateFreeCalories(selectedDate, value);
    setRecord({ ...updated });
  };

  if (!record) return null;

  const activityCalories = calcTotalCalories(record.activities);
  const totalCalories = activityCalories + (record.freeCalories ?? 0);
  const totalSteps = caloriesToSteps(totalCalories);

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header */}
      <header className="bg-[#DF0013] text-white px-4 pt-6 pb-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Image src="/logo.png" alt="Logo" width={64} height={64} />
          <h1 className="text-lg font-bold">Activity Tracker</h1>
        </div>
        <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
      </header>

      <main className="max-w-lg mx-auto px-4">
        {/* Summary */}
        <div className="mb-3 mt-2">
          <SummaryCard totalCalories={totalCalories} totalSteps={totalSteps} />
        </div>

        {/* Activity Inputs */}
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          種目別ラウンド数
        </h2>
        <div className="space-y-2 mb-4">
          {ACTIVITIES.map((config) => (
            <ActivityRow
              key={config.key}
              config={config}
              rounds={record.activities[config.key] ?? 0}
              onChange={(rounds) => handleRoundsChange(config.key, rounds)}
            />
          ))}
        </div>

        {/* Free Calories Input */}
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          その他の消費カロリー
        </h2>
        <div className="mb-6">
          <FreeCaloriesInput
            value={record.freeCalories ?? 0}
            onChange={handleFreeCaloriesChange}
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
