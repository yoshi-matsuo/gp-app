"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, toJPDateString, parseDate, isToday, isFuture } from "@/lib/date-utils";

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const today = formatDate(new Date());

  const goToPrev = () => {
    const d = parseDate(selectedDate);
    d.setDate(d.getDate() - 1);
    onDateChange(formatDate(d));
  };

  const goToNext = () => {
    const d = parseDate(selectedDate);
    d.setDate(d.getDate() + 1);
    const next = formatDate(d);
    if (!isFuture(next)) {
      onDateChange(next);
    }
  };

  const goToToday = () => {
    onDateChange(today);
  };

  const nextDisabled = selectedDate >= today;
  const displayDate = parseDate(selectedDate);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={goToPrev}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 active:scale-95 transition-transform"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <div className="text-center min-w-[160px]">
        <p className="text-base font-bold text-white drop-shadow">{toJPDateString(displayDate)}</p>
        {isToday(selectedDate) && (
          <span className="text-[10px] font-semibold text-[#DF0013] bg-red-50 px-1.5 py-0.5 rounded-full">
            TODAY
          </span>
        )}
        {!isToday(selectedDate) && (
          <button
            onClick={goToToday}
            className="text-[10px] text-white/80 font-medium hover:underline"
          >
            今日に戻る
          </button>
        )}
      </div>
      <button
        onClick={goToNext}
        disabled={nextDisabled}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 active:scale-95 transition-transform disabled:opacity-30 disabled:active:scale-100"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>
      <input
        type="date"
        value={selectedDate}
        max={today}
        onChange={(e) => {
          if (e.target.value && !isFuture(e.target.value)) {
            onDateChange(e.target.value);
          }
        }}
        className="text-xs text-white bg-white/20 border border-white/30 rounded-lg px-2 py-1 ml-1"
      />
    </div>
  );
}
