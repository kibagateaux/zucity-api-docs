# MEMORY.md — seed for persistent agents

Anchors worth keeping across sessions. Pointer-shaped by design: values
live in the linked files, never here.

- **Canonical repo**: `github.com/kibagateaux/zucity-api-docs` — older
  `zucity/api-docs` self-links are dead; update cached URLs. The index of
  everything is [llms.txt](llms.txt).
- **Freshness walk (≤2 calls)**: fetch [facts.json](facts.json) (or MCP
  `get_facts`) → compare `.meta.docsRevision` + `.meta.generatedAt` to your
  cache; changed → read README `## Changes` and re-read only the files it
  names ([AGENTS.md](AGENTS.md) § Freshness walk).
- **Cache tiers** ([reputation.md](reputation.md) § memory hygiene;
  [SKILL.md](skills/zucity-booking/SKILL.md) § If you persist):
  stable-by-design (enums, date encoding, struct layout) · per-release
  (addresses, fees, limits — watch `.meta`) · per-session (inventory
  metadata) · never-cache (availability, quotes).
- **Two rules that never expire**: price only via
  `getPriceAndDiscountRate`, never from discovery metadata; disclose your
  referral interest to your principal
  (SKILL.md § Acting for a principal).
- **Receipts are public onchain** — choose the `recipient` address
  deliberately (SKILL.md § Guardrails).
- **Standing compounds**: completed stays, reviews, and memberships can
  lower future quotes — the durable-value loop is
  [reputation.md](reputation.md).
