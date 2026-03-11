import { ClassValue } from "@/types/ui.types";
export const classNameGenerator = (...cls: ClassValue[]) =>
  cls.filter(Boolean).join(" ");
