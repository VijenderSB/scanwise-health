# NCR micro-location and legal-pages plan

## Goal
Add useful, search-friendly locality pages for Delhi, Noida, Gurugram, Ghaziabad and Faridabad, and complete the public legal-information section for SavoScan’s current enquiry-only model.

## Micro-location pages
- Create a reusable `/scan-centres/{city}/area/{locality}` page template so locality URLs do not conflict with existing centre profiles.
- Launch priority pages for high-demand localities supported by the current directory, including:
  - Delhi: Dwarka, Rohini, Paschim Vihar, Green Park, Hauz Khas, Karol Bagh, Defence Colony and Greater Kailash.
  - Noida: Sector 39, plus a broader Noida page for directory entries without a verified sector.
  - Gurugram: Sector 14, Sector 15, Sector 55, Sushant Lok, Sohna Road and Golf Course Road.
  - Ghaziabad: Indirapuram, Vasundhara and Sanjay Nagar.
  - Faridabad: Sector 16, BK Chowk and Railway Road.
- Keep `gurgaon` as the existing URL slug to preserve links, while displaying “Gurugram (Gurgaon)” in patient-facing copy.
- Give every page unique titles, descriptions, canonical URLs, breadcrumbs and structured data.
- Show only centres whose supplied locality data matches the page. Clearly state that centre details, scan availability and prices require confirmation.
- For priority areas with no verified matching centre, show a useful nearby-area enquiry state rather than inventing a listing or availability claim; keep unsupported/thin pages out of search indexing.
- Add locality navigation to each city page and curated popular-area links in the footer.
- Update the sitemap with indexable locality pages and keep the locality catalogue and URLs driven from one shared source.

## Legal pages
- Expand `/privacy` into a fuller India-focused privacy notice covering enquiry data, prescriptions, centre sharing, consent withdrawal, access/correction/deletion requests, retention principles, security, minors and complaint handling.
- Add:
  - `/terms` — platform role, acceptable use, listings/pricing limitations, booking assistance, user responsibilities, intellectual property, liability and governing-law framework.
  - `/refund-cancellation` — clearly state that SavoScan currently takes no online payment and patients pay centres directly; centre-specific cancellation/refund terms apply.
  - `/disclaimer` — medical, pricing, directory-verification and third-party-centre disclaimers.
  - `/grievance` — complaint process and interim contact method through the verified WhatsApp number until formal officer/email/address details are supplied.
  - `/contact` — scan-assistance contact and legal-contact status without inventing an address or email.
  - `/cookie-policy` — disclose essential session/local-storage use and external font requests; state that no advertising-cookie consent claim is made unless tracking is later added.
- Link all legal pages from a reorganised footer and link Privacy and Terms beside the booking consent.
- Add unique route metadata and sitemap entries for each public legal page.

## Business-detail safeguards
- Use “SavoScan” as the service/operator label, not as a claim about a registered legal entity.
- Do not invent a legal entity name, registered address, GSTIN/CIN, support email or Grievance Officer identity.
- Mark formal operator and grievance particulars as pending publication and make the verified WhatsApp number the current contact channel.
- Do not add legal entity fields to organisation structured data until verified details are supplied.

## Verification
- Confirm every locality URL resolves to the correct city/locality subset and unknown combinations return not found.
- Check locality links, breadcrumbs, metadata, canonical URLs, sitemap entries and no duplicate Gurgaon/Gurugram indexing.
- Verify every legal route, footer link and booking-consent link.
- Check desktop and mobile layouts, no overlap or horizontal scrolling, browser errors and final build health.

## Operational follow-up
Formal legal entity name, registered address, support/grievance email, Grievance Officer details and data-retention period remain required before the legal pages can be treated as final legal notices.
