import { ActivityConfig, ActivityType } from "./types";

export const ACTIVITIES: ActivityConfig[] = [
  { key: "mitt", label: "ミット打ち", caloriesPerRound: 40, icon: "🥊" },
  { key: "jumprope", label: "縄跳び", caloriesPerRound: 35, icon: "🤸" },
  { key: "sandbag", label: "サンドバッグ", caloriesPerRound: 35, icon: "🥋" },
  { key: "shadow", label: "シャドー", caloriesPerRound: 22, icon: "🥷" },
  { key: "bodyweight", label: "自重トレ", caloriesPerRound: 10, icon: "💪" },
  { key: "weighted", label: "加重トレ", caloriesPerRound: 15, icon: "🏋️" },
];

export const ACTIVITY_MAP: Record<ActivityType, ActivityConfig> = Object.fromEntries(
  ACTIVITIES.map((a) => [a.key, a])
) as Record<ActivityType, ActivityConfig>;

export const DEFAULT_ROUNDS: Record<ActivityType, number> = {
  mitt: 0,
  jumprope: 0,
  sandbag: 0,
  shadow: 0,
  bodyweight: 0,
  weighted: 0,
};

export function calcTotalCalories(activities: Record<ActivityType, number>): number {
  return ACTIVITIES.reduce((sum, a) => sum + activities[a.key] * a.caloriesPerRound, 0);
}

export function caloriesToSteps(calories: number): number {
  return Math.round((calories / 400) * 10000);
}
