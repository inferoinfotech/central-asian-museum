# Winter pop-up

A notice that appears when someone opens the website, saying the museum is closed for winter. It switches itself off
at **00:00 IST on 1 May 2027**.

This is kept apart from `CHANGES-FOR-DEVELOPER.md` because it is seasonal, not a permanent change to the site.

## What visitors see

A centred card over the page, on the first page they open:

- **Heading:** The museum is closed for winter
- **Text:** For centuries, Silk Road caravans waited out the Ladakhi winter in Leh until the high passes opened again.
  We keep the same calendar: closed from November, back in May when the apricot trees blossom.
- **Button:** Explore the museum in the meantime → `/about`
- **Close cross** at the top right

It closes on the cross, the Esc key, or a click outside the card. While it is open the page behind does not scroll, and
the keyboard stays inside the card. It shows once per visit (`sessionStorage` key `cam-winter-notice-seen`), so it does
not come back on the next page.

## When it ends

On 1 May 2027 at 00:00 India Standard Time (UTC+5:30), which is 30 April 2027, 18:30 UTC. The time is written with its
offset, so it is the same moment whatever time zone the server or the visitor is in. Two checks:

- **Server** (`serve.py` / Next.js): `WINTER_ENDS`. From that moment it stops adding the pop-up to pages.
- **Browser** (`winter-notice.js` / `WinterNotice.tsx`): checks the same moment, so a page loaded before midnight and opened
  after it does not show the pop-up.

To show it again next winter, change the date in both places (and the text, if the months change).

## Files (Next.js Implementation)

| File | What |
| --- | --- |
| `app/globals.css` | The pop-up's look: the site's own fonts and `--museum-*` colours, fade-in, phone layout |
| `components/common/WinterNotice.tsx` | Next.js component: end date check (`2027-05-01T00:00:00+05:30`), closing, focus trap, scroll lock, once per visit |
| `app/layout.tsx` | Global layout integration; excluded automatically on `/admin` pages |

