# Flashcard Deck Analysis — 2026-07-14

## Outcome

The daily-class ingestion preserves all 226 pre-existing cards and adds 56 cards from the July classroom archive:

- 45 milestone review cards, including the closing Xumo prompt.
- 5 milestone-preparation cards.
- 6 recoverable WiFi Kahoot cards.
- 282 total cards.
- 0 duplicate IDs.
- 0 exact duplicate fronts.
- 0 exact duplicate question-and-answer pairs.

The analyzer is executable with `npm run audit:decks`. It parses the TypeScript card sources, enforces the 226-card preservation baseline, derives every daily helper-generated ID, applies the same service-classification rules as the app, and exits unsuccessfully if the baseline, daily count, total count, or ID uniqueness changes.

## Deck views

Deck membership is a view over one canonical card. Service counts intentionally overlap when a question spans multiple services.

| Deck          | Cards | Purpose                                                      |
| ------------- | ----: | ------------------------------------------------------------ |
| Milestone     |    50 | Complete review pool plus preparation rules                  |
| Kahoot        |     6 | Recoverable July 7 classroom questions                       |
| Internet      |    63 | Tiers, speeds, eligibility, equipment and offers             |
| WiFi          |    48 | Advanced WiFi, pods, Security Shield and Invincible WiFi     |
| Mobile        |    56 | Plans, devices, protection and Mobile connectivity           |
| TV            |    20 | Packages, channels, streaming, add-ons and Xumo              |
| Voice         |     7 | Residential Voice, spam protection and international service |
| Supplementary |   226 | Every card that existed before this ingestion                |
| All cards     |   282 | Complete combined library                                    |

Supplementary is a preservation boundary: no previous card was deleted, overwritten, or hidden from the user. A prior card can also appear in a service view when its content matches that service.

## Source presentation

Every study card now has two source surfaces:

1. The card header displays the article number as `Sender`.
2. The answer side displays `Article: full article number — full article title`.

The reader speaks the answer and source together. Cards with incomplete sourcing display `ARTICLE NEEDED` and remain in the Source queue until the next clean ingestion supplies the missing metadata.

Known article-title mappings include PR131, PR139, PR223, HOW7726, HOW7449, GEN6633, GEN7777, GEN8761, GEN9001, GEN9008, GEN9023, GEN9079 and GEN9168. GEN6562 retains its number and explicitly requests the full title.

## Daily source queue

Thirty daily cards need at least one source repair. The app lists each card ID, prompt, missing fields and next-ingestion target. The priority wording-recovery set is:

- Milestone 5: exact same-day and ETD option wording and controlling dispatch article.
- Milestone 7: exact Gig, Premier and total Multiple Internet Instances limits.
- Milestone 16: product name rendered as “pipeline to the fixed” and every option.
- Milestone 17: exact competitor-comparison option text.
- Milestone 18: approved Spectrum Mobile SSID or wireless-access-point terminology.
- Milestone 28: complete Internet 2 Gig statement.
- Milestone 29: every Security Shield option.
- Milestone 30: every Spectrum-equipment option.
- Milestone 31: exact non-SPP4 video-package name.
- Milestone 34: TV Choice first-30-day and regional-sports-network wording.
- Milestone 35: exact package or add-on selected for Lillian.
- Milestone 38: option D and the Entertainment View add-on hierarchy.
- Milestone 39: all three Spectrum Voice International feature options.
- Milestone 40: the complete true Spectrum Voice statement.
- Milestone 45: exact Xumo Stream Box option rendered as “won't control.”

The original July 7 Kahoot display remains a next-day target. Six questions were recoverable from the game and its immediate HOW7726 lesson; other game audio was too damaged to reconstruct safely.

## Existing deck findings

Thirty-seven of the 226 pre-existing cards already contain a recognizable PR, HOW or GEN article number. The remaining 189 cards are preserved in Supplementary and listed in the Existing-deck article gaps panel. That list is the source-enrichment backlog; it does not block continued study or remove behavioral, setup, scenario, benefits or competitor cards whose source article has not yet been attached.

## Accuracy controls

- A clear classroom answer with incomplete article metadata remains studyable and is labeled for source collection.
- A damaged question or incomplete option set becomes a hold card with the missing wording stated on the back.
- Article-backed product statements identify the controlling captured article.
- Current official Copilot, biller, Agent OS, approved SOP and live offer continue to control customer-facing use.
- No customer identity, credential, security code, personal mailbox address or private calendar identifier is stored in the card data.
