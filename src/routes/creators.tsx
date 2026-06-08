import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScribbleStar } from "@/components/site/decor";
import c1 from "@/assets/creator-1.jpg";
import c2 from "@/assets/creator-2.jpg";
import c3 from "@/assets/creator-3.jpg";
import c4 from "@/assets/creator-4.jpg";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Creators — Collage Lab" },
      { name: "description", content: "Painters, musicians, sculptors, poets, photographers, and filmmakers featured in Collage Lab." },
      { property: "og:title", content: "Creators — Collage Lab" },
      { property: "og:description", content: "The artists featured in Collage Lab — music, physical art, visual art." },
    ],
  }),
  component: Creators,
});

type Creator = { name: string; craft: string; hood: string; img: string; tint: string };

type Section = { id: string; name: string; blurb: string; creators: Creator[] };

const sections: Section[] = [
  {
    id: "music",
    name: "Music",
    blurb: "Songs, recordings, live sets.",
    creators: [
      { name: "Theo Lavoie", craft: "Bedroom pop", hood: "Centretown", img: c2, tint: "bg-tomato" },
      { name: "Felix Côté",  craft: "Ambient",     hood: "Gatineau",   img: c4, tint: "bg-warm-blue" },
    ],
  },
  {
    id: "physical-art",
    name: "Physical Art",
    blurb: "Sculpture, ceramics, textile, hand-made objects.",
    creators: [
      { name: "Priya Kaur",   craft: "Textile",   hood: "Westboro", img: c3, tint: "bg-earth-green" },
      { name: "Jules Martin", craft: "Sculpture", hood: "Vanier",   img: c1, tint: "bg-mustard" },
    ],
  },
  {
    id: "visual-art",
    name: "Visual Art",
    blurb: "Painting, illustration, photography, film.",
    creators: [
      { name: "Mei Tanaka",  craft: "Illustration", hood: "Hintonburg", img: c1, tint: "bg-dusty-pink" },
      { name: "Lena Park",   craft: "Photography",  hood: "ByWard",     img: c3, tint: "bg-tomato" },
      { name: "Sam Okafor",  craft: "Film",         hood: "ByWard",     img: c4, tint: "bg-dusty-purple" },
    ],
  },
];

function Creators() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <section className="relative mx-auto max-w-5xl px-5 pt-20 pb-12 md:px-8">
        <p className="font-hand text-2xl text-tomato">— the directory</p>
        <h1 className="mt-2 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-[-0.03em]">
          This week's<br />
          collage.
          <ScribbleStar className="ml-3 inline h-12 w-12 align-baseline text-tomato animate-wiggle" />
        </h1>
      </section>

      {sections.map((sec) => (
        <section key={sec.id} className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3 border-b-2 border-foreground pb-4">
            <h2 className="font-display text-4xl md:text-5xl">{sec.name}</h2>
            <p className="font-hand text-xl text-tomato">{sec.blurb}</p>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sec.creators.map((c, i) => (
              <article
                key={`${sec.id}-${c.name}`}
                className={`group cursor-pointer ${i % 2 ? "-rotate-1" : "rotate-1"} transition-transform hover:rotate-0 hover:-translate-y-1`}
              >
                <div className={`relative aspect-[4/5] overflow-hidden rounded-sm ${c.tint}`}>
                  <img
                    src={c.img}
                    alt={`${c.name}, ${c.craft}`}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span
                    className="absolute -top-2 left-6 h-5 w-20"
                    style={{
                      background: i % 2 ? "rgba(217,162,162,0.7)" : "rgba(217,164,65,0.6)",
                      transform: "rotate(-5deg)",
                      mixBlendMode: "multiply",
                    }}
                  />
                </div>
                <div className="mt-4 px-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl leading-tight">{c.name}</h3>
                    <span className="font-hand text-base text-warm-blue">{c.hood}</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.craft}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="py-16" />
      <Footer />
    </div>
  );
}
