import { ActivityConfig, ActivityType } from "./types";

export const ACTIVITIES: ActivityConfig[] = [
  { key: "mitt", label: "ミット打ち", caloriesPerRound: 40, icon: "🥊" },
  { key: "mitthold", label: "ミット持ち", caloriesPerRound: 20, icon: "🤝" },
  { key: "jumprope", label: "縄跳び", caloriesPerRound: 35, icon: "🤸" },
  { key: "sandbag", label: "サンドバッグ", caloriesPerRound: 35, icon: "🥋" },
  { key: "shadow", label: "シャドー", caloriesPerRound: 22, icon: "🥷" },
  { key: "weighted", label: "加重トレ", caloriesPerRound: 15, icon: "🏋️" },
  { key: "abs", label: "腹筋", caloriesPerRound: 16, icon: "🔥" },
  { key: "squat", label: "スクワット", caloriesPerRound: 20, icon: "🦵" },
  { key: "pushup", label: "腕立て伏せ", caloriesPerRound: 17, icon: "💪" },
  { key: "sparring_drill", label: "対人練習", caloriesPerRound: 35, icon: "🤼" },
  { key: "sparring", label: "スパーリング", caloriesPerRound: 50, icon: "👊" },
];

export const ACTIVITY_MAP: Record<ActivityType, ActivityConfig> = Object.fromEntries(
  ACTIVITIES.map((a) => [a.key, a])
) as Record<ActivityType, ActivityConfig>;

export const DEFAULT_ROUNDS: Record<ActivityType, number> = {
  mitt: 0,
  mitthold: 0,
  jumprope: 0,
  sandbag: 0,
  shadow: 0,
  weighted: 0,
  abs: 0,
  squat: 0,
  pushup: 0,
  sparring_drill: 0,
  sparring: 0,
};

export function calcTotalCalories(activities: Record<ActivityType, number>): number {
  return ACTIVITIES.reduce((sum, a) => sum + (activities[a.key] ?? 0) * a.caloriesPerRound, 0);
}

export function caloriesToSteps(calories: number): number {
  return Math.round((calories / 400) * 10000);
}
