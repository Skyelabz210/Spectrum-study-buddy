# Spectrum Plans and Criteria Resource Report

Generated: 2026-07-07
Purpose: bootstrap public, scrapable Spectrum plan/criteria information into a source-backed resource for CallFlow Lab.

## Scope and confidence rules

This report uses public web pages only. Spectrum pricing and eligibility are address-gated; official Spectrum pages state that residential services and rates vary by location and that the rate card requires an address for accurate home-specific information. Therefore, all plan prices below are training/resource facts, not live quote authority.

Confidence labels:

- HIGH: directly from accessible official Spectrum, Charter, USAC, or Reuters source.
- MEDIUM: from third-party plan aggregator/review page that cites current Spectrum data and disclaimers.
- LOW: inferred from mixed evidence or inaccessible official pages; verify before use.

## Executive summary

Spectrum public pages and public plan summaries show four major internet offer surfaces relevant to training:

1. Internet Advantage — budget tier reported as 100 Mbps at $30/month for 1 year. Source confidence: MEDIUM because the accessible source is HighSpeedInternet.com, not the official Spectrum ordering page.
2. Internet Premier — mainstream tier reported as 500 Mbps at $40/month for 1 year. Source confidence: MEDIUM, supported by third-party plan table and Reuters reporting about Spectrum's 2024 pricing/bundling platform.
3. Internet Gig — high-speed tier reported as 1,000 Mbps at $60/month for 1 year. Source confidence: MEDIUM.
4. Internet 2 Gig — top tier reported as 2,000 Mbps at $70/month for 1 year. Source confidence: MEDIUM.

Spectrum's accessible official affordable-internet page identifies Spectrum Internet Assist as the explicit low-income/affordable internet program surface, saying households may qualify and listing affordable internet, free modem and antivirus software, and household WiFi availability. It did not expose full criteria in the crawler output. Source confidence for existence/features: HIGH. Source confidence for exact criteria: LOW until verified in official Spectrum internal/current page.

ACP is not an active eligibility path. USAC states ACP provided up to $30/month broadband support, up to $75/month on qualifying Tribal lands, and ended June 1, 2024 because Congress did not provide additional funding. Source confidence: HIGH.

## Internet plans captured

| Plan | Reported speed | Reported promo price | Reported promo term | Notes | Confidence |
|---|---:|---:|---:|---|---|
| Spectrum Internet Advantage | Up to 100 Mbps | $30/mo | 1 year | Budget tier; not the same evidence surface as Internet Assist. Verify eligibility and address availability. | MEDIUM |
| Spectrum Internet Premier | Up to 500 Mbps | $40/mo | 1 year | Mainstream tier. Reuters reported Spectrum One 500 Mbps at $30/mo when bundled with two mobile lines or TV in Sept. 2024; public plan tables later show Premier at $40/mo standalone promo. | MEDIUM |
| Spectrum Internet Gig | Up to 1,000 Mbps | $60/mo | 1 year | Gig tier. Availability and upload speeds can vary by local network infrastructure. | MEDIUM |
| Spectrum Internet 2 Gig | Up to 2,000 Mbps | $70/mo | 1 year | Highest reported residential tier in third-party table; may not be available in all markets. | MEDIUM |

Important universal caveat: Spectrum's own rate-card page says residential services and rates vary by location, requires street address and ZIP for accurate home information, and states that not all products, pricing, and services are available in all areas; pricing and actual speeds may vary; internet speeds are based on wired connection; restrictions apply.

## Eligibility / criteria matrix

