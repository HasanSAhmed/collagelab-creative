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
                alt="First Name Last Name, Medium"
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
          <h3 className="font-display text-4xl">First Name Last Name</h3>
          <div className="mt-1 flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            <span>Medium</span>
            <span className="font-hand text-base normal-case tracking-normal text-warm-blue">· Where</span>
          </div>
          <p className="mt-5 text-lg text-foreground/80">
            About
          </p>
          <p className="mt-4 text-foreground/70">
            About continued
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
