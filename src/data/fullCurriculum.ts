import { MODULES as BASE_MODULES } from "@/data/curriculum";
import { OTTER_CURRICULUM_20260712 } from "@/data/otterCurriculum20260712";

export type { Lesson, Section, Module } from "@/data/curriculum";

export const MODULES = [...BASE_MODULES, ...OTTER_CURRICULUM_20260712];
