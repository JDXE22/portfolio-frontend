import { ClassValue } from "@/types/types";
export const classNameGenerator = (...cls: ClassValue[]) =>
  cls.filter(Boolean).join(" ");
