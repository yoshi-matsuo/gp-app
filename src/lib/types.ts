export type ActivityType =
  | "mitt"
  | "jumprope"
  | "sandbag"
  | "shadow"
  | "bodyweight"
  | "weighted";

export interface ActivityConfig {
  key: ActivityType;
  label: string;
  caloriesPerRound: number;
  icon: string;
}

export interface DayRecord {
  date: string; // "YYYY-MM-DD"
  activities: Record<ActivityType, number>; // rounds per activity
}

export interface DaySummary {
  date: string;
  totalCalories: number;
  totalSteps: number;
}
