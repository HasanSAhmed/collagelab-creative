import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SubscribeForm } from "@/components/site/SubscribeForm";
import { ScribbleStar } from "@/components/site/decor";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [
      { title: "The Sunday Dispatch — Collage Lab" },
      { name: "description", content: "One email each Sunday. A featured creator, a piece from the zine, and what's happening locally." },
      { property: "og:title", content: "The Sunday Dispatch — Collage Lab" },
      { property: "og:description", content: "One email each Sunday. Featured creators, fresh writing, local happenings." },
    ],
  }),
  component: Subscribe,
});

function Subscribe() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <section className="mx-auto max-w-xl px-5 py-24 text-center md:px-8">
        <ScribbleStar className="mx-auto h-14 w-14 animate-wiggle text-tomato" />
        <p className="mt-4 font-hand text-2xl text-tomato">— the sunday dispatch</p>
        <h1 className="mt-2 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95]">
          One email.<br /><span className="italic text-warm-blue">Every Sunday.</span>
        </h1>
        <p className="mt-5 text-foreground/75">
          A featured creator, a piece from the zine, and a handful of things
          happening locally this week. No tracking, no growth hacks.
        </p>
        <div className="mx-auto mt-10 max-w-md">
          <SubscribeForm />
        </div>
        <ul className="mx-auto mt-10 max-w-sm space-y-2 text-left text-sm text-foreground/70">
          <li>✱ 1 new featured creator per week</li>
          <li>✱ A short read from the current zine</li>
          <li>✱ Local events worth showing up to</li>
          <li>✱ Unsubscribe in one click, no hard feelings</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}
