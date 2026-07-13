#!/usr/bin/env node
// Mechanical sync checks for the entry files (AGENTS.md rule 6).
// Exit 0 = all pass. No dependencies; run: npm run check-docs
import { readFileSync } from "node:fs";

const read = (f) => readFileSync(f, "utf8");
let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) failed++;
};

// 1 · CLAUDE.md ↔ AGENT.md identical apart from the H1 line
const tail = (s) => s.split("\n").slice(1).join("\n");
check("mirror: CLAUDE.md ↔ AGENT.md (body identical)", tail(read("CLAUDE.md")) === tail(read("AGENT.md")));

// 2 · SKILL.md frontmatter name + description byte-identical to skills.md
const fm = (s) => {
  const m = s.match(/^---\n([\s\S]*?)\n---/);
  const get = (k) => (m ? (m[1].split("\n").find((l) => l.startsWith(k + ":")) ?? "") : "");
  return { name: get("name"), description: get("description") };
};
const a = fm(read("SKILL.md")), b = fm(read("skills.md"));
check("identity: SKILL.md name == skills.md name", a.name === b.name && a.name !== "");
check("identity: SKILL.md description == skills.md description", a.description === b.description && a.description !== "");

// 3 · Byte ceilings
for (const [f, cap] of [["CLAUDE.md", 2048], ["AGENT.md", 2048], ["MEMORY.md", 3072], ["SKILL.md", 4096], ["integrations.md", 8192], ["llms.txt", 4096]]) {
  const n = Buffer.byteLength(read(f));
  check(`bytes: ${f} ${n} <= ${cap}`, n <= cap, `${n}B`);
}

// 4 · llms.txt structure: H1 first line, drift directive within first 10 lines
const llms = read("llms.txt").split("\n");
check("llms.txt: first line is H1", llms[0].startsWith("# "));
check("llms.txt: drift directive in first 10 lines", llms.slice(0, 10).some((l) => l.includes("stale")));

// 5 · SKILL.md links are absolute (survives copy-out installation)
check("SKILL.md: no relative links", !/\]\((?:\.\/|[\w.-]+\.(?:md|json|js))[)#]/.test(read("SKILL.md")));

// 6 · Entry files carry no volatile values (addresses; onchain hex)
for (const f of ["CLAUDE.md", "AGENT.md", "SKILL.md", "MEMORY.md"]) {
  check(`no-volatile: ${f} has no 0x… addresses`, !/0x[a-fA-F0-9]{6,}/.test(read(f)));
}

process.exit(failed ? 1 : 0);
