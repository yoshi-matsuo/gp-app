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
  return records[date] ?? { date, activities: { ...DEFAULT_ROUNDS } };
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

export function getAllDayRecords(): DayRecord[] {
  const records = getAllRecords();
  return Object.values(records).sort((a, b) => a.date.localeCompare(b.date));
}
