# Timed lead capture and WhatsApp contact

## What will change
- Add a discreet 20-second countdown prompt across public browsing pages; it opens a lead form when the countdown ends.
- Show the popup once per browser session, and keep it closed after dismissal or successful submission.
- Capture only full name, mobile number and scan/test, with explicit contact consent and clear medical-facilitator wording.
- Submit leads through the existing secure enquiry flow and show a success state with the enquiry reference.
- Add a persistent WhatsApp button linked to **+91 99905 19519**, with a prefilled, URL-encoded scan-assistance message.
- Keep the existing navy, white and teal design, mobile sticky price action, routes and booking form unchanged.

## Validation and behavior
- Validate name, Indian/international mobile format, scan selection and consent in the browser and again on the server.
- Exclude admin, authentication, full booking and booking-confirmation pages from the timed popup.
- Do not use the countdown to imply offer scarcity, price expiry or guaranteed response time.
- Ensure the countdown and WhatsApp button do not overlap existing mobile controls.

## Verification
- Test countdown opening, dismissal persistence, valid and invalid submissions, WhatsApp destination, keyboard accessibility, desktop/mobile layout and build health.