| Item | Criteria / gating condition | Evidence quality | Training interpretation |
|---|---|---|---|
| Internet plans in general | New residential customer status may matter; third-party disclaimer says no Spectrum services within past 30 days and good standing; service activation fee and taxes may apply in select states. | MEDIUM | Do not promise promo price to an existing customer without checking account and address. |
| Address availability | Official Spectrum rate-card flow requires street address and ZIP to return accurate rates. | HIGH | Always verify by service address before quoting availability, price, or exact speed. |
| Internet Advantage | Third-party public table lists 100 Mbps, $30/mo for 1 year. Exact address availability and whether it is a standard promo vs. special tier must be verified. | MEDIUM/LOW | Use as a budget tier candidate, not as guaranteed low-income eligibility. |
| Internet Assist | Spectrum official affordable page says households may qualify for affordable internet; listed benefits include affordable Spectrum Internet, free modem and antivirus software, and household WiFi available. Full criteria were not accessible from crawler. | HIGH for existence/features; LOW for criteria | Treat as the named low-income assistance surface. Verify criteria in official Spectrum page/tool before advising. |
| ACP | ACP ended June 1, 2024 due to lack of additional Congressional funding. | HIGH | Do not use ACP as an active enrollment path. |
| Lifeline | USAC says Lifeline eligibility can be through income at or below 135% of Federal Poverty Guidelines or participation in SNAP, Medicaid, SSI, FPHA, Veterans and Survivors Pension Benefit; only one Lifeline benefit per household. | HIGH | Useful context for affordability conversations, but do not assume Spectrum Internet Assist uses exactly the same criteria unless official Spectrum says so. |
| Mobile service | Spectrum Mobile pages state Spectrum Internet is required. | HIGH | Mobile sale depends on active/eligible Spectrum Internet relationship. |
| BYOD Mobile | Device must be unlocked and compatible with Spectrum Mobile network; Spectrum supports many Apple, Samsung, Google phones; previously purchased LG phones are also supported. | HIGH | Ask whether phone is unlocked and check compatibility before presenting BYOD as ready. |
| Mobile buyout | Spectrum Mobile switch offer requires Spectrum Internet; sign up with 2 to 10 lines; transfer at least 2 existing numbers; provide latest bill; $500/line up to 5 lines / $2,500 total; lines must remain active at least one year; ETFs/leasing/interest excluded. | HIGH | This is a strict eligibility script, not a generic promise. |

## Mobile plan surface

Official Spectrum Mobile page states Spectrum Internet is required. Public mobile plan surfaces:

| Plan | Price surface | Included features | Criteria / caveats |
|---|---:|---|---|
| Unlimited Plus | $40/mo per additional line | Unlimited talk/text/data in U.S.; hotspot data included with reduced speeds at 10 GB; roaming in 215+ countries/destinations including Canada/Mexico with reduced speeds at 10 GB; free international texting; Anytime Upgrade; no contracts/added taxes/hidden fees. | Spectrum Internet required. Anytime Upgrade terms apply. |
| Unlimited | $30/mo per additional line | Unlimited talk/text/data in U.S.; hotspot data included with reduced speeds at 5 GB; free international texting; no contracts/added taxes/hidden fees. | Spectrum Internet required. |
| By the Gig | $20/mo first GB per additional line; $5/GB after first GB | Share data with up to 20 lines; 5G included; mix-and-match/upgrade; pay for data used. | Spectrum Internet required. Good for low data use; switch timing differs by direction. |

## Bundling and promotional-term rules

HighSpeedInternet.com reports that the number of services bundled determines promotional period and discount length:

- Internet only: 12 months.
- Internet + TV: 24 months.
- Internet + Mobile: 24 months.
- Internet + TV + Mobile: 36 months.

This is MEDIUM confidence because it is from a third-party plan page, not the direct official ordering flow. Use it as a training concept: bundles can change term/discount structure, but exact current offers must be verified in the Spectrum ordering system.

Reuters reported in September 2024 that Spectrum rolled out cheaper bundled plans under a new brand platform, with Spectrum One at 500 Mbps for $30/month when bundled with two mobile lines or cable TV, and a 1 Gbps plan starting at $40/month. This is useful historical/current-platform context but should not be treated as a permanent quote without live address/order verification.

## Installation, equipment, and fees captured

HighSpeedInternet.com reported:

- Spectrum supplies a modem or gateway free.
- WiFi costs $10/month for Internet Advantage and Internet Premier customers.
- Self-install is reported as $30 including service activation.
- Professional installation is reported as $65 for customers without fiber or cable already installed.
- Internet Gig and Internet 2 Gig include Advanced WiFi in price; Internet 2 Gig includes Invincible WiFi.

