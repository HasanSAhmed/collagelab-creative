# MarsBox — Multimedia Newsletter Site

A clean, white-leaning editorial site for MarsBox: a multimedia newsletter showcasing reader-submitted music videos, art, animations, and more. Visual tone: soft and gentle — lots of white, generous space, calm accent colors (dusty pink, soft sky blue, muted cream), serif display headings paired with a clean sans body. Light editorial/zine sensibility, never loud.

## Pages (separate routes)

- `/` — Landing: hero introducing MarsBox, a peek at featured submissions (image/video tiles), how it works, latest issue teaser, email signup
- `/about` — Story behind MarsBox, what gets featured, the people/curator note
- `/submit` — Submission form (links + file uploads), guidelines
- `/advertise` — Ad inquiry page: audience snapshot, ad slot options, contact form
- `/subscribe` — Dedicated subscribe page (also embedded as inline form on `/`)

Shared header with nav + footer across all routes. Each route gets its own `head()` metadata (title, description, og tags).

## Design system

- Background: near-white (#FBFAF7 warm paper)
- Foreground: near-black (#141414)
- Accents: dusty pink (#E8C5C5), soft blue (#B8D4E8), muted cream (#F0EBE3)
- Typography: serif display (e.g. Instrument Serif or DM Serif Display) for headings + clean sans (Work Sans / Inter) for body
- Generous whitespace, thin hairline dividers, subtle hover states, no heavy shadows
- All tokens defined in `src/styles.css` using oklch

## Functionality

**Subscribe (email signup)** — requires Lovable Cloud. Stores subscriber emails in a `subscribers` table with RLS allowing public insert only. Inline form on `/` and `/subscribe`.

**Submit page** — combined form:
- Creator name, email, title, medium (music/art/animation/other), description
- External link field (YouTube/Vimeo/image URL)
- Optional file upload (image/video) to a Cloud Storage bucket `submissions` (private; admin reviews)
- Inserts a row in a `submissions` table
- Client + server-side validation (zod): length limits, email format, URL format, file size/type

**Advertise page** — inquiry form (name, company, email, budget range, message) → stored in `ad_inquiries` table.

All three forms use zod validation, toast feedback, and proper RLS (public insert, no public select).

## Technical details

- Routes under `src/routes/` (flat): `index.tsx`, `about.tsx`, `submit.tsx`, `advertise.tsx`, `subscribe.tsx`
- Shared `Header` and `Footer` components in `src/components/site/`
- Enable Lovable Cloud → migrations for three tables + one storage bucket + RLS policies
- Form submissions via `createServerFn` handlers in `src/lib/*.functions.ts` using `requireSupabaseAuth`-free public inserts (anon insert with RLS gate)
- Hero/feature imagery generated via image generation (soft, dreamy, multimedia-collage aesthetic)
- Update `__root.tsx` head with default MarsBox metadata; each route overrides

## Out of scope (v1)

- No public archive of past issues yet (can add later)
- No admin dashboard for reviewing submissions (queryable via Cloud)
- No payment flow for ads (inquiry only)
