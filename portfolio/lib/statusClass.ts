import { LiveStatus } from "@/types/types";
export const statusClass = (status?: LiveStatus) => {
  switch (status) {
    case "Live":
      return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20";
    case "Development":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20";
    case "Maintenance":
      return "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20";
    case "Planned":
      return "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/20";
    case "Down":
      return "bg-zinc-500/15 text-zinc-400 ring-1 ring-zinc-500/20";
    default:
      return "bg-foreground/10 text-foreground ring-1 ring-foreground/15";
  }
};
