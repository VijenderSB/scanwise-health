import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Activity, ChevronDown, MapPin, Menu, MessageCircle, PhoneCall, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/catalog";
import { publishedTherapies } from "@/lib/therapies";
import { getPublishedTherapySlugs } from "@/lib/therapies.functions";

const nav = [
  ["Advanced Cancer Imaging", "/advanced-cancer-imaging"],
] as const;

const popularScans = [
  ["MRI Scan", "/scan-tests/mri-scan"],
  ["MRCP Scan", "/scan-tests/mri-scan/mrcp"],
  ["CT Scan", "/scan-tests/ct-scan"],
  ["PET-CT Scan", "/scan-tests/pet-ct-scan"],
  ["Ultrasound", "/scan-tests/ultrasound"],
  ["Mammography", "/scan-tests/mammography"],
] as const;

const cityLinks = [
  ["Delhi", "/scan-centres/delhi"],
  ["Gurugram (Gurgaon)", "/scan-centres/gurgaon"],
  ["Noida", "/scan-centres/noida"],
  ["Faridabad", "/scan-centres/faridabad"],
  ["Ghaziabad", "/scan-centres/ghaziabad"],
  ["Greater Noida", "/scan-centres/greater-noida"],
] as const;

const localityLinks = [
  ["Dwarka, Delhi", "/scan-centres/delhi/area/dwarka"],
  ["Rohini, Delhi", "/scan-centres/delhi/area/rohini"],
  ["Sector 39, Noida", "/scan-centres/noida/area/sector-39"],
  ["Sushant Lok, Gurugram", "/scan-centres/gurgaon/area/sushant-lok"],
  ["Indirapuram, Ghaziabad", "/scan-centres/ghaziabad/area/indirapuram"],
  ["BK Chowk, Faridabad", "/scan-centres/faridabad/area/bk-chowk"],
] as const;

const legalLinks = [
  ["Privacy Policy", "/privacy"],
  ["Terms of Use", "/terms"],
  ["Cancellation & Refund", "/refund-cancellation"],
  ["Medical Disclaimer", "/disclaimer"],
  ["Grievance Redressal", "/grievance"],
  ["Cookie Policy", "/cookie-policy"],
  ["Contact", "/contact"],
] as const;

