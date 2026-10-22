# SecureKnots website

Marketing site for SecureKnots (GRC and compliance consulting). Next.js 16, React 19, Tailwind 4, GSAP.

This folder started as an export of prototype **#4** (`aksharkh/sec3`, branch `design/meridian`) and folds in the pieces Seema chose from the other prototypes (her message of 10 Oct 2026).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production check: `npm run build`.

The local git history has one commit, the untouched #4 baseline, so `git diff` shows every change made on top of it. Delete `.git` if you would rather start the new repo with fresh history.

## What changed, by Seema's request

| From | Feature | Where |
| --- | --- | --- |
| #4 | Thread hero with hover-to-trace, "Fig." captions, framework family cards with one-line purposes | Homepage hero, section 05 |
| #1 | 60-second readiness quiz (no email needed) | Homepage 08, Frameworks page |
| #1 | Live control matrix (AC-01, CM-02…): pins on scroll, the window opens to full screen, then each row ticks over to "Passing" and the score climbs to 118 | Homepage, after 03 (Fig. 3) |
| #1 | Six industries with framework tags | Homepage 09 |
| #2 | Regional coverage tabs: US, **UK** (new), EU, India, APAC, International | Homepage 06 |
| #2 | Security testing terminal (endpoints → finding → remediation) | Homepage 02, /services/testing |
| #2 | "Why SecureKnots" pillars: Unified, Practitioner-led, Engineer-friendly, Right-sized | Homepage 04 |
| #2 | Live clocks for Delaware and Bengaluru (follow-the-sun) | Homepage 06, footer |
| #2 | "Get my crosswalk" under the overlap calculator (opens booking with the picked frameworks) | Homepage 07, Frameworks page |
| #3 | Coverage matrix hover (frameworks × 16 control domains), Frameworks page only | /frameworks |
| #5 | Homepage told as one story, ending "End of the thread. Now tie yours." | Homepage |
| #5 | Side progress rail (Start · Problem · Services · Process…), desktop only | Homepage |
| #5 | Slide-out index (pages, services, popular frameworks); it is the mobile menu too | "Index" button in the header |
| #6 | Small dashboard card labeled "Illustrative" (readiness bars, evidence mapped to 4 frameworks) | Homepage hero |
| #7 | Figures directly under the hero | Homepage |
| #7 | Ring map, one ring per framework family | /about |
| #7 | Section numbering for scanning | Homepage 01–11, case studies 01–05 |
| #7 | Location on case-study cards | Homepage 10, /customers |

**New standards (7):** BS 9997:2019, BS 10008-1:2020, BS 7858:2019, BS EN 15713:2023, ISO 15489-1:2016, ISO 28000:2022, ISO 14001:2015. Each has its own `/frameworks/<slug>` page. ISO 14001, ISO 28000 and BS 9997 sit under Management Systems; the other four form a new family, "Records & Secure Handling". Later additions, FedRAMP 20x and CUI (NIST SP 800-171), bring the site to 38 frameworks; every count updates from `lib/content.ts`. StateRAMP is listed under its current name, GovRAMP (the URL stays `/frameworks/stateramp`).

### Seema's four rules

1. **Real or permission-cleared stories and stats only.** The figures under the hero now describe the practice itself (38 frameworks, 16 control domains, 3 hubs, 1 control set), not client outcomes. The six case studies in `lib/stories.ts` are still fictional, so they are switched off (`SHOW_STORIES = false`). That hides the homepage stories section, the stories on service, framework and industry pages, and the Customers page and its links; `/customers` returns a 404. Replace them with real, permission-cleared stories, then set `SHOW_STORIES = true` to bring all of it back, with no tags.
2. **"Audit readiness and auditor coordination", never issuing SOC or ISO reports.** Copy was reworded throughout, for example: the "Unified Audit" service is now "Auditor Coordination", process step "Certify" is now "Audit", and "signed report" became "auditor sign-off". `roleLine` in `lib/content.ts` holds the standard sentence.
3. **US spelling throughout**, including US date format (Oct 7, 2026) and 12-hour clocks.
4. **One heavy animation per screen, mobile responsive.** The control matrix from #1 keeps its pinned scroll sequence because it is the only animation on its screen. See "On phones" below.

