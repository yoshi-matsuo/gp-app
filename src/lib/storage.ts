import { ActivityType, DayRecord } from "./types";
import { DEFAULT_ROUNDS } from "./constants";

const STORAGE_KEY = "gp-app-records";

function getAllRecords(): Record<string, DayRecord> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveAllRecords(records: Record<string, DayRecord>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function getRecord(date: string): DayRecord {
  const records = getAllRecords();
  const stored = records[date];
  if (!stored) {
    return { date, activities: { ...DEFAULT_ROUNDS }, freeCalories: 0 };
  }
  // Backward compatibility: merge with DEFAULT_ROUNDS so new keys get 0,
  // and old keys (e.g. bodyweight) are silently ignored by calorie calc
  return {
    date: stored.date,
    activities: { ...DEFAULT_ROUNDS, ...stored.activities },
    freeCalories: stored.freeCalories ?? 0,
  };
}

export function saveRecord(record: DayRecord) {
  const records = getAllRecords();
  records[record.date] = record;
  saveAllRecords(records);
}

export function updateActivity(date: string, activity: ActivityType, rounds: number) {
  const record = getRecord(date);
  record.activities[activity] = Math.max(0, rounds);
  saveRecord(record);
  return record;
}

export function updateFreeCalories(date: string, value: number) {
  const record = getRecord(date);
  record.freeCalories = Math.max(0, value);
  saveRecord(record);
  return record;
}

export function getAllDayRecords(): DayRecord[] {
  const records = getAllRecords();
  return Object.values(records).sort((a, b) => a.date.localeCompare(b.date));
}
