import { Link } from "@tanstack/react-router";
import c1 from "@/assets/creator-1.jpg";
import { ScribbleArrow } from "./decor";

export function FeaturedCreators() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
      <p className="font-hand text-2xl text-tomato">— artist spotlight</p>
      <h2 className="mt-1 font-display text-5xl leading-[0.95] md:text-6xl">
        This month, we're<br />looking at&nbsp;<span className="text-warm-blue">D7</span>.
      </h2>

      <div className="mt-12 grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="relative -rotate-1 transition-transform hover:rotate-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-dusty-pink">
              <img
                src={c1}
                alt="Mei Tanaka, illustrator"
                loading="lazy"
                width={800}
                height={1000}
                className="h-full w-full object-cover mix-blend-multiply"
              />
              <span
                className="absolute -top-2 left-6 h-5 w-20"
                style={{
                  background: "rgba(217,164,65,0.6)",
                  transform: "rotate(-5deg)",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6">
          <h3 className="font-display text-4xl">Mei Tanaka</h3>
          <div className="mt-1 flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            <span>Illustration</span>
            <span className="font-hand text-base normal-case tracking-normal text-warm-blue">· Hintonburg</span>
          </div>
          <p className="mt-5 text-lg text-foreground/80">
            Mei makes riso-printed dreamscapes and tiny hand-bound zines about
            small feelings — laundromats at 11pm, the colour of a friend's couch,
            the specific quiet of a Sunday in February.
          </p>
          <p className="mt-4 text-foreground/70">
            Her work lives somewhere between a sketchbook and a love letter.
            We featured eight pieces from her in this month's issue.
          </p>
          <Link
            to="/creators"
            className="group mt-7 inline-flex items-center gap-2 font-display text-xl"
          >
            <span className="scribble-link">See other artists</span>
            <ScribbleArrow className="h-5 w-12 text-tomato transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
