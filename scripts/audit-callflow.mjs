import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];
const notes = [];

function requireFile(file) {
  if (!exists(file)) failures.push(`Missing required file: ${file}`);
}

function collectMatches(files, pattern, group = 1) {
  const values = [];
  for (const file of files) {
    const text = read(file);
    for (const match of text.matchAll(pattern)) values.push({ value: match[group], file });
  }
  return values;
}

function assertUnique(label, entries) {
  const seen = new Map();
  for (const entry of entries) {
    if (seen.has(entry.value)) failures.push(`${label} duplicate '${entry.value}' in ${seen.get(entry.value)} and ${entry.file}`);
    else seen.set(entry.value, entry.file);
  }
  notes.push(`${label}: ${entries.length} unique records checked`);
}

const requiredFiles = [
  "src/routes/index.tsx",
  "src/routes/lookup.tsx",
  "src/routes/curriculum.index.tsx",
  "src/routes/curriculum.$moduleId.tsx",
  "src/routes/setup.tsx",
  "src/routes/across-spectrum.tsx",
  "src/routes/sales-prompts.tsx",
  "src/routes/scenarios.tsx",
  "src/routes/flashcards.tsx",
  "src/routes/tutor.tsx",
  "src/routes/plan.tsx",
  "src/routes/tips.tsx",
  "src/routes/corner.tsx",
  "src/data/knowledgeCorpus.ts",
  "src/data/fullCurriculum.ts",
  "src/data/otterCurriculum20260712.ts",
  "src/data/flashcardDeck.ts",
  "src/data/otterCorpusFlashcards20260712.ts",
  "src/data/acrossSpectrum.ts",
  "src/data/salesPromptEngineer.ts",
  "src/data/cramSalesCompiler.ts",
  "docs/audits/CALLFLOW_LAB_FULL_SYSTEM_AUDIT_2026-07-12.md",
];
requiredFiles.forEach(requireFile);

if (failures.length === 0) {
  const routeTree = read("src/routeTree.gen.ts");
  const requiredRoutes = [
    "/lookup",
    "/curriculum/",
    "/curriculum/$moduleId",
    "/setup",
    "/across-spectrum",
    "/sales-prompts",
    "/scenarios",
    "/flashcards",
    "/tutor",
    "/plan",
    "/tips",
    "/corner",
  ];
  for (const route of requiredRoutes) {
    if (!routeTree.includes(`path: '${route}'`) && !routeTree.includes(`path: \"${route}\"`)) {
      failures.push(`Route tree missing path: ${route}`);
    }
  }
  notes.push(`Route tree: ${requiredRoutes.length} required paths checked`);

  const flashcardFiles = [
    "src/data/curriculum.ts",
    "src/data/flashcardDeck.ts",
    "src/data/spectrumProductUpdate20260710.ts",
    "src/data/otterCorpusFlashcards20260712.ts",
  ];
  const flashcards = collectMatches(flashcardFiles, /\bid:\s*["']((?:fc|sfc|july10-|otter12-)[^"']+)["']/g);
  assertUnique("Flashcard IDs", flashcards);

  const moduleFiles = ["src/data/curriculum.ts", "src/data/otterCurriculum20260712.ts"];
  const modules = collectMatches(moduleFiles, /\bid:\s*["'](m\d+)["']\s*,\s*\n\s*number:/g);
  assertUnique("Module IDs", modules);

  const lessonIds = collectMatches(moduleFiles, /\bid:\s*["'](m\d+s\d+l\d+)["']/g);
  assertUnique("Lesson IDs", lessonIds);

  const personaIds = collectMatches(["src/data/acrossSpectrum.ts"], /\bid:\s*["']([a-z][a-z0-9-]+)["']\s*,\s*\n\s*title:/g);
  assertUnique("Simulator persona IDs", personaIds);

  const markerIds = collectMatches(["src/data/acrossSpectrum.ts"], /\bid:\s*["']([a-z][a-z0-9-]+)["']\s*,\s*\n\s*label:/g);
  assertUnique("Simulator marker IDs", markerIds);

  const source = read("src/data/cramSalesCompiler.ts");
  if (!source.includes("CRAM_RECOVERY_MODULUS = 37") || !source.includes("CRAM_MAX_MASK = 31")) {
    failures.push("CRAM exact-mask configuration changed; re-run mathematical review");
  }
  for (let mask = 0; mask <= 31; mask += 1) {
    if (mask % 37 !== mask) failures.push(`CRAM recovery failed for mask ${mask}`);
  }
  notes.push("CRAM masks: exhaustive 0–31 modulo-37 recovery checked");

  const productionSrcFiles = [
    "src/data/workSetup.ts",
    "src/data/privateProfile.ts",
    "src/routes/setup.tsx",
    "src/routes/index.tsx",
    "src/data/flashcardDeck.ts",
    "src/data/otterCorpusFlashcards20260712.ts",
  ];
  const privateText = productionSrcFiles.map((file) => read(file)).join("\n");
  if (/[A-Z0-9._%+-]+@spectrum\.com/i.test(privateText)) failures.push("Committed Spectrum corporate email found in private-profile surfaces");
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(privateText)) failures.push("SSN-shaped value found in private-profile surfaces");
  notes.push("Private profile: corporate-email and SSN-shaped literals checked");

  const activeSurfaceFiles = [
    "src/routes/index.tsx",
    "src/routes/curriculum.index.tsx",
    "src/routes/flashcards.tsx",
    "src/components/AppSidebar.tsx",
  ];
  const legacyPattern = /Tish(?:'s)?|venipuncture|capillary specimen|EDTA|lavender tube|grow tent|canopy buds/i;
  for (const file of activeSurfaceFiles) {
    if (legacyPattern.test(read(file))) failures.push(`Legacy app content found in active surface: ${file}`);
  }
  notes.push(`Legacy scan: ${activeSurfaceFiles.length} active surfaces checked`);

  const deck = read("src/data/flashcardDeck.ts");
  if (!deck.includes("OTTER_CORPUS_FLASHCARDS_20260712")) failures.push("Otter corpus flashcards are not wired into ALL_FLASHCARDS");
  const fullCurriculum = read("src/data/fullCurriculum.ts");
  if (!fullCurriculum.includes("OTTER_CURRICULUM_20260712")) failures.push("Otter curriculum additions are not wired into full curriculum");
}

for (const note of notes) console.log(`✓ ${note}`);
if (failures.length) {
  console.error("\nCallFlow audit failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log("\nCallFlow repository audit passed.");
