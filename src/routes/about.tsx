import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sparkle, TapeStrip } from "@/components/site/decor";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CollageLab" },
      { name: "description", content: "CollageLab is a creative ecosystem for artists in Ottawa — painters, musicians, sculptors, poets, filmmakers." },
      { property: "og:title", content: "About — CollageLab" },
      { property: "og:description", content: "The story behind CollageLab." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <section className="relative mx-auto max-w-5xl px-5 pt-20 pb-12 md:px-8">
        <p className="font-hand text-2xl text-tomato"><Sparkle className="mr-1 inline h-4 w-4" />about us</p>
        <h1 className="mt-2 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em]">
          A small beginning for<br />
          Ottawa's artists<br />
          <span className="relative inline-block italic text-warm-blue">
            <TapeStrip className="absolute -top-2 left-0 right-0 h-3" rotate={-3} color="mustard" />
          </span><br /><br /><br /><br />
        </h1>
      </section>

      <article className="mx-auto max-w-3xl space-y-7 px-5 py-10 text-lg leading-relaxed text-foreground/85 md:px-8 md:text-xl">
        <p>
          CollageLab started in May 2026 in a high school French class, with two teens sick of doing grammar worksheets and yearning to create something. We had the feeling that Ottawa's art scene was bigger and stronger than anyone gave it credit for. After tons of research, facetimes and Tim Horton's runs, we realized this was more than just another grammar worksheet. This felt like something real. And we were determined
        </p>
        <p>
          This is CollageLab's first week on the scene, and we need YOUR help to get us started!
        </p>
        <p className="font-display text-3xl text-foreground md:text-4xl">
          Our goal is simple:{" "}
          <span className="italic text-tomato">find the artists, put them in front of each other</span>,
          and help them get seen.
        </p>
      </article>


      <Footer />
    </div>
  );
}
