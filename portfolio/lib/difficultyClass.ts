import { DifficultyLevel } from "@/types/types";

export const difficultyLevelClass = (difficultyLevel?: DifficultyLevel) => {
  switch (difficultyLevel) {
    case "Easy":
      return "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20";
    case "Medium":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20";
    case "Hard":
      return "bg-red-500/15 text-red-400 ring-1 ring-red-500/20";
    default:
      return "bg-foreground/10 text-foreground ring-1 ring-foreground/15";
  }
};
