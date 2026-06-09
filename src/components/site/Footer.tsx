import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import logoAsset from "@/assets/logo.svg.asset.json";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-foreground/15 bg-foreground text-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="CollageLab logo" className="h-10 w-10" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl">CollageLab</span>
            <span className="font-hand text-sm text-mustard">creativity lives here</span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream/80">
          <Link to="/about" className="hover:text-tomato">About</Link>
          <Link to="/submit" className="hover:text-tomato">Submit</Link>
          <Link to="/advertise" className="hover:text-tomato">Advertise</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/collagelab.ca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 hover:bg-tomato hover:border-tomato"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://www.facebook.com/share/1bT8HtXFyx/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 hover:bg-tomato hover:border-tomato"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="mailto:art@collagelab.ca"
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 hover:bg-tomato hover:border-tomato"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 text-xs text-cream/50 md:flex-row md:items-center md:justify-between md:px-8">
          <div>© {new Date().getFullYear()} CollageLab</div>
          <div className="font-hand text-sm text-mustard">cut · paste · share</div>
        </div>
      </div>
    </footer>
  );
}