Treat fee data as MEDIUM confidence. Verify in the live order screen, rate card, or official internal article before customer-facing use.

Mobile official pages also state:

- No added taxes or fees associated with Spectrum Mobile plans, but sales tax applies to devices/accessories.
- A one-time activation fee of $20 per line applies.

## Customer-facing positioning notes for CallFlow Lab

1. Advantage vs Assist: keep them separate. Advantage appears as a budget internet tier in public plan tables; Assist is the official affordable/low-income page surface accessible from Spectrum. Do not call Advantage a low-income program unless official current tools confirm it.
2. Address first: all internet pricing and speeds are address-sensitive. The rate-card page itself says rates vary by location and requires street address + ZIP.
3. Existing-customer objection: new-customer and bundle promos are not automatically available to existing customers. Use A-R-M: acknowledge, review account, check eligible options, avoid blunt 'new customers only' as the first response.
4. Mobile prerequisite: Spectrum Internet is the gate for Spectrum Mobile. This should appear in product training cards.
5. Buyout precision: the $2,500 switch offer has strict conditions: 2-10 lines, at least 2 transferred numbers, current bill required, $500/line up to 5 lines, device-balance focus, active-line duration, and exclusions.
6. ACP no longer active: do not use ACP as a current enrollment path after June 1, 2024.
7. WiFi and equipment: do not assume WiFi/router fees are identical across tiers; the public plan table suggests Advantage/Premier WiFi fee while Gig/2 Gig include Advanced WiFi.
8. Speeds: present as 'up to' and wired-speed based. Wireless speeds vary and are not guaranteed.

## Suggested app resource schema

```ts
export type SpectrumPlanResource = {
  id: string;
  name: string;
  category: "internet" | "mobile" | "bundle" | "affordability" | "fee";
  speedDownMbps?: number;
  speedUpMbps?: number | null;
  promoPriceUsd?: number;
  promoTermMonths?: number;
  criteria: string[];
  caveats: string[];
  confidence: "HIGH" | "MEDIUM" | "LOW";
  sources: string[];
  lastVerified: string;
};
```

Recommended initial resource IDs:

- `internet_advantage_public_2026_07_07`
- `internet_premier_public_2026_07_07`
- `internet_gig_public_2026_07_07`
- `internet_2gig_public_2026_07_07`
- `internet_assist_affordable_surface_2026_07_07`
- `mobile_unlimited_plus_2026_07_07`
- `mobile_unlimited_2026_07_07`
- `mobile_by_the_gig_2026_07_07`
- `mobile_switch_buyout_2026_07_07`
- `acp_ended_2024_06_01`
- `lifeline_context_2026_fpg`

## Sources

1. Spectrum Affordable Internet Plans / Broadband Get Qualified page: https://www.spectrum.com/cp/broadband-get-qualified
2. Spectrum Residential Rate Card Information & Disclosures: https://www.spectrum.com/policies/rate-card
3. Spectrum Residential General Terms and Conditions of Service: https://www.spectrum.com/policies/residential-general-terms-and-conditions-of-service
4. Spectrum Mobile Plans: https://www.spectrum.com/mobile/plans
5. Spectrum Mobile Unlimited Data Plans: https://www.spectrum.com/mobile/plans/unlimited-data
6. Spectrum Mobile By the Gig: https://www.spectrum.com/mobile/plans/data-by-the-gig
7. Spectrum Mobile BYOD: https://www.spectrum.com/mobile/byod
8. Spectrum Mobile Switch / Buyout page: https://www.spectrum.com/mobile/switch
9. HighSpeedInternet.com Spectrum Plans and Pricing page, dated May 29, 2026: https://www.highspeedinternet.com/providers/spectrum
10. Reuters, Charter launches cheaper internet plans, September 16, 2024: https://www.reuters.com/business/media-telecom/charter-launches-cheaper-internet-plans-boost-broadband-customer-retention-2024-09-16/
11. USAC Affordable Connectivity Program page: https://www.usac.org/about/affordable-connectivity-program/
12. USAC Lifeline Consumer Eligibility page: https://www.usac.org/lifeline/consumer-eligibility/
