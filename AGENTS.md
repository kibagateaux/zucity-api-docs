# AGENTS.md — operating and maintaining this repo

**Consuming the API?** This file isn't your entry point:
- AI agents → [llms.txt](llms.txt) then [skills.md](skills.md)
- Human developers → [api.md](api.md) + [contracts.md](contracts.md)
- Programs / machine consumers → [facts.json](facts.json)

**This file is the law for agents and humans *editing these docs*.** The repo's
value is one property: every endpoint, address, enum, and example was executed
against live systems on its stamped date. Maintenance preserves that property
or the repo is worthless.

## Rules for editing (MUST)

1. **Verify before you edit.** Before changing any documented value, re-run
   its inline verify command (the `curl`/`cast` blocks in api.md and
   contracts.md) or `npm run smoke`. Never "correct" a value from memory or
   training data — memory is how drift gets in. If live behavior and docs
   disagree, live behavior wins.
2. **New behavioral claims need evidence.** A claim ships only with (a) a
   same-day transcript against live systems (curl/cast/smoke output), or
   (b) an explicit guidance/derived label when it is advice rather than
   observed behavior. The NOT-SUPPORTED lists are *verified absences* —
   extend them only by testing the absence.
3. **Interface-level only.** The ZuCity platform, webapp, and smart contracts
   are proprietary (Business Source License) and are not in this repo.
   Document observable behavior and the public ABI/HTTP surface; never
   platform source code, internal file paths, internal schema/component
   names, or configuration secrets. The only validator name that appears in
   these docs is **ReceiptValidator**. Before any PR, sweep your diff: if a
   system-internal name is not already part of this repo's public surface,
   it does not ship.
4. **Smoke gate.** `npm install && npm run smoke` must exit 0 against
   mainnet AND with `ZUCITY_CHAIN_ID=11155111` before any PR. If a tool
   count, tool name, or version string changes, update README.md, llms.txt,
   the zucity-mcp.js header, and package.json in the same commit — one
   count, everywhere.
5. **Release stamps.** `facts.json → .meta.generatedAt` changes ONLY when the
   docs are regenerated from a new platform release (it names the source
   state). Docs-layer edits bump `.meta.docsRevision` instead, and add a
   dated entry to README `## Changes` — with a supersedes note whenever the
   entry corrects older guidance, so downstream caches know what to evict.

## Freshness walk (returning agents, CI)

Detect change in ≤2 steps: (1) fetch
[facts.json](https://raw.githubusercontent.com/kibagateaux/zucity-api-docs/main/facts.json)
(or call the MCP `get_facts` tool) and compare `.meta.docsRevision` and
`.meta.generatedAt` against your cached copy; (2) if unchanged, your cached
stable-tier knowledge holds (see skills.md § If you persist across sessions);
if changed, read README `## Changes` and re-read only the files it names.

## Scope

Docs and example code are MIT ([LICENSE](LICENSE)). Issues and PRs with
interface-level corrections (plus their verification transcripts) are
welcome. Platform-internal questions → [zucity.org](https://zucity.org).
