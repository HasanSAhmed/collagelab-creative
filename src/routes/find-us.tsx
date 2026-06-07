import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScribbleStar, Sparkle, TapeStrip } from "@/components/site/decor";

export const Route = createFileRoute("/find-us")({
  head: () => ({
    meta: [
      { title: "Local Guide — Collage Lab" },
      { name: "description", content: "The Collage Lab guide to Ottawa: cafés, bookstores, galleries, cinemas, record shops, and creative spaces worth knowing." },
      { property: "og:title", content: "Local Guide — Collage Lab" },
      { property: "og:description", content: "Ottawa's indie cafés, bookstores, galleries, cinemas, and creative spaces — handpicked." },
    ],
  }),
  component: LocalGuide,
});

type Spot = { name: string; address: string; kind: string; note?: string; tint: string };

const sections: { name: string; blurb: string; spots: Spot[] }[] = [
  {
    name: "Cafés & places to make things",
    blurb: "Where to sit for three hours with a sketchbook and a coffee.",
    spots: [
      { name: "Bridgehead Roastery", address: "130 Anderson St · Hintonburg", kind: "Café", note: "Big windows, espresso bar, indie-zine friendly.", tint: "bg-dusty-pink" },
      { name: "Happy Goat Coffee", address: "35 Laurel St · Hintonburg", kind: "Café", tint: "bg-mustard" },
      { name: "Little Jo Berry's", address: "150B Beechwood Ave · New Edinburgh", kind: "Vegan café", tint: "bg-earth-green text-cream" },
    ],
  },
  {
    name: "Books, records, beautiful objects",
    blurb: "For when the algorithm feels exhausting.",
    spots: [
      { name: "Black Squirrel Books", address: "1073 Bank St · Old Ottawa South", kind: "Books", note: "Used + new, deep weird non-fiction shelves.", tint: "bg-warm-blue text-cream" },
      { name: "Octopus Books", address: "251 Bank St · Centretown", kind: "Books", tint: "bg-dusty-purple text-cream" },
      { name: "Perfect Books", address: "258A Elgin St · Centretown", kind: "Books", tint: "bg-tomato text-cream" },
      { name: "Vertigo Records", address: "193 Rideau St · ByWard", kind: "Records", note: "Vinyl + the best in-store soundtrack downtown.", tint: "bg-mustard" },
    ],
  },
  {
    name: "Galleries & places to look",
    blurb: "Free to wander into. Always changing.",
    spots: [
      { name: "Wall Space Gallery", address: "358 Richmond Rd · Westboro", kind: "Gallery", tint: "bg-dusty-pink" },
      { name: "Possible Worlds", address: "381 Booth St · Lebreton", kind: "Project space", note: "Unpredictable, often weird, always worth it.", tint: "bg-earth-green text-cream" },
      { name: "Ottawa Art Gallery", address: "10 Daly Ave · ByWard", kind: "Public gallery", tint: "bg-warm-blue text-cream" },
    ],
  },
  {
    name: "Cinemas & sound",
    blurb: "Repertory, indie, and the occasional 35mm reel.",
    spots: [
      { name: "The Mayfair Theatre", address: "1074 Bank St · Old Ottawa South", kind: "Cinema", note: "Cult classics, Rocky Horror, midnight runs.", tint: "bg-tomato text-cream" },
      { name: "ByTowne Cinema", address: "325 Rideau St · ByWard", kind: "Cinema", tint: "bg-dusty-purple text-cream" },
    ],
  },
];

function LocalGuide() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <section className="relative mx-auto max-w-5xl px-5 pt-20 pb-10 md:px-8">
        <p className="font-hand text-2xl text-tomato"><Sparkle className="mr-1 inline h-4 w-4" /> the local guide</p>
        <h1 className="mt-2 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-[-0.03em]">
          Ottawa, the<br />
          <span className="relative inline-block italic text-warm-blue">
            interesting bits
            <TapeStrip className="absolute -top-2 left-2 h-3 w-32 md:w-44" rotate={-3} color="mustard" />
          </span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/75">
          A working list of the cafés, bookshops, galleries, cinemas, and small
          creative spaces we love. Pick up the printed zine at most of these too.
        </p>
      </section>

      {sections.map((sec) => (
        <section key={sec.name} className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b-2 border-foreground pb-4">
            <h2 className="font-display text-4xl md:text-5xl">{sec.name}</h2>
            <p className="font-hand text-xl text-tomato">{sec.blurb}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sec.spots.map((s, i) => (
              <div
                key={s.name}
                className={`relative rounded-md p-6 ${s.tint} ${i % 2 ? "-rotate-1" : "rotate-1"} transition-transform hover:rotate-0`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl leading-tight">{s.name}</h3>
                  <span className="shrink-0 text-xs uppercase tracking-[0.2em] opacity-70">{s.kind}</span>
                </div>
                <div className="mt-2 text-sm opacity-80">{s.address}</div>
                {s.note && <p className="mt-3 font-hand text-lg">{s.note}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Become a stockist */}
      <section className="relative mt-12 border-y-2 border-foreground bg-mustard">
        <ScribbleStar className="absolute right-10 top-10 hidden h-20 w-20 text-foreground/15 md:block" />
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
          <p className="font-hand text-2xl text-tomato">— run a shop or space?</p>
          <h2 className="mt-2 font-display text-5xl leading-[0.95] md:text-6xl">
            Carry the zine.<br />Host an event.
          </h2>
          <p className="mt-5 text-foreground/80">
            We drop off prints for free, restock monthly, and bring stickers for your door.
            We also love co-hosting listening parties, launches, and small exhibitions.
          </p>
          <div className="mt-8">
            <Link to="/advertise" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-cream hover:-rotate-2 transition-transform">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