const whatsappUrl = `https://wa.me/919990519519?text=${encodeURIComponent("Hello SavoScan.com, I need help comparing scan prices and booking a radiology scan.")}`;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scanMenuOpen, setScanMenuOpen] = useState(false);
  const [therapyMenuOpen, setTherapyMenuOpen] = useState(false);
  const [therapySlugs, setTherapySlugs] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    getPublishedTherapySlugs()
      .then((slugs) => {
        if (active) setTherapySlugs(slugs);
      })
      .catch(() => {
        if (active) setTherapySlugs([]);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="clinical-topbar">
        <div className="page-wrap clinical-topbar-inner"><span><Activity /> Radiology scan coordination across Delhi NCR</span><span>Always consult your treating doctor</span></div>
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="page-wrap flex h-18 items-center justify-between gap-5">
          <Link to="/" className="brand-lockup" aria-label="SavoScan home">
            <span className="brand-primary"><span className="brand-mark"><span>Savo</span><em>Scan</em></span><span className="brand-promise"><span>Your Scan</span><span>Your Savings</span></span></span>
            <span className="brand-services">CT · MRI · PET CT · PET MRI · Gamma Camera · Radioiodine Therapy</span>
          </Link>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            <ScanTestsDropdown />
            <TherapiesDropdown slugs={therapySlugs} />
            {nav.map(([label, to]) => (
              <Link key={to} to={to} className="nav-link" activeProps={{ className: "nav-link-active" }}>
                {label}
              </Link>
            ))}
          </nav>
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
            <Button
              variant="ghost"
              className="h-auto justify-between px-3 py-3 text-sm font-medium"
              aria-expanded={therapyMenuOpen}
              onClick={() => setTherapyMenuOpen(!therapyMenuOpen)}
            >
              Nuclear Medicine Therapies
              <ChevronDown className={`transition-transform ${therapyMenuOpen ? "rotate-180" : ""}`} />
            </Button>
            {therapyMenuOpen && (
              <div className="grid border-l border-border pl-3">
                <Link to="/nuclear-medicine-therapies" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">
                  View all therapies
                </Link>
                {publishedTherapies.filter((therapy) => therapySlugs.includes(therapy.slug)).map((therapy) => (
                  <Link
                    key={therapy.slug}
                    to="/nuclear-medicine-therapies/$therapy"
                    params={{ therapy: therapy.slug }}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {therapy.shortName}
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
      <footer className="site-footer">
        <div className="page-wrap footer-action">
          <div>
            <p className="eyebrow eyebrow-light">Radiology support across Delhi NCR</p>
            <h2>Compare the prescribed scan before you book.</h2>
            <p>Review available centres, protocol details and total payable prices with patient-focused assistance.</p>
          </div>
          <div className="footer-action-buttons">
            <Button asChild variant="hero" size="lg"><Link to="/book-a-scan"><PhoneCall />Check Scan Price</Link></Button>
            <Button asChild variant="outline" size="lg" className="footer-outline"><a href="https://wa.me/919990519519" target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>
          </div>
        </div>
        <div className="footer-divider" />
        <div className="page-wrap footer-grid">
          <div className="footer-about">
            <div className="brand-lockup">
              <div className="brand-primary"><div className="brand-mark brand-mark-inverse"><span>Savo</span><em>Scan</em></div><div className="brand-promise brand-promise-inverse"><span>Your Scan</span><span>Your Savings</span></div></div>
              <div className="brand-services brand-services-inverse">CT · MRI · PET CT · PET MRI · Gamma Camera · Radioiodine Therapy</div>
            </div>
            <p>Radiology test discovery, price comparison and appointment assistance for patients across Delhi NCR, India.</p>
            <div className="footer-service-area"><MapPin />Delhi · Gurgaon · Noida · Faridabad · Ghaziabad · Greater Noida</div>
          </div>
          <FooterLinks title="Popular scans" links={popularScans} />
          <FooterLinks title="Scan centres" links={cityLinks} />
          <FooterLinks title="Popular localities" links={localityLinks} />
          <FooterLinks title="Patient resources" links={[["All Scan Tests", "/scan-tests"], ["Compare Scans", "/compare-scans"], ["Scan Cost Guide", "/scan-cost"], ["Preparation Guides", "/preparation-guides"], ["Advanced Cancer Imaging", "/advanced-cancer-imaging"], ["Nuclear Medicine Therapies", "/nuclear-medicine-therapies"]]} />
          <div>
            <h3 className="footer-title">Patient safety</h3>
            <p className="footer-safety-copy">SavoScan.com is a booking facilitator, not a medical provider. It does not diagnose, recommend tests or make treatment decisions.</p>
            <p className="footer-emergency">For an emergency, call 112 or visit the nearest hospital.</p>
            <div className="footer-trust"><ShieldCheck />Privacy-conscious assistance</div>
          </div>
        </div>
        <div className="page-wrap footer-legal"><FooterLinks title="Legal & support" links={legalLinks} /></div>
        <div className="footer-bottom">
          <div className="page-wrap footer-bottom-inner">
            <p>© 2026 SavoScan.com. Scan comparison and appointment-assistance platform.</p>
            <p>Final prices depend on protocol and centre confirmation. Always consult your treating doctor.</p>
          </div>
        </div>
      </footer>
      <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with SavoScan on WhatsApp"><MessageCircle /><span>WhatsApp</span></a>
      <div className="mobile-price-cta">
        <Button asChild size="lg"><Link to="/book-a-scan"><PhoneCall />Check Scan Price</Link></Button>
      </div>
    </div>
  );
}

function TherapiesDropdown({ slugs }: { slugs: string[] }) {
  const therapies = publishedTherapies.filter((therapy) => slugs.includes(therapy.slug));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="nav-link h-auto gap-1 p-0 hover:bg-transparent hover:text-primary">
          Nuclear Medicine Therapies <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 p-2">
        <DropdownMenuItem asChild>
          <Link to="/nuclear-medicine-therapies" className="font-semibold">View all therapies</Link>
        </DropdownMenuItem>
        {therapies.map((therapy) => (
          <DropdownMenuItem key={therapy.slug} asChild>
            <Link to="/nuclear-medicine-therapies/$therapy" params={{ therapy: therapy.slug }}>
              {therapy.shortName}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
      <div className="footer-links">
        {links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
      </div>
    </div>
  );
}