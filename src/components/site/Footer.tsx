import { Link } from "@tanstack/react-router";
import { ScribbleStar, Sparkle } from "./decor";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-foreground/15 bg-foreground text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-tomato">
              <ScribbleStar className="h-5 w-5 text-cream" />
            </span>
            <div className="font-display text-2xl">CollageLab</div>
          </div>
          <p className="mt-4 max-w-sm text-cream/70">
            CollageLab is a creative space for all arts accepted. Starting in Ottawa.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 font-hand text-xl text-mustard">
            <Sparkle className="h-4 w-4" /> creativity lives here
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.22em] text-cream/50">Explore</div>
          <ul className="mt-4 space-y-2 text-cream/80">
            <li><Link to="/creators" className="hover:text-tomato">Artists</Link></li>
            <li><Link to="/about" className="hover:text-tomato">About Us</Link></li>
          </ul>

        </div>

        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.22em] text-cream/50">Get involved</div>
          <ul className="mt-4 space-y-2 text-cream/80">
            <li><Link to="/submit" className="hover:text-tomato">Submit your work</Link></li>
            <li><Link to="/advertise" className="hover:text-tomato">Advertise</Link></li>

            <li><Link to="/subscribe" className="hover:text-tomato">Subscribe</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between md:px-8">
          <div>© {new Date().getFullYear()} CollageLab — Ottawa, ON.</div>
          <div className="font-hand text-base text-mustard">cut · paste · share</div>
        </div>
      </div>
    </footer>
  );
}
