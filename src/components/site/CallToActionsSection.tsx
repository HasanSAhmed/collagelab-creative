import { Link } from "@tanstack/react-router";
import { ScribbleArrow, ScribbleStar } from "./decor";

export function CallToActionsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Creators CTA */}
        <article className="group relative overflow-hidden rounded-md bg-tomato p-10 text-cream md:p-14">
          <ScribbleStar className="absolute -right-4 -top-4 h-32 w-32 text-cream/15 transition-transform duration-500 group-hover:rotate-45" />
          <p className="font-hand text-2xl text-cream/90">— for creators</p>
          <h2 className="mt-2 font-display text-5xl leading-[0.95] md:text-6xl">
            Your work<br />belongs here.
          </h2>
          <p className="mt-5 max-w-md text-cream/85">
            Art, music, film, photography, fashion, writing, science, experimental
            anything. We feature 30+ creators every month — submissions are always free.
          </p>
          <Link
            to="/submit"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-medium text-foreground transition-transform hover:-rotate-2"
          >
            Submit your work
            <ScribbleArrow className="h-4 w-10 text-tomato" />
          </Link>
        </article>

        {/* Partner CTA */}
        <article className="group relative overflow-hidden rounded-md border-2 border-foreground bg-mustard/30 p-10 md:p-14">
          <p className="font-hand text-2xl text-warm-blue">— for local businesses</p>
          <h2 className="mt-2 font-display text-5xl leading-[0.95] md:text-6xl">
            Sponsor the<br />creative scene.
          </h2>
          <p className="mt-5 max-w-md text-foreground/80">
            Cafés, bookstores, festivals, galleries, indie brands — back the people
            making Ottawa interesting. Print + digital placements from $250.
          </p>
          <Link
            to="/advertise"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-cream transition-transform hover:rotate-2"
          >
            See the partner kit
            <ScribbleArrow className="h-4 w-10 text-cream" />
          </Link>
        </article>
      </div>
    </section>
  );
}