## On phones

Phones get their own layouts rather than the desktop page shrunk down. Everything shown on desktop is also on a phone, including what desktop reveals on hover (there is no hover on touch screens). Each page was compared element by element at 1440px and 375px wide, with no sideways scrolling.

- **Hero:** the five threads run top to bottom with their labels; tap a thread or name to trace it. The meta line, readiness card and caption all stay.
- **Control matrix:** a compact version with all five framework columns and owners. It pins and fills the screen like desktop when it fits the phone's height, and plays in place on shorter screens.
- **Chapter pill:** the desktop side rail becomes a small pill that appears when you scroll back up; tap it for the full chapter list.
- **Swipe rows** where desktop scrolls sideways or lays cards in a row: the homepage service cards, framework families and story cards, the delivery timeline (with a progress bar), customer stories, and the approach steps on framework pages.
- **Two-up grids** for short items: the framework catalog, values, team, perks, service inclusions, and the ring-map families (tap one to light its ring).
- **Inline details** where desktop uses hover: what each service includes, each industry's note.
- **Section links:** framework pages get a sticky row of section links under the header, and articles show their contents list above the text.
- **Order:** on the contact page the form comes straight after the headline. In the framework overlap tool, the tiles sit right under the toggles, so each tap shows its effect.

The header hides as you scroll down and returns when you scroll up (this was in the code but never worked; GSAP's entrance animation was blocking it). Sticky bars move up with it.

Phone page lengths went down by a quarter to a half: home 25,300px → 19,300px, About 11,600px → 6,700px, a service page 9,800px → 5,800px, Insights 6,200px → 3,400px.

## Core frameworks

Seema asked to lead with **SOC 2, FedRAMP, CMMC and GDPR**, then named her core services: **FedRAMP 20x, FedRAMP, GovRAMP, CMMC, CUI and ITAR**. FedRAMP 20x is the featured service (`FEATURED_SLUG`), with a link above the homepage headline and a large card at the top of the core section covering Classes A to D, KSIs and the SDR package in Word and JSON. Its page content follows FedRAMP's Consolidated Rules for 2026 (class requirements, KSIs, Security Decision Record); re-check it against fedramp.gov when FedRAMP updates those rules, since Class D is still a pilot. `CORE_SERVICES` controls the "Core" tags and ordering below. The four homepage cards come from `CORE_SLUGS` in `lib/frameworks.ts`, and their entries carry extra content under `core` (what it proves, who asks for it, a four-step delivery plan, deliverables), plus six requirements and their own FAQs. Change the list there and every place below follows:

- Homepage: the hero line names them first, and a new section, 02 "Core frameworks", has one card each (a swipe row on phones). "The problem" lists them as the separate programs.
- Each of the four framework pages: a "Core framework" label, "What it proves" and "Asked for by" boxes, its own delivery steps, and a "What you get" section.
- Framework index: they come first, tagged "Core".
- Header Frameworks menu, footer frameworks box, booking form and readiness quiz: they come first.
- Service pages: they appear in each service's "Frameworks covered".

**Hubs:** Seema said there are three delivery hubs. The count is updated everywhere it appears (homepage figures, hero line, coverage section, About, Careers), but only Wilmington and Bengaluru are listed with addresses and clocks. Add the third to `contact.offices` in `lib/content.ts` once she shares the city, address, phone and time zone.

## Layout, type and motion

- **Spacing:** desktop sections use 96–112px of vertical padding (was 160px), and the gap between a section heading and its content is 56px (was 96px).
- **Fuller sections:** the homepage's plain hairline lists are now cards. Services are a 2 + 3 grid with thread art and deliverables, and "Why SecureKnots" is four cards. Framework families are cards with clickable chips, regional frameworks are tiles, the lead story is a blue panel, and insights have covers. The hero figure sits on a tinted panel, and the figures under it are on a dark band with the framework names.
- **Numbers:** every figure uses the `.num` style in `app/globals.css`: Geist at weight 500 with even-width digits. Instrument Serif's numerals are hairline-thin at large sizes and didn't match their labels.
- **Header:** a full-width bar at the top of the page and a floating pill once you scroll. It hides when you scroll down and returns when you scroll up.
- **Footer:** a dark card floating on the page that grows to fill the screen edge to edge as you scroll to the end (`components/meridian/MeridianFooter.tsx`). Inside are boxes with a soft light that follows the pointer: the next step, the newsletter, frameworks, services, company, and both offices with live clocks and a working-hours light. Below them, the wordmark is in polished chrome (`.chrome-word` in `app/globals.css`). It rises into place as the card fills, a sheen sweeps across it every few seconds, and on hover the highlight follows the pointer while fine vertical blades catch the light.
- **The knot, everywhere:** the logo ties itself in the loader on every full page load (a faster version on refreshes within the same session), on the curtain of every page change (`components/providers/PageTransition.tsx`), under every inner-page title once the page opens, and in thread dividers between homepage sections that draw as you scroll (`components/brand/ThreadKnot.tsx`). All of it is SVG strokes, so it stays light next to each screen's one heavy animation. While the loader and page transitions run, `smoothStalls()` in `lib/gsap.ts` makes GSAP pause through start-up freezes instead of skipping ahead, so slower devices still see the whole knot.

## Logo

The registered SecureKnots mark, rebuilt as clean vector art from the only available copy (a 391×501px crop from the old website). Each strand was fitted to the original pixel by pixel: same geometry, proportions, cuts and metallic shading, now sharp at any size. The design is unchanged.

- **Files:** `public/brand/secureknots-logo.svg` (full badge), `public/brand/secureknots-mark-mono.svg` (knot only, single color), `public/brand/secureknots-logo-512.png`. Favicons are in `app/` (`favicon.ico`, `icon.svg`, `apple-icon.png`).
- **In code:** `<SecureKnotsLogo />` in `components/brand/SecureKnotsLogo.tsx`. Use `variant="knot"` for the frameless single-color knot, and `onDark` on dark backgrounds. The geometry lives in `lib/brand/logo-data.ts` (generated, don't hand-edit).
- **Motion:** `lib/brand/knotTimeline.ts` ties the knot. The hexagon traces itself, the strands drift in and draw themselves layer by layer, then the knot cinches and a sheen passes over it. It plays in the loader on every page load (faster on a refresh) and when the homepage's closing section ("Now tie yours.") scrolls into view, where clicking the badge replays it. With reduced-motion settings it simply shows the finished logo.

If a high-resolution original turns up (the vector file from whoever registered it), compare it against this version before print use.

## Still needs real content before launch

- `lib/stories.ts`: six fictional case studies (names, figures, quotes), hidden until replaced (see rule 1). The `testimonials` in `lib/content.ts` are placeholders too and only appear on the hidden Customers page.
- `lib/content.ts`: `team` (placeholder roles, no names or photos), `credentials`, `roles` (careers), and the security-testing commitments (48h critical findings, free retest), which SecureKnots needs to confirm.
- `components/overlays/BookingModal.tsx`: the form shows success but is not yet connected to email or a CRM (see the TODO).
- The control matrix, readiness card and terminal output are labeled as illustrations, which is intended.

## Optional cleanup

These components came from the other prototypes and are no longer imported. They can be deleted; removing `components/home/KnotScene.tsx` also lets you drop the `three` dependency.

`components/page/DrawRule.tsx`, `components/home/{ControlMatrix,FrameworkMarquee,Hero,Insights,KnotScene,LetterPortal,Problem,Services,Stats}.tsx`, `components/layout/{Footer,Nav,Preloader}.tsx`, `components/signal/{SignalFooter,SignalLoader}.tsx`, `components/signal/home/{Sections,SignalHero}.tsx`, `components/ui/{FlowThread,GlassCursor,Marquee,ThemeLab}.tsx`
