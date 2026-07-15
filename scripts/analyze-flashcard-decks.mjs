import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return "";
}

function stringValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    return node.text;
  return "";
}

function stringArray(node) {
  if (!node || !ts.isArrayLiteralExpression(node)) return [];
  return node.elements.map(stringValue).filter(Boolean);
}

function objectCard(node, file) {
  const values = {};
  let deckTags = [];
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = propertyName(property.name);
    if (["id", "category", "front", "back", "origin"].includes(name))
      values[name] = stringValue(property.initializer);
    if (name === "deckTags") deckTags = stringArray(property.initializer);
  }
  if (!values.id || !values.front || !values.back) return null;
  return { ...values, file, deckTags, sourceStatus: "legacy" };
}

function cardsFromArray(file, variableName) {
  const source = ts.createSourceFile(
    file,
    read(file),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const cards = [];
  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === variableName &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(element)) continue;
        const card = objectCard(element, file);
        if (card) cards.push(card);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return cards;
}

function dailyCards() {
  const file = "src/data/dailyClassFlashcards20260714.ts";
  const source = ts.createSourceFile(
    file,
    read(file),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const cards = [];
  function visit(node) {
    if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression)) {
      ts.forEachChild(node, visit);
      return;
    }
    const name = node.expression.text;
    const args = node.arguments;
    if (name === "milestoneCard") {
      const questionNumber = Number(args[0]?.getText(source));
      cards.push({
        id: `daily14-mr-${String(questionNumber).padStart(2, "0")}`,
        category: "Milestone Review",
        front: `Milestone ${questionNumber} · ${stringValue(args[1])}`,
        back: stringValue(args[2]),
        deckTags: ["milestone", ...stringArray(args[3])],
        articleNumber: args[4] ? stringValue(args[4]) : "ARTICLE NEEDED",
        sourceStatus: args[6] ? stringValue(args[6]) : "needs-article",
        origin: "verbatim-assessment",
        file,
      });
    }
    if (name === "prepCard") {
      cards.push({
        id: `daily14-prep-${stringValue(args[0])}`,
        category: "Milestone Prep",
        front: stringValue(args[1]),
        back: stringValue(args[2]),
        deckTags: ["milestone"],
        articleNumber: "CLASS-2026-07-14",
        sourceStatus: "classroom-verified",
        origin: "verbatim-prep",
        file,
      });
    }
    if (name === "kahootCard") {
      cards.push({
        id: `daily14-kahoot-${stringValue(args[0])}`,
        category: "Kahoot",
        front: stringValue(args[1]),
        back: stringValue(args[2]),
        deckTags: ["kahoot", ...stringArray(args[3])],
        articleNumber: args[4] ? stringValue(args[4]) : "HOW7726",
        sourceStatus: args[6] ? stringValue(args[6]) : "article-verified",
        origin: "verbatim-assessment",
        file,
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return cards;
}

function gmailCards() {
  const file = "src/data/gmailProductFlashcards20260715.ts";
  const source = ts.createSourceFile(
    file,
    read(file),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const cards = [];
  function visit(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const name = node.expression.text;
      const args = node.arguments;
      if (name === "sourced" || name === "mastery") {
        const id = stringValue(args[0]);
        const articleNumber = stringValue(args[1]);
        const articleTitle = stringValue(args[2]);
        const isMastery = name === "mastery";
        cards.push({
          id: `gmail15-${isMastery ? "mastery-" : ""}${id}`,
          category: stringValue(args[3]),
          front: isMastery
            ? `Mastery scenario · ${stringValue(args[4])}`
            : `${articleNumber}: ${stringValue(args[4])}`,
          back: `${stringValue(args[5])} ${isMastery ? "Source basis" : "Source"}: ${articleNumber} — ${articleTitle}.`,
          deckTags: args[6] ? stringArray(args[6]) : ["mobile"],
          articleNumber,
          sourceStatus: "article-verified",
          origin: isMastery ? "generated-mastery" : "source-derived",
          file,
        });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return cards;
}

const existingCards = [
  ...cardsFromArray("src/data/curriculum.ts", "FLASHCARDS"),
  ...cardsFromArray("src/data/flashcardDeck.ts", "SUPPLEMENTAL_FLASHCARDS"),
  ...cardsFromArray(
    "src/data/spectrumProductUpdate20260710.ts",
    "SPECTRUM_PRODUCT_UPDATE_FLASHCARDS",
  ),
  ...cardsFromArray(
    "src/data/otterCorpusFlashcards20260712.ts",
    "OTTER_CORPUS_FLASHCARDS_20260712",
  ),
];
const newCards = [
  ...dailyCards(),
  ...cardsFromArray(
    "src/data/flashcardDeck.ts",
    "OUTLOOK_VOICE_FLASHCARDS_20260710",
  ),
  ...gmailCards(),
];
const allCards = [...newCards, ...existingCards];

const patterns = {
  internet:
    /\binternet\b|\bbroadband\b|\bfttp\b|\bgig\b|\bdata caps?\b|\bsia\b|spectrum internet assist/i,
  wifi: /wi[‑-]?fi|\brouter\b|\bpod(s)?\b|security shield|invincible|out-of-home/i,
  mobile:
    /\bmobile\b|\bbyod\b|phone balance buyout|trade[ -]?in|unlimited plus|by the gig|smartwatch|\brrp?\b/i,
  tv: /\btv\b|\bvideo\b|\bchannel\b|\bdvr\b|xumo|entertainment view|stream box/i,
  voice:
    /\bvoice\b|home phone|call guard|selective call|spam calls?|international calling/i,
};

function matches(card, deckId) {
  if (card.deckTags.includes(deckId)) return true;
  return patterns[deckId].test(`${card.category} ${card.front} ${card.back}`);
}

function duplicateGroups(key) {
  const groups = new Map();
  for (const card of allCards) {
    const normalized = key(card).toLowerCase().replace(/\s+/g, " ").trim();
    const group = groups.get(normalized) ?? [];
    group.push(card.id);
    groups.set(normalized, group);
  }
  return [...groups.values()].filter((group) => group.length > 1);
}

function hasArticleNumber(card) {
  if (card.articleNumber) return card.articleNumber !== "ARTICLE NEEDED";
  return /\b(?:PR|HOW|GEN)\d+\b/.test(
    `${card.category} ${card.front} ${card.back}`,
  );
}

const idGroups = duplicateGroups((card) => card.id);
const frontGroups = duplicateGroups((card) => card.front);
const qaGroups = duplicateGroups((card) => `${card.front}\n${card.back}`);
const legacyWithArticleNumber = existingCards.filter(hasArticleNumber).length;
const dailySourceGaps = newCards.filter((card) =>
  ["needs-article", "needs-article-title", "needs-clarification"].includes(
    card.sourceStatus,
  ),
).length;

const report = {
  existingCards: existingCards.length,
  newMilestoneReview: newCards.filter((card) =>
    card.id.startsWith("daily14-mr-"),
  ).length,
  newMilestonePrep: newCards.filter((card) =>
    card.id.startsWith("daily14-prep-"),
  ).length,
  newKahoot: newCards.filter((card) => card.id.startsWith("daily14-kahoot-"))
    .length,
  newGmailArticleDerived: newCards.filter(
    (card) =>
      card.id.startsWith("gmail15-") && card.origin === "source-derived",
  ).length,
  newGmailMastery: newCards.filter((card) =>
    card.id.startsWith("gmail15-mastery-"),
  ).length,
  totalCards: allCards.length,
  deckCounts: {
    milestone: allCards.filter((card) => card.deckTags.includes("milestone"))
      .length,
    milestoneQuestions: allCards.filter(
      (card) =>
        card.origin === "verbatim-assessment" &&
        card.id.startsWith("daily14-mr-"),
    ).length,
    milestonePrep: allCards.filter((card) => card.origin === "verbatim-prep")
      .length,
    kahoot: allCards.filter((card) => card.deckTags.includes("kahoot")).length,
    articleLinked: allCards.filter(hasArticleNumber).length,
    mastery: allCards.filter((card) => card.origin === "generated-mastery")
      .length,
    internet: allCards.filter((card) => matches(card, "internet")).length,
    wifi: allCards.filter((card) => matches(card, "wifi")).length,
    mobile: allCards.filter((card) => matches(card, "mobile")).length,
    tv: allCards.filter((card) => matches(card, "tv")).length,
    voice: allCards.filter((card) => matches(card, "voice")).length,
    supplementary: existingCards.length,
    all: allCards.length,
  },
  duplicateIdGroups: idGroups,
  exactFrontDuplicateGroups: frontGroups,
  exactQuestionAnswerDuplicateGroups: qaGroups,
  legacyWithArticleNumber,
  legacyArticleNumberGaps: existingCards.length - legacyWithArticleNumber,
  dailySourceGaps,
};

console.log(JSON.stringify(report, null, 2));

if (existingCards.length !== 226)
  throw new Error("Existing-card baseline changed");
if (newCards.length !== 99) throw new Error("Ingestion count changed");
if (allCards.length !== 325) throw new Error("Combined-card count changed");
if (idGroups.length !== 0) throw new Error("Duplicate flashcard IDs found");
