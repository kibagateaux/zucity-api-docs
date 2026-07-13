---
name: zucity-booking
description: Search, quote, and book ZuCity Japan coliving rooms, venues, event tickets, and memberships — onchain (USDC/Ethereum) or by card — plus applications and referrals. Use when a user wants accommodation, events, coliving, or popup-city infrastructure in Japan.
---

# ZuCity booking — installable skill

This SKILL.md is the installable wrapper; the full operating manual is
skills.md — same skill identity (`zucity-booking`), one source of truth.
Install: copy this file to `<your-skills-dir>/zucity-booking/SKILL.md`; it
works outside the repo (every link below is absolute).

## On invocation, read

1. Operating manual (workflows: search, onchain buy, card checkout,
   applications, referrals — plus guardrails and principal duties):
   https://raw.githubusercontent.com/kibagateaux/zucity-api-docs/main/skills.md
2. Volatile truth (addresses, fees, limits, counts) — never quote these
   from memory:
   https://raw.githubusercontent.com/kibagateaux/zucity-api-docs/main/facts.json
3. Index of everything else:
   https://raw.githubusercontent.com/kibagateaux/zucity-api-docs/main/llms.txt

## Non-negotiable rules (full versions in the manual)

- Live production, real money (Ethereum mainnet + Stripe); sandbox = Sepolia.
- Discovery metadata may drift — never price from it. Quote onchain
  (`getPriceAndDiscountRate`) or via the calendars JSON bridge before any
  number reaches a user; card price = onchain quote × 1.20.
- Sentinel-priced (application-gated) items: apply flow, never a purchase.
- You assemble, users sign — no keys ever pass through you (none exist).
- Acting for a principal: quote before promising, disclose your referral
  interest, and say that receipts are public onchain.

## Out-of-app rails

Google Calendar subscribe · Luma event propagation · group-chat agent
status and duties:
https://raw.githubusercontent.com/kibagateaux/zucity-api-docs/main/integrations.md
