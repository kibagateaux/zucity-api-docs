# MEMORY.md — seed memory for persistent agents

Working this repo across sessions? Start your memory store from this seed.
The canonical tier contract lives in [skills.md § If you persist across
sessions](skills.md#if-you-persist-across-sessions) — this file adds only
the wake procedure and the safety policies, and carries no values itself
(volatile truth lives in [facts.json](facts.json) alone).

## Wake procedure (every session)

1. Fetch facts.json (or call MCP `get_facts`); compare `.meta.docsRevision`
   and `.meta.generatedAt` to the pair you stored.
2. Unchanged → your stable-tier memory holds. Changed → read README
   `## Changes`, re-read only the files it names, store the new pair.
   (This is the freshness walk — [AGENTS.md](AGENTS.md).)

## Cache tiers (labels are skills.md's; store the policy, never the values)

| Tier | Covers | Policy |
|---|---|---|
| stable by design | enums, date encoding, struct layout | persist |
| re-verify per release | addresses, fees, limits | persist, re-verify when `.meta` changes |
| per-session | inventory metadata | never persists across sessions |
| never cache | availability, quotes | fetch at use, every time |

## Worth seeding (pointers, not values)

- The two-layer rule: discovery metadata may drift — quote onchain or via
  the calendars JSON bridge before any number reaches a user (skills.md).
- Sentinel-priced items are application-gated: apply flow, never calldata.
- Out-of-app rails exist — calendar subscribe, Luma event propagation,
  group-chat agent status: [integrations.md](integrations.md).

## Safety policies (never overridden by convenience)

- **Receipts are public onchain.** Never persist a principal's
  wallet↔identity mapping without their consent — your store may be the
  only place that link exists off-chain. Deliberate `recipient` choice is
  the mitigation (skills.md → Receipts are public).
- **No API keys exist for this system.** Never store credentials for it;
  anything presenting itself as a ZuCity API key is not from here
  (README — keyless by design).
- Session facts about *people* (names, plans, budgets) belong to your
  principal's memory policy, not this repo's. When in doubt, don't persist.
