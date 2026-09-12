import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, IndianRupee, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { finalPriceDisclaimer, getCurrentVerifiedOffers, popularScanEstimates, verifiedPlatformStats, type ScanOffer } from "@/lib/catalog";

type SortMode = "discount" | "savings" | "price" | "nearest";

function totalPrice(offer: ScanOffer) {
  return offer.offerPriceInr + offer.mandatoryChargesInr;
}

function saving(offer: ScanOffer) {
  return offer.regularPriceInr - totalPrice(offer);
}

function discount(offer: ScanOffer) {
  return Math.round((saving(offer) / offer.regularPriceInr) * 100);
}

export function PopularScanOffers() {
  return <div className="popular-offer-grid">{popularScanEstimates.map((scan) => {const hasEstimate="estimatedMinInr" in scan&&"estimatedMaxInr" in scan;return <article className="popular-offer-card" key={scan.protocolCode}><div><span className="estimate-label">{hasEstimate?"Indicative estimate":"Special rate review"}</span><h3>{scan.name}</h3>{"expandedName" in scan && scan.expandedName && <p className="scan-expanded-name">{scan.expandedName}</p>}</div><div className="estimated-price">{hasEstimate?`₹${scan.estimatedMinInr.toLocaleString("en-IN")}–₹${scan.estimatedMaxInr.toLocaleString("en-IN")}`:"Price confirmed after review"}</div><p className="offer-location"><MapPin /> Delhi NCR · centre confirmed after review</p><p className="offer-inclusions">{scan.inclusions}</p><p className="price-disclaimer">Final price confirmed after centre and protocol review. {finalPriceDisclaimer}</p><Button asChild className="mt-auto w-full"><Link to="/book-a-scan" search={{scan:scan.name,protocol:scan.protocolCode,centre:""}}>Check Availability <ArrowRight /></Link></Button></article>})}</div>;
}

export function SavingsStatistics() {
  if (!verifiedPlatformStats) return null;
  const stats=[{value:`₹${verifiedPlatformStats.totalSavingsInr.toLocaleString("en-IN")}`,label:"Saved by patients through BookMyScan"},{value:`${verifiedPlatformStats.completedScans.toLocaleString("en-IN")}+`,label:"Scans completed"},{value:`${verifiedPlatformStats.activeCentres.toLocaleString("en-IN")}+`,label:"Active partner imaging centres"},{value:`Up to ${verifiedPlatformStats.maxDiscountPercent}%`,label:"Off selected scans"}];
  return <section className="savings-stat-band" aria-label="Verified BookMyScan savings statistics"><div className="page-wrap savings-stats">{stats.map(stat=><div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section>;
}

export function HighestDiscounts() {
  const [sort, setSort] = useState<SortMode>("discount");
  const offers = useMemo(() => {
    const list = [...getCurrentVerifiedOffers()];
    if (sort === "discount") return list.sort((a,b) => discount(b) - discount(a));
    if (sort === "savings") return list.sort((a,b) => saving(b) - saving(a));
    if (sort === "price") return list.sort((a,b) => totalPrice(a) - totalPrice(b));
    return list.sort((a,b) => (a.distanceKm ?? Number.POSITIVE_INFINITY) - (b.distanceKm ?? Number.POSITIVE_INFINITY));
  }, [sort]);

  return <div><div className="offer-toolbar"><label>Sort current offers<select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="discount">Highest Discount %</option><option value="savings">Biggest Rupee Savings</option><option value="price">Lowest Total Price</option><option value="nearest">Nearest Centre</option></select></label><p>Only equivalent protocols and mandatory-charge-inclusive totals are compared.</p></div>{offers.length === 0 ? <div className="offer-empty"><BadgeCheck /><div><h3>Verified offers are being confirmed</h3><p>Centre-specific discounts will appear here only after the protocol, inclusions, total payable amount and validity are verified.</p></div></div> : <div className="deal-grid">{offers.map((offer) => <article className="deal-card" key={offer.id}><span className="savings-badge">Save ₹{saving(offer).toLocaleString("en-IN")} · {discount(offer)}% OFF</span><h3>{offer.scanName}</h3><p className="deal-location"><MapPin /> {offer.centreName}, {offer.locality}</p><div className="deal-price"><div><span>Centre regular price</span><s>₹{offer.regularPriceInr.toLocaleString("en-IN")}</s></div><div><span>BookMyScan total</span><strong>₹{totalPrice(offer).toLocaleString("en-IN")}</strong></div></div>{offer.limitedSlots && <p className="limited-slots">Limited slots at this price</p>}<p className="price-disclaimer">{offer.inclusions.join(" · ")} · {finalPriceDisclaimer}</p><Button asChild className="mt-5 w-full"><Link to="/book-a-scan" search={{scan:offer.scanName,protocol:offer.protocolCode,centre:offer.centreName,offer:offer.id}}>Check Availability</Link></Button></article>)}</div>}</div>;
}