import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, Search, ScanLine, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, cities } from "@/lib/catalog";

const scanOptions = [
  { label: "MRCP", route: "/scan-tests/mri-scan/mrcp" },
  { label: "MRCP Scan", route: "/scan-tests/mri-scan/mrcp" },
  { label: "MRI MRCP", route: "/scan-tests/mri-scan/mrcp" },
  { label: "MRI Abdomen with MRCP", route: "/book-a-scan?scan=MRI%20Abdomen%20with%20MRCP&protocol=mri-abdomen-with-mrcp&centre=" },
  ...categories.map((category) => ({ label: category.name, route: `/scan-tests/${category.slug}` })),
];

export function HomeSearch() {
  const navigate = useNavigate();
  const [scan, setScan] = useState("");
  const [location, setLocation] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = scanOptions.find((option) => option.label.toLowerCase() === scan.trim().toLowerCase());
    if (match) { window.location.assign(match.route); return; }
    if (location) { void navigate({ to: "/scan-centres/$city", params: { city: location.toLowerCase().replaceAll(" ", "-") } }); return; }
    void navigate({ to: "/scan-tests" });
  }

  return <form className="search-panel" onSubmit={submit}><label><span><ScanLine /> Search by Scan / Test</span><input list="scan-search-options" value={scan} onChange={(event) => setScan(event.target.value)} placeholder="Try MRCP or MRI MRCP" aria-label="Search by Scan or Test"/><datalist id="scan-search-options">{scanOptions.map((option) => <option value={option.label} key={option.label}/>)}</datalist></label><label><span><MapPin /> Search by Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Choose a location</option>{cities.map((city) => <option key={city}>{city}</option>)}</select></label><label><span><Stethoscope /> Search by Health Concern</span><select defaultValue=""><option value="">Choose a concern</option><option>Prostate imaging</option><option>Breast imaging</option><option>Lung imaging</option><option>Back pain</option><option>Knee pain</option></select></label><Button size="lg" type="submit"><Search /> Find scan offers</Button></form>;
}