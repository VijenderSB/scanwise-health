import { createFileRoute } from "@tanstack/react-router";
import { Disclaimer, PageIntro } from "@/components/bookmyscan/Blocks";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Patient Data | SavoScan.com" },
      { name: "description", content: "Learn how SavoScan.com uses enquiry details and uploaded records for radiology appointment assistance in India." },
      { property: "og:title", content: "Privacy & Patient Data | SavoScan.com" },
      { property: "og:description", content: "How patient enquiry details and uploaded records are handled for scan appointment assistance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <>
    <PageIntro eyebrow="Patient privacy" title="Your information is used only to support your scan enquiry." copy="We collect only the details needed to understand your request, identify suitable imaging options and coordinate an appointment." />
    <article className="section page-wrap privacy-copy">
      <section><h2>Information you may share</h2><p>Name, contact details, preferred location, prescribed scan, scheduling preferences and any prescription or report you choose to upload.</p></section>
      <section><h2>How it is used</h2><p>Your information is used to respond to your enquiry and may be shared only with suitable imaging centres involved in providing availability, price or appointment assistance.</p></section>
      <section><h2>Uploaded medical records</h2><p>Upload only records relevant to your scan enquiry. Do not upload unrelated identity, payment or financial documents.</p></section>
      <section><h2>Your choices</h2><p>You can choose not to upload a prescription and can ask the SavoScan.com coordinator to stop contacting you about an enquiry.</p></section>
      <Disclaimer />
    </article>
  </>;
}