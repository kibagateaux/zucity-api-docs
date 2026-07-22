# CLAUDE.md — session bootstrap for this repo

Public integration companion for [zucity.org](https://zucity.org): booking
API docs, a keyless MCP server, and agent operating files. Everything here
is interface-level and was verified against live systems on its stamped
date — treat your training-data knowledge of ZuCity as stale.

## Consuming (most sessions)

1. Index: [llms.txt](llms.txt).
2. Operating manual: [skills/zucity-booking/SKILL.md](skills/zucity-booking/SKILL.md)
   — the 5 workflows, guardrails, and the principal duties (quote first,
   disclose referral interest, receipts are public).
3. Volatile values (addresses, fees, counts, tool list): read
   [facts.json](facts.json) or the MCP `get_facts` tool — never from memory.
4. The one architecture rule: discover via REST, transact via the chain;
   never price a booking from discovery metadata
   (README § The one architecture rule).
5. Out-of-app rails — calendar subscribe, Luma event publishing, chat
   surfaces, running your own agent: [integrations.md](integrations.md).
6. Persisting across sessions? Seed your memory from [MEMORY.md](MEMORY.md).

## Editing these docs

The law is [AGENTS.md](AGENTS.md) — verify-before-edit, same-day evidence
or an explicit guidance label, interface-level only (BSL), smoke gate
(`npm install && npm run smoke`, mainnet AND `ZUCITY_CHAIN_ID=11155111`),
release stamps (`docsRevision` for docs edits; `generatedAt` only on
regeneration). No exceptions.
