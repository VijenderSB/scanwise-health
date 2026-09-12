# Savings-first scan comparison and MRCP

## What will change
- Reposition the existing homepage with “Your Scan. Your Choice. Bigger Savings.”, the supplied supporting copy, offer-focused calls to action, and the fallback banner “Explore Special Rates on Radiology Scans.”
- Add a statistics strip that renders only verified metrics; until real totals exist, no fabricated numbers or discount percentages will appear.
- Replace the generic deal presentation with “Big Savings on Popular Scans,” covering all 12 requested protocols. Unverified prices will appear only as estimated ranges with the required review disclaimer.
- Add “Highest Discounts on BookMyScan” discovery with sorting for verified discount, rupee savings, total payable price, and nearest centre. Empty verified-offer states will explain that current offers are awaiting confirmation.
- Make the BookMyScan total and savings visually dominant when a verified offer exists, while keeping regular-price strikethrough limited to an equivalent centre, protocol, and inclusion set.
- Preserve the current navy, white, and teal identity, radiology-only content, existing centre directory, and booking workflow. Add a mobile sticky “Check Scan Price” action.

## MRCP
- Add a complete `/scan-tests/mri-scan/mrcp` page for “MRCP Scan — Magnetic Resonance Cholangiopancreatography,” including purpose, preparation, contrast guidance, duration, safety, estimated range, FAQs, centres, and booking actions.
- Add MRCP, MRCP Scan, and MRI MRCP to scan search and booking choices.
- Keep MRCP distinct from “MRI Abdomen with MRCP,” and surface MRCP under MRI, popular offers, comparison controls, and MRI-capable centre profiles without claiming unverified availability.

## Pricing and booking safeguards
- Introduce typed offer records with centre, locality, protocol, inclusions, mandatory charges, verification state, validity dates, regular price, offer price, and calculated savings.
- Automatically exclude expired offers and calculate savings and percentages from integer INR amounts rather than storing display claims.
- Sort lowest price by total payable amount, including mandatory charges, and compare only matching protocol identifiers.
- Add scan and centre selection to booking. Show “Your Savings” only for a valid verified offer; otherwise show an estimated range and confirmation-pending state.
- Carry the selected protocol and price snapshot through enquiry submission and confirmation. Confirmed savings will be shown only when supported by a verified offer; public lifetime savings will remain absent until completion and payment/refund reconciliation data exists.
- Keep the WhatsApp-labelled action honest: route it through the existing secure prescription form until a verified business WhatsApp number is supplied.

## Technical details
- Extend the existing catalogue and reusable pricing components rather than rebuilding pages.
- Add only the database fields/tables needed to preserve offer and booking snapshots, with explicit grants and row-level access rules.
- Update route metadata for changed public pages.
- Verify calculations, expiry filtering, protocol-safe sorting, MRCP search/detail navigation, booking submission, existing routes, desktop/mobile layout, browser errors, and build health.

## Data required before live savings claims
- Centre-specific regular and BookMyScan prices for the same protocol and inclusions.
- Mandatory charges, inclusions/exclusions, offer start/end times, slot limits, and verification status.
- Verified centre service availability for MRCP and combined MRI Abdomen with MRCP.
- Reconciled completed-scan and payment/refund records for lifetime savings and completed-scan totals.
- Verified active-partner status and a business WhatsApp number.
