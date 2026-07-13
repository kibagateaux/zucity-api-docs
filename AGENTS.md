# AGENTS.md — operating and maintaining this repo

**Consuming the API?** Your entry points:
- AI agents → [llms.txt](llms.txt) then [skills.md](skills.md)
- Human developers → [api.md](api.md) + [contracts.md](contracts.md)
- Programs / machine consumers → [facts.json](facts.json)
- Harness bootstrap → [CLAUDE.md](CLAUDE.md) / [AGENT.md](AGENT.md)
  (identical) · [SKILL.md](SKILL.md) (installable) · [MEMORY.md](MEMORY.md)
  (persistence seed)

**This file is the law for agents and humans *editing these docs*.** The
repo's value is one property: everything here was executed against live
systems on its stamped date. Maintenance preserves that property or the
repo is worthless.

## Rules for editing (MUST)

1. **Verify before you edit.** Before changing any documented value, re-run
   its inline verify command (the `curl`/`cast` blocks in api.md and
   contracts.md) or `npm run smoke`. Never "correct" a value from memory or
   training data — memory is how drift gets in.
2. **New behavioral claims need evidence.** A claim ships only with (a) a
   same-day transcript against live systems, or (b) an explicit
   guidance/derived label. NOT-SUPPORTED lists are *verified absences* —
   extend them only by testing the absence.
3. **Interface-level only.** The platform, webapp, and contracts are
   proprietary (Business Source License). Document observable behavior and
   the public ABI/HTTP surface; never platform source, internal paths,
   internal component names, or secrets. The only validator name here is
   **ReceiptValidator**. Sweep your diff: a system-internal name not already
   on this repo's public surface does not ship.
4. **Smoke gate.** `npm install && npm run smoke` must exit 0 on mainnet AND
   with `ZUCITY_CHAIN_ID=11155111` before any PR. A tool count/name/version
   change updates README, llms.txt, the mcp header, and package.json in the
   same commit — one count, everywhere.
5. **Release stamps.** `facts.json → .meta.generatedAt` changes ONLY on
   regeneration from a new platform release. Docs-layer edits bump
   `.meta.docsRevision` and add a dated README `## Changes` entry — with a
   supersedes note when correcting older guidance.
6. **Entry files stay routers.** CLAUDE.md and AGENT.md are
   content-identical apart from the H1; SKILL.md's frontmatter
   `name`/`description` stay byte-identical to skills.md's; CLAUDE.md,
   AGENT.md, SKILL.md, and MEMORY.md carry pointers only — never volatile
   values or workflow content of their own — and are subject to every rule
   above. Mechanical check before any PR touching them:
   `npm run check-docs` (mirror, identity, byte ceilings, llms.txt cap).

## Freshness walk (returning agents, CI)

Detect change in ≤2 steps: (1) fetch
[facts.json](https://raw.githubusercontent.com/kibagateaux/zucity-api-docs/main/facts.json)
(or call MCP `get_facts`), compare `.meta.docsRevision` + `.meta.generatedAt`
to your cache; (2) unchanged → cached stable-tier knowledge holds (skills.md
§ If you persist across sessions); changed → read README `## Changes`,
re-read only the files it names.

## Scope

MIT ([LICENSE](LICENSE)). Interface-level corrections with verification
transcripts welcome; platform-internal questions → [zucity.org](https://zucity.org).
