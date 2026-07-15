#!/usr/bin/env python3
"""Static regression gates for the mobile-first Spectrum SAS shell."""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FAILURES: list[str] = []


def read(relative_path: str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


def require(relative_path: str, markers: list[str]) -> None:
    content = read(relative_path)
    for marker in markers:
        if marker not in content:
            FAILURES.append(f"{relative_path}: missing {marker!r}")


require(
    "src/components/AppSidebar.tsx",
    [
        'label: "Live Call"',
        'label: "Practice"',
        'label: "Learn"',
        'label: "My Stuff"',
        'url: "/bulletin"',
        'url: "/company-walkthrough"',
        "setOpenMobile(false)",
        'aria-label="Close menu"',
    ],
)

require(
    "src/routes/__root.tsx",
    [
        'aria-label="Open navigation menu"',
        "<MobileDock />",
        'aria-label="Primary mobile navigation"',
        "setOpenMobile(true)",
    ],
)

require(
    "src/lib/speak.ts",
    [
        "activeUtterance",
        "activeFailure",
        "speakAndWait",
        'opts.onerror?.("unsupported")',
        'cancelled?.("canceled")',
    ],
)

require(
    "src/routes/flashcards.tsx",
    [
        "speakAndWait",
        "questionResult",
        "answerResult",
        "Read card",
        "Audio could not start",
        'id="flashcard-deck"',
        "Source queue",
        "Sender:",
        "Existing-deck article gaps",
    ],
)

require(
    "src/data/flashcardDeck.ts",
    [
        'id: "milestone"',
        'id: "kahoot"',
        'id: "internet"',
        'id: "wifi"',
        'id: "mobile"',
        'id: "tv"',
        'id: "voice"',
        'id: "supplementary"',
        "EXISTING_FLASHCARDS",
    ],
)

require(
    "src/routes/across-spectrum.tsx",
    [
        "<PageReader",
        'label="Read simulator guide"',
        'className="order-2 xl:order-1"',
        "responsive-disclosure",
        "onerror: () =>",
    ],
)

require(
    "src/data/outlookCalendarSpectrum.ts",
    [
        "Spectrum New Hire Orientation — First Day",
        "Tuesday, August 11, 2026",
        "9:45 AM",
        "acceptable I-9 documents",
        "Personal contact details",
    ],
)

require(
    "src/components/SpectrumCalendarBrief.tsx",
    [
        'variant: "compact" | "plan" | "setup"',
        "Next calendar milestone",
        "Outlook calendar brief",
        "First-day readiness",
        "sm:grid-cols-2",
    ],
)

require("src/routes/index.tsx", ['<SpectrumCalendarBrief variant="compact" />'])
require("src/routes/plan.tsx", ['<SpectrumCalendarBrief variant="plan" />'])
require("src/routes/setup.tsx", ['<SpectrumCalendarBrief variant="setup" />'])
require("src/routes/my-stuff.tsx", ["Bulletin Board", "Company Walkthrough"])
require("src/routes/bulletin.tsx", ["5_000", "bg-[#39ff14]", "bg-[#ff3b30]", "Due date needs confirmation"])
require("src/routes/company-walkthrough.tsx", ["Person deck", "Profile gaps for next ingestion"])

require(
    "src/styles.css",
    [
        "--primary: #0073d1;",
        "--neon: #00a8e0;",
        ".mobile-dock",
        ".responsive-disclosure",
        ".tool-details",
        "min-height: 2.75rem;",
        "env(safe-area-inset-bottom)",
    ],
)

home = read("src/routes/index.tsx")
if "MODULES.map" in home:
    FAILURES.append("src/routes/index.tsx: full curriculum spine returned to the landing page")
for route in [
    "/lookup",
    "/across-spectrum",
    "/sales-prompts",
    "/tutor",
    "/scenarios",
    "/flashcards",
    "/curriculum",
    "/prompt-academy",
    "/full-spectrum",
    "/corner",
]:
    if route not in home:
        FAILURES.append(f"src/routes/index.tsx: missing preserved route {route}")

styles = read("src/styles.css").lower()
for legacy_color in ["magenta", "0.255 350", "rgba(99,255,218"]:
    if legacy_color in styles:
        FAILURES.append(f"src/styles.css: legacy accent remains: {legacy_color}")

if FAILURES:
    print("Mobile UX regression gates failed:")
    for failure in FAILURES:
        print(f"- {failure}")
    raise SystemExit(1)

print("Mobile UX regression gates passed.")
