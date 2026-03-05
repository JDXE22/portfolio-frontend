import { KnowledgeLevel } from '@/types/types';

const LEVEL_SEGMENTS: Record<KnowledgeLevel, number> = {
  Foundational: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
};

const LEVEL_COLORS: Record<KnowledgeLevel, string> = {
  Foundational: 'bg-slate-400',
  Intermediate: 'bg-sky-400',
  Advanced: 'bg-emerald-400',
  Expert: 'bg-violet-400',
};

const LEVEL_TEXT_COLORS: Record<KnowledgeLevel, string> = {
  Foundational: 'text-slate-400',
  Intermediate: 'text-sky-400',
  Advanced: 'text-emerald-400',
  Expert: 'text-violet-400',
};

export const knowledgeLevelSegments = (level: KnowledgeLevel): number =>
  LEVEL_SEGMENTS[level] ?? 1;

export const knowledgeLevelColor = (level: KnowledgeLevel): string =>
  LEVEL_COLORS[level] ?? 'bg-slate-400';

export const knowledgeLevelTextColor = (level: KnowledgeLevel): string =>
  LEVEL_TEXT_COLORS[level] ?? 'text-slate-400';
