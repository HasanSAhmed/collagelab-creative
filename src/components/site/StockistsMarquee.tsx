import { Link } from "@tanstack/react-router";

const stockists = [
  "Black Squirrel Books",
  "Octopus Books",
  "Perfect Books",
  "The Mayfair Theatre",
  "ByTowne Cinema",
  "Little Jo Berry's",
  "Bridgehead Roastery",
  "Happy Goat Coffee",
  "Victoire Boutique",
  "Vertigo Records",
  "Possible Worlds",
  "Wall Space Gallery",
];

export function StockistsMarquee() {
  const loop = [...stockists, ...stockists];
  return (
    <section className="border-y-2 border-foreground bg-cream">
      <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-hidden px-5 py-6 md:px-8">
        <div className="shrink-0 font-hand text-2xl text-tomato">find us in print →</div>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {loop.map((name, i) => (
              <span key={`${name}-${i}`} className="inline-flex items-center gap-10 font-display text-2xl text-foreground/80">
                {name}
                <span className="text-tomato">✱</span>
              </span>
            ))}
          </div>
        </div>
        <Link
          to="/find-us"
          className="shrink-0 text-xs uppercase tracking-[0.22em] text-foreground hover:text-tomato"
        >
          The whole map →
        </Link>
      </div>
    </section>
  );
}
