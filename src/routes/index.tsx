import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/collage-hero.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SubscribeForm } from "@/components/site/SubscribeForm";
import { FeaturedCreators } from "@/components/site/FeaturedCreators";
import { ScribbleArrow, ScribbleStar, Sparkle, TapeStrip } from "@/components/site/decor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CollageLab — Ottawa's creative ecosystem" },
      { name: "description", content: "A creative ecosystem for artists, musicians, sculptors, poets, filmmakers, and makers. Born in Ottawa." },
      { property: "og:title", content: "CollageLab — made by people who make things" },
      { property: "og:description", content: "A creative ecosystem for artists, musicians, sculptors, poets, filmmakers, and makers. Born in Ottawa." },
    ],
  }),
  component: Index,
});

const disciplines = [
  "Painting", "Music", "Sculpture", "Film", "Photography",
  "Poetry", "Fashion", "Illustration", "Printmaking",
  "Ceramics", "Performance", "Design", "Animation",
];

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative mx-auto max-w-7xl px-5 pt-8 pb-12 md:px-8 md:pt-12 md:pb-16">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
          {/* Left: type */}
          <div className="md:col-span-7">
            <p className="inline-flex items-center gap-2 font-hand text-2xl text-tomato">
              <Sparkle className="h-4 w-4" />
              Ottawa · est. 2026
            </p>
            <h1 className="mt-3 font-display text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.03em]">
              Made by{" "}
              <span className="relative inline-block">
                people
                <TapeStrip className="absolute -top-2 left-2 h-3 w-20 md:w-28" rotate={-6} color="pink" />
              </span>
              <br />
              who <em className="text-tomato">make</em> things.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-foreground/75 md:text-xl">
              CollageLab is a creative space for all arts accepted.
            </p>


            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/creators"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-base font-medium text-cream transition-transform hover:-rotate-2"
              >
                Read collage
                <ScribbleArrow className="h-4 w-10 text-tomato" />
              </Link>

              <Link
                to="/submit"
                className="rounded-full border-2 border-foreground px-6 py-3 text-base font-medium text-foreground hover:bg-foreground hover:text-cream"
              >
                Submit your work
              </Link>

            </div>
          </div>

          {/* Right: collage hero image */}
          <div className="relative md:col-span-5">
            <div className="relative">
              <div className="relative rotate-2p overflow-hidden rounded-sm border border-foreground/20 bg-cream shadow-[8px_10px_0_rgba(20,18,14,0.08)]">
                <img
                  src={heroImage}
                  alt="A risograph collage of cassette tapes, polaroids, torn paper, hand-drawn stars and tape"
                  width={1536}
                  height={1280}
                  className="h-auto w-full"
                />
                <TapeStrip className="absolute -top-2 left-6 h-5 w-24" rotate={-6} color="mustard" />
                <TapeStrip className="absolute -top-2 right-10 h-5 w-20" rotate={4} color="pink" />
              </div>
              <ScribbleStar className="absolute -right-6 -top-6 h-16 w-16 animate-spin-slow text-tomato" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== DISCIPLINES MARQUEE ===== */}
      <section className="border-y-2 border-foreground bg-foreground text-cream">
        <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-hidden px-5 py-5 md:px-8">
          <div className="shrink-0 font-hand text-2xl text-mustard">we celebrate →</div>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee-slow gap-10 whitespace-nowrap">
              {[...disciplines, ...disciplines].map((d, i) => (
                <span key={`${d}-${i}`} className="inline-flex items-center gap-10 font-display text-3xl">
                  {d}
                  <span className="text-tomato">✱</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="relative mx-auto max-w-5xl px-5 py-14 text-center md:px-8">
        <p className="font-hand text-2xl text-tomato">— what we believe</p>
        <h2 className="mt-3 font-display text-4xl leading-[1.02] tracking-[-0.02em] md:text-6xl">
          Art belongs to anyone{" "}
          <span className="italic text-warm-blue">curious enough</span> to make
          something — a painting, a song, a poem, a film, a small
          <span className="italic text-dusty-purple"> universe</span>.
        </h2>
      </section>

      <FeaturedCreators />

      {/* ===== SUBSCRIBE ===== */}
      <section className="relative mx-auto max-w-3xl px-5 py-14 text-center md:px-8">
        <ScribbleStar className="mx-auto h-12 w-12 text-tomato" />
        <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
          CollageLab to<br />your inbox.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/70">
          One short email each week. A featured artist and what's happening in each issue.
        </p>
        <div className="mx-auto mt-10 max-w-md">
          <SubscribeForm />
        </div>
        
      </section>

      <Footer />
    </div>
  );
}
