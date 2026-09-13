# Nuclear Medicine Therapies integrated rebuild

## Goal
Replace the standalone Lu‑177 section with a complete **Nuclear Medicine Therapies** area while preserving SavoScan.com’s current clinical design, scan discovery, enquiry management, WhatsApp number, and safety standards.

## Public experience
- Replace the header’s **Lu‑177 PSMA Therapy** link with **Nuclear Medicine Therapies** on desktop and mobile.
- Add `/nuclear-medicine-therapies/` with the requested headline, Delhi NCR support copy, callback and WhatsApp actions, prominent first-four therapy cards, specialist therapy cards, assessment explanation, patient-assistance process, availability, estimate guidance, FAQs, and callback form.
- Publish all nine requested therapy pages under the supplied URLs, each with original treatment-specific content: suitability assessment, reports/scans reviewed, process, centre-led preparation, outpatient/admission considerations, side effects and precautions, follow-up, pricing factors, related scans, FAQs, and an enquiry form.
- Clearly state throughout that SavoScan.com provides patient assistance and booking support; the selected licensed healthcare centre provides treatment and its specialists make all clinical decisions.
- Add therapy-aware mobile sticky actions: **Request a Call Back** and **Share Reports on WhatsApp**.

## Content and availability management
- Add a secure therapy content model with reusable fields for publication status, featured status, aliases, page content, FAQs, related scans, clinical reviewer/date, and SEO.
- Add separate records for therapy-by-centre availability and therapy pricing, including city/locality, pricing basis, range or starting amount, inclusions, exclusions, discount, validity, verification, and publication state.
- Extend the protected staff workspace with therapy, availability, and pricing management views.
- Publish all nine informational therapy pages now, per your selection. Show confirmed centres, prices, savings, reviewer details, and dates only when populated and verified; otherwise show the personalised-estimate empty state without inventing claims.
- Keep administered activities such as 30–200 mCi inside the relevant therapy content rather than creating separate pages.

## Enquiries and WhatsApp
- Add a therapy-specific callback form capturing patient/attendant name, mobile, city, therapy, optional callback time, optional message, consent, source page, and campaign attribution.
- Save enquiries into the existing secure lead workflow with a therapy-specific source and reference, preserving current admin follow-up.
- Use the configured WhatsApp number and therapy-specific prefilled wording; the button only opens WhatsApp so the patient chooses reports to share.
- Validate callback submission, therapy/source capture, consent, spam trap, and success state.

## Routing, scans, and search visibility
- Permanently redirect `/lu-177-psma-therapy` to `/nuclear-medicine-therapies/lu-177-psma-therapy` and update every internal link.
- Cross-link clinically relevant existing scan pages, while explicitly distinguishing diagnostic imaging from therapy and noting that specialists determine scan requirements.
- Add breadcrumbs, one H1, unique metadata, canonical URLs, treatment-specific FAQ/service/breadcrumb structured data, and internal links for every therapy.
- Add all nine published pages and the landing page to the sitemap; the content model will support excluding any page later marked draft.
- Keep centre availability therapy-specific across Delhi, Gurugram, Noida, Greater Noida, Faridabad, Ghaziabad, Indirapuram, and Vaishali—never infer that every therapy is available everywhere.

## Verification
- Check desktop and mobile navigation, old-URL redirect, all ten new pages, one-H1 rule, breadcrumbs, metadata, structured data, related scan links, and sitemap entries.
- Submit a test callback and remove the test record afterward; verify therapy, source page, callback time, message, attribution, and consent capture.
- Verify WhatsApp text per therapy, mobile sticky actions, empty-price wording, per-cycle/course labels, confirmed-only savings, draft filtering, and no horizontal overflow or browser errors.

## Technical details
- Use TanStack file routes for the landing page, dynamic therapy pages, and the permanent server redirect.
- Add Lovable Cloud tables with explicit grants, row-level security, admin-only writes, and public reads restricted to published/verified records.
- Reuse the existing semantic colour tokens, Button components, enquiry administration, and responsive clinical styling.
