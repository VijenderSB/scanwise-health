import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ChevronDown, Menu, PhoneCall, ShieldCheck, X } from "lucide-react";
import { LeadCapture } from "@/components/bookmyscan/LeadCapture";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/catalog";

const nav = [
  ["Advanced Cancer Imaging", "/advanced-cancer-imaging"],
  ["Lu‑177 PSMA Therapy", "/lu-177-psma-therapy"],
  ["Scan Cost Guide", "/scan-cost"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scanMenuOpen, setScanMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-primary px-4 py-2 text-center text-xs text-primary-foreground">
        Compare prices only after confirming the prescribed protocol. Always consult your treating doctor.
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="page-wrap flex h-18 items-center justify-between gap-5">
          <Link to="/" className="brand-lockup" aria-label="SavoScan.com home">
            <span className="brand-mark"><span>Savo</span>Scan.com</span>
            <span className="brand-tagline">Your Scan. Your Savings.</span>
          </Link>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            <ScanTestsDropdown />
            {nav.map(([label, to]) => (
              <Link key={to} to={to} className="nav-link" activeProps={{ className: "nav-link-active" }}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button asChild size="lg">
              <Link to="/book-a-scan"><PhoneCall />Check Scan Price</Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav className="page-wrap grid gap-1 border-t border-border py-3 xl:hidden" aria-label="Mobile navigation">
            <Button
              variant="ghost"
              className="h-auto justify-between px-3 py-3 text-sm font-medium"
              aria-expanded={scanMenuOpen}
              onClick={() => setScanMenuOpen(!scanMenuOpen)}
            >
              Scan Tests
              <ChevronDown className={`transition-transform ${scanMenuOpen ? "rotate-180" : ""}`} />
            </Button>
            {scanMenuOpen && (
              <div className="grid border-l border-border pl-3">
                <Link to="/scan-tests" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">
                  View all scan tests
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to="/scan-tests/$modality"
                    params={{ modality: category.slug }}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            {nav.map(([label, to]) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-muted">
                {label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link to="/book-a-scan" onClick={() => setOpen(false)}>Check Scan Price</Link>
            </Button>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="bg-primary text-primary-foreground">
        <div className="page-wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="brand-lockup">
              <div className="brand-mark brand-mark-inverse"><span>Savo</span>Scan.com</div>
              <div className="brand-tagline brand-tagline-inverse">Your Scan. Your Savings.</div>
            </div>
            <p className="mt-4 text-sm leading-6 text-primary-foreground/75">Compare scan centres, review preferential rates and request appointment support across Delhi NCR.</p>
          </div>
          <FooterLinks title="Explore" links={[["Scan Tests", "/scan-tests"], ["Scan Centres", "/scan-centres"], ["Preparation Guides", "/preparation-guides"], ["Compare Scans", "/compare-scans"]]} />
          <FooterLinks title="Delhi NCR" links={[["Delhi", "/scan-centres/delhi"], ["Gurgaon", "/scan-centres/gurgaon"], ["Noida", "/scan-centres/noida"], ["Faridabad", "/scan-centres/faridabad"]]} />
          <div>
            <h3 className="footer-title">Patient safety</h3>
            <p className="text-sm leading-6 text-primary-foreground/75">Not for emergencies, diagnosis or treatment recommendations. In an emergency, call 112 or visit the nearest hospital.</p>
            <div className="mt-4 flex items-center gap-2 text-xs"><ShieldCheck className="size-4 text-accent" />Privacy-conscious assistance</div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="page-wrap flex flex-col gap-3 py-5 text-xs text-primary-foreground/65 md:flex-row md:justify-between">
            <p>© 2026 SavoScan.com. Scan comparison and appointment-assistance platform.</p>
            <p>Final prices and clinical decisions remain with centres and qualified doctors.</p>
          </div>
        </div>
      </footer>
      <LeadCapture />
      <div className="mobile-price-cta">
        <Button asChild size="lg"><Link to="/book-a-scan"><PhoneCall />Check Scan Price</Link></Button>
      </div>
    </div>
  );
}

function ScanTestsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="nav-link h-auto gap-1 p-0 hover:bg-transparent hover:text-primary">
          Scan Tests <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-2">
        <DropdownMenuItem asChild>
          <Link to="/scan-tests" className="font-semibold">View all scan tests</Link>
        </DropdownMenuItem>
        {categories.map((category) => (
          <DropdownMenuItem key={category.slug} asChild>
            <Link to="/scan-tests/$modality" params={{ modality: category.slug }}>
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FooterLinks({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <div className="grid gap-2">
        {links.map(([label, to]) => <Link key={to} to={to} className="text-sm text-primary-foreground/75 hover:text-primary-foreground">{label}</Link>)}
      </div>
    </div>
  );
}