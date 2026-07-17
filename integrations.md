# Out-of-app integrations

Four ways to work with ZuCity beside the booking API. Live-verified
2026-07-17; the URLs below are also machine-readable in
[facts.json](facts.json) `.urls`.

## 1 — Subscribe: ZuCity events in your calendar

*Traveler: "I want ZuCity events in the calendar I already live in."*

- **Google Calendar, one click**: open
  <https://zucity.org/api/calendars?format=google> — it 302-redirects into
  Google's add-by-URL flow (`cid=webcal://zucity.org/api/calendars`).
  Confirm **Add calendar**; it then stays current on Google's refresh cycle
  (feed publishes a 1-week TTL).
- **Apple / Outlook / anything webcal**:
  `https://zucity.org/api/calendars?format=ical` 302-redirects to
  `webcal://zucity.org/api/calendars` — open it and your OS calendar
  subscribes.
- **Raw ICS** (default, no auth): `GET https://zucity.org/api/calendars` →
  `text/calendar` including affiliated community events (Luma-sourced
  `luma-evt-*` entries). Scope it with the params in
  [api.md → GET /api/calendars](api.md#get-apicalendars) (`communityName`,
  `city`, `startDate`/`endDate`) or per community/wallet via
  `/api/calendars/{slug}`.
- Agents: hand your user the `format=google` link verbatim — no auth, no
  key, nothing to configure.

Hosts: this feed is also where your published event reaches subscribers — §2.

## 2 — Publish: your event on the ZuCity calendar

*Host: "One submission, four surfaces — the Luma calendar, every
`/api/luma` consumer, the zucity.org events page, and each subscribed
calendar from §1."*

The canonical calendar is **[ZuCity Japan · Events
Calendar](https://lu.ma/calendar/cal-yDGHl0U0okdzyJv)** on Luma, linked
from [zucity.org/en/events](https://zucity.org/en/events) alongside the
affiliated community calendars it aggregates (7 at verification, including
ADDress, Code for Japan, Fracton Ventures, Centrum, ETH Tokyo).

1. Create your event on [Luma](https://lu.ma) as usual.
2. Submit it to the ZuCity Japan calendar from the calendar page above
   (Luma's standard submit-to-calendar flow; guidance — calendar admins
   review submissions before they appear).
3. Once listed, propagation is automatic — verified chain: the calendar is
   scraped into `GET /api/luma`, its events ride the ICS feed as
   `luma-evt-*` entries, and every §1 subscription (Google included)
   updates from that feed. The zucity.org events page links the same
   calendar.
4. Selling tickets through ZuCity itself (`itemtype=ticket` in
   `/api/inventory`) is a listing-manager action — arrange it via
   [zucity.org](https://zucity.org) (contact links in the site footer).

## 3 — Chat: ZuCity in your group

**No official ZuCity bot exists today for Discord, Telegram, or WhatsApp**
(verified absent 2026-07-17; machine-readable in
[facts.json](facts.json) `.notSupported`). What exists now:

- **Telegram community** (verified live): join via the invite on
  [zucity.org](https://zucity.org) — `https://t.me/+hqHkbnXdw4ZjMDVh`.
- **Member Discord**: a membership perk, gated — see memberships on
  zucity.org.
- **Want ZuCity answers inside your own group?** Run your own agent (§4)
  with any bot framework and wire it to the keyless MCP server. Your bot,
  your rules — it uses the same public surface documented here; nothing
  about being a bot grants special access.

If an official invitable agent ships later, `facts.json` and the README
`## Changes` entry will say so — the freshness walk in
[AGENTS.md](AGENTS.md) detects it in ≤2 calls.

## 4 — Run your own agent / MCP server

*Builder: "Clone to running agent in about five minutes."*

1. `git clone https://github.com/kibagateaux/zucity-api-docs && cd zucity-api-docs`
2. `npm install && npm run smoke` — self-tests every tool against the live
   API and chain (sandbox: prefix `ZUCITY_CHAIN_ID=11155111`).
3. Wire [zucity-mcp.js](zucity-mcp.js) into any MCP client — config
   snippets in [README → 60-second start](README.md#60-second-start).
   Keyless by design: it assembles transactions; only your user signs.
4. Give the agent its operating manual:
   [skills/zucity-booking/SKILL.md](skills/zucity-booking/SKILL.md)
   (Claude-family runtimes: copy `skills/zucity-booking/` into your skills
   directory; anything else: fetch the raw URL from [llms.txt](llms.txt)).
5. Booking for other people? The principal duties bind your bot too —
   quote before promising, disclose your referral interest
   (SKILL.md § Acting for a principal).
