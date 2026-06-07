import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.svg.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/creators", label: "Artists" },
  { to: "/about", label: "About Us" },
  { to: "/advertise", label: "Advertise" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="CollageLab logo"
            className="h-11 w-11 transition-transform group-hover:rotate-6"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-tight">CollageLab</span>
            <span className="font-hand text-sm text-warm-blue">made by people who make things</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-tomato font-medium underline underline-offset-[6px] decoration-2 decoration-tomato" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/submit"
            className="ml-2 rounded-full bg-tomato px-4 py-2 text-sm font-medium text-cream transition-transform hover:-rotate-2"
          >
            Submit your work
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-foreground/20 p-2 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-foreground/15 bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "text-tomato font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/submit"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-tomato px-4 py-2 text-center text-base font-medium text-cream"
            >
              Submit your work
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
