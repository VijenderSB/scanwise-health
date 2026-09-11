# BookMyScan.in — Phase 1 + Phase 2 implementation plan

## Goal
Build a polished, mobile-first radiology discovery and appointment-assistance platform for Delhi NCR, with reusable medical-content pages, searchable demo centre listings, secure enquiries and uploads, and a protected administration area.

## User experience
- Establish the BookMyScan.in visual system in deep navy, white, cool grey, and restrained teal, with accessible typography, compact radiology iconography, professional imagery, subtle depth, and clear medical disclaimers.
- Add a shared responsive header, mobile navigation, breadcrumb system, global assistance actions, footer, and non-diagnostic disclaimer strip.
- Build the homepage around scan/location/health-concern discovery, category navigation, a four-step booking journey, popular scans, advanced cancer imaging, Lu-177 navigation, NCR coverage, guides, FAQs, and final enquiry action.
- Use responsive directories with useful filters, visible empty/loading/error states, and compact mobile filter controls.
- Keep all demo centres visibly marked as unverified demo data requiring replacement with verified partners.

## Public routes and reusable templates
- Core routes: `/`, `/scan-tests`, `/scan-centres`, `/advanced-cancer-imaging`, `/lu-177-psma-therapy`, `/scan-cost`, `/preparation-guides`, `/conditions`, `/compare-scans`, `/book-a-scan`, and `/booking-confirmation`.
- Data-driven modality routes such as `/scan-tests/mri-scan`, `/scan-tests/ct-scan`, and `/scan-tests/pet-ct-scan` with explanations, uses, scan types, preparation, duration, contrast/tracer, safety, costs, conditions, centres, FAQs, and sticky assistance actions.
- Data-driven scan routes such as `/scan-tests/mri-scan/brain-mri` with unique content, preparation details, indicative pricing, turnaround, related content, and three booking/contact actions.
- Data-driven city and centre routes for Delhi, Gurgaon, Noida, Greater Noida, Faridabad, and Ghaziabad, plus scan-and-city combinations and centre profiles.
- Supporting article routes for every requested comparison, cost guide, preparation guide, safety guide, and condition guide.
- Build every requested main navigation destination as a real page rather than an in-page anchor.

## Content and discovery data
- Seed all requested MRI, CT, spectral CT, PET-CT, PET-MRI, gamma camera/SPECT, ultrasound, X-ray, DEXA, and mammography tests with stable slugs and category relationships.
- Seed Delhi NCR locations, realistic clearly labeled demo centres, centre capabilities, equipment attributes, accessibility, timings, turnaround, insurance support, and scan availability.
- Seed unique patient-friendly content records for major modality pages, priority scan pages, cancer imaging, Lu-177 navigation, cost/preparation/condition/compare guides, FAQs, and cross-links.
- Make search and filters derive from the same content relationships so scans, cities, centres, conditions, and guides remain consistent.

## Secure data and administration
- Create Lovable Cloud tables for modalities, scan types, locations, centres, centre capabilities/availability, conditions, guides, FAQs, enquiries, uploads, and administrator roles.
- Apply public read-only access only to published catalogue content; keep leads, contact details, and uploaded documents private.
- Validate enquiries on both the form and server, require explicit contact/privacy consent, use a hidden spam trap, and create each lead as `New Enquiry`.
- Create a private prescription/report bucket with restricted file type and size, server-issued upload access, and administrator-only retrieval.
- Add email/password and Google admin sign-in, a protected `/admin` area, and server-verified role checks. Administrator role assignment remains privileged and cannot be self-granted.
- Build admin tables for enquiries, centres, scan types, and locations with search, filtering, status updates, and basic content editing.

## Booking flow
- Create an accessible enquiry form with name, mobile, email, city, locality, scan type, preferred date, document upload, notes, and consent.
- On success, persist the lead, associate any private upload, show a confirmation reference, and offer a WhatsApp coordinator action.
- Until a verified business phone and email are supplied, clearly mark contact values as pending configuration and route assistance actions through the working enquiry flow rather than inventing details.

## Medical and compliance safeguards
- Add global and contextual language that the platform supports discovery and appointment coordination, not diagnosis or treatment recommendations.
- Use “Always consult your treating doctor” on preparation, safety, comparison, and condition content where appropriate.
- State prominently that Lu-177 PSMA medical suitability, eligibility, treatment planning, and decisions are determined only by qualified treating specialists and hospitals.
- Present price ranges as indicative and dependent on protocol, contrast/tracer, equipment, reporting, and centre; avoid discount, cure, guarantee, and unsupported superiority claims.
- Keep health concerns as navigation aids only, never as a diagnosis-to-test recommendation engine.

## Technical structure
- Use shared page shells and data-driven templates rather than duplicating route markup; keep static catalogue definitions typed and synchronised with seeded database records.
- Use server functions for catalogue reads, secure lead creation, signed upload handling, and protected admin operations.
- Add route-specific titles, descriptions, Open Graph metadata, canonical paths, one H1 per page, breadcrumbs, structured FAQ-ready markup, and meaningful image alt text.
- Add loading, not-found, and error states for dynamic pages; keep filters and forms keyboard-accessible.
- Generate and bundle a cohesive set of professional radiology visuals; avoid external hotlinked imagery.

## Verification
- Check the migration and access policies, including public grants and administrator-only access.
- Verify search, directory filters, dynamic URLs, enquiry creation, private upload, confirmation, login, and admin authorization.
- Check desktop and mobile layouts in the live preview, including sticky actions, long medical names, menus, forms, and no-overlap behavior.
- Review browser console/network output, current build diagnostics, route metadata, and database security findings before completion.

## Delivery note
The platform will ship with the full requested route/content structure and realistic demo records. Real partner verification, final WhatsApp number, business email, accreditation evidence, and final negotiated prices remain operational inputs to replace before public launch.
