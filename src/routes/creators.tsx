import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScribbleStar } from "@/components/site/decor";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Collage — Coming Soon · CollageLab" },
      { name: "description", content: "The CollageLab directory of artists, musicians, and makers is on the way." },
      { property: "og:title", content: "Collage — Coming Soon · CollageLab" },
      { property: "og:description", content: "The CollageLab directory of artists, musicians, and makers is on the way." },
    ],
  }),
  component: Creators,
});

function Creators() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />

      <section className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-20 text-center md:px-8">
        <p className="font-hand text-2xl text-tomato">— the directory</p>
        <h1 className="mt-3 font-display text-[clamp(3rem,9vw,6rem)] leading-[0.95] tracking-[-0.03em]">
          <span className="text-warm-blue">Collage</span>
          <ScribbleStar className="ml-3 inline h-12 w-12 align-baseline text-tomato animate-wiggle" />
        </h1>
        <p className="mt-6 font-display text-3xl md:text-4xl">Coming soon.</p>
        <p className="mt-5 max-w-lg text-lg text-foreground/75">
          We're still gathering the first issue. Featured artists and the full directory will land here shortly — check back soon.
        </p>
      </section>

      <Footer />
    </div>
  );
}
