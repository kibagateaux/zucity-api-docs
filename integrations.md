# Out-of-app integrations — calendar feeds, Luma events, chat groups

How ZuCity reaches calendars and chats *outside* the REST/MCP surface.
Endpoint parameters are documented once, in [api.md](api.md) — this file is
the workflows. Labels used below: **Verified** = executed live 2026-07-13;
**External product flow** = another product's UI, not a ZuCity surface;
**Status as of a date** = verified presence/absence, re-check via the
freshness walk ([AGENTS.md](AGENTS.md)).

## 1 · Calendar feeds — subscribe, don't scrape

*A traveler planning around ZuCity events puts them in Google Calendar with
one click and they stay current. A host or manager puts booked days for
their listings into the calendar app they already use — knowing, before
sharing a feed, that wallet feeds are public.*

The feed is `GET /api/calendars` — ICS by default, JSON for programs, with
community/wallet/type/date filters ([api.md → GET /api/calendars](api.md#get-apicalendars)).

**Google Calendar, one click** (Verified): open

```
https://zucity.org/api/calendars?format=google
```

It answers `302` to Google Calendar's add-by-URL screen
(`https://calendar.google.com/calendar/render?cid=webcal%3A%2F%2Fzucity.org%2Fapi%2Fcalendars`);
what happens after you confirm is Google's own add-calendar flow (external
product). Filters carry into the subscription — Verified for community
scoping: `?communityName=zucity&format=google` redirects with the scoped
feed embedded in `cid`.

**Apple Calendar / clients that speak webcal** (Verified):
`?format=ical` answers `302 webcal://zucity.org/api/calendars`.

**Any other client**: paste `https://zucity.org/api/calendars` (plus
filters) into "Subscribe by URL" / "From URL".

**Subscribe, don't import.** A subscription keeps updating — the feed
declares a weekly refresh hint (`REFRESH-INTERVAL P1W`, Verified), and your
calendar client decides its own actual refresh cadence. Downloading the
`.ics` and importing it gives a frozen snapshot that never updates.

**Scoped feeds and privacy.** `/api/calendars/{slug}` scopes to a community;
`/api/calendars/{0xWallet}` serves **that wallet's bookings — to anyone**.
There is no private-booking mode today. Booking for someone? Choose the
`recipient` address deliberately — a dedicated wallet decouples stays from a
main identity ([contracts.md → receipt lifecycle](contracts.md#receipt-lifecycle),
[skills.md → Receipts are public](skills.md#guardrails--failure-modes)).

**Agents**: reason over `?format=json` (the chain bridge — real prices,
booked days); hand the `format=google` URL to humans who ask for "the
calendar in my Google".

## 2 · Getting your event onto the ZuCity calendar (Luma rail)

*An organizer running a meetup gets it onto the ZuCity site, API, and every
subscriber's calendar without building an integration — it rides the Luma
listing. A subscriber gets one feed carrying community events, whoever
organizes them.*

**How propagation works** (Verified, each arrow): an event published on an
**affiliated Luma calendar** is scraped periodically into
`GET /api/luma` → appears as a `luma-evt-*` entry in the ICS feed above →
shows on the site calendar (`zucity.org/en/calendar`) → reaches every
subscribed client, including Google Calendars added via `format=google`.
One Luma listing, every surface.

**Which calendars are affiliated**: read the live list — it changes:

```bash
curl -s https://zucity.org/api/luma | jq '.calendars'
```

**To get your event in** (External product flow — Luma): publish it on an
affiliated Luma calendar — create it there if you host on that calendar, or
use Luma's own submit-to-calendar flow (luma.com). ZuCity operates no
separate event-submission API (verified absence — see the NOT-SUPPORTED
discipline in [api.md](api.md)).

**To get a calendar affiliated, or sell tickets**: no public self-serve as
of 2026-07-13 — contact via [zucity.org](https://zucity.org) (footer /
llms.txt contact). Ticketed ZuCity events also list in `/api/inventory` as
`itemtype=ticket` ([api.md](api.md)).

**Verify propagation yourself** (Verified, exits 0):

```bash
curl -s https://zucity.org/api/luma | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['scraped_at']); print('\n'.join(e['url'] for e in d['events']))"
# your event: grep its luma.com slug in the output
```

**Honest latency**: the scrape is periodic — `scraped_at` in the response
is the last run; end-to-end delivery adds each subscriber's client refresh.
No fixed schedule is promised.

## 3 · The ZuCity agent in group chats — status and duties

*A group planning a trip together wants the agent where they already talk —
and gets a truthful answer about what works today. A community operator
offers in-group booking help without misleading members about what's
official or exposing them without consent.*

**Status as of 2026-07-13** (verified on zucity.org homepage + site
llms.txt):

- A public **ZuCity Telegram group chat exists** — entry via the "Join the
  group chat" link on the [zucity.org](https://zucity.org) homepage. The
  invite link lives there on purpose; invite hashes rotate, so this file
  never embeds one — a stale hash is a squatter's gift.
- There is **no public self-serve path to add a ZuCity-hosted agent to your
  own Telegram / Discord / WhatsApp group**, and no official ZuCity Discord
  or WhatsApp presence at all. A bot handle claiming to be ZuCity is not
  ours until zucity.org or this repo says so — check both before trusting
  one.

**Before adding any agent to a group — yours or anyone's** (integration
guidance, MUST — read before the mechanics below):

1. **Consent first.** An admin adding a bot is not member consent — tell the
   group what the agent reads and let people object before it joins.
2. **In-group booking is public twice over.** The group sees the plan, and
   every booking mints a public onchain receipt — recipient wallet, listing,
   dates, amount, readable by anyone ([skills.md → Receipts are
   public](skills.md#guardrails--failure-modes)). Booking for someone else?
   Choose the `recipient` deliberately.
3. **Never paste keys in chat.** The agent assembles; each buyer signs their
   own transaction. Nothing here ever needs a private key in a message.

**What works today — bring your own agent** (Verified components): run this
repo's keyless MCP server in your own agent runtime and add *your* agent to
*your* group ([README quickstart](README.md), [skills.md](skills.md)). It
searches, quotes, and assembles ready-to-sign calldata and checkout links;
each member signs and pays for themselves.

**Want a ZuCity-hosted group agent?** Ask via [zucity.org](https://zucity.org)
contact or the group chat above. If it ships, this section and
`facts.json .meta.docsRevision` will say so — the freshness walk in
[AGENTS.md](AGENTS.md) is how you notice.
