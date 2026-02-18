export type ActivityType =
  | "mitt"
  | "mitthold"
  | "jumprope"
  | "sandbag"
  | "shadow"
  | "weighted"
  | "abs"
  | "squat"
  | "pushup"
  | "sparring_drill"
  | "sparring";

export interface ActivityConfig {
  key: ActivityType;
  label: string;
  caloriesPerRound: number;
  icon: string;
}

export interface DayRecord {
  date: string; // "YYYY-MM-DD"
  activities: Record<ActivityType, number>; // rounds per activity
  freeCalories?: number; // optional free-form calorie input
}

export interface DaySummary {
  date: string;
  totalCalories: number;
  totalSteps: number;
}
