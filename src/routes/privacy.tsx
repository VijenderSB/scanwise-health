import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/bookmyscan/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Patient Data | SavoScan.com" },
      { name: "description", content: "Learn how SavoScan.com uses enquiry details and uploaded records for radiology appointment assistance in India." },
      { property: "og:title", content: "Privacy & Patient Data | SavoScan.com" },
      { property: "og:description", content: "How patient enquiry details and uploaded records are handled for scan appointment assistance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://savoscan.com/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://savoscan.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalPage eyebrow="Patient privacy" title="Privacy Policy aur Patient Data" intro="This policy explains how SavoScan uses personal and health-related information to support a scan enquiry.">
    <LegalSection title="Aap Kaunsi Information Share Kar Sakte Hain"><p>Name, mobile number, optional email, city, preferred locality, prescribed scan, appointment preferences, notes and any prescription or report you choose to upload. Technical records may include the page used, security logs and essential browser-storage information.</p></LegalSection>
    <LegalSection title="Information ka Purpose aur Lawful Use"><p>Information is used to respond to your request, understand the prescribed scan, identify suitable imaging options, obtain price or availability information, coordinate an appointment and maintain service-security records. SavoScan does not use an uploaded prescription to diagnose or recommend treatment.</p></LegalSection>
    <LegalSection title="Imaging Centres ke Saath Information Sharing"><p>Relevant information may be shared with suitable independent imaging centres only when needed for protocol, price, availability or appointment assistance. Do not upload records unrelated to the enquiry.</p></LegalSection>
    <LegalSection title="Consent aur Aapki Choices"><p>Submitting the form records your consent for the stated enquiry purpose. You may choose not to upload a document. You may withdraw consent or request access, correction or deletion by contacting SavoScan through the grievance channel. Withdrawal does not affect processing already completed lawfully.</p></LegalSection>
    <LegalSection title="Information Kitne Samay Rakhi Jaati Hai"><p>Enquiry and upload records are retained only as long as reasonably needed for appointment assistance, follow-up, security, dispute handling and legal obligations. A fixed retention schedule is pending formal approval and will be published when verified.</p></LegalSection>
    <LegalSection title="Information ki Security"><p>SavoScan uses access controls and private document storage intended to limit records to authorised assistance and administration. No online service can guarantee absolute security, so share only information needed for the enquiry.</p></LegalSection>
    <LegalSection title="Children aur Authorised Caregivers"><p>A parent, guardian or authorised caregiver should submit information for a child or a patient who cannot provide valid consent. The person submitting confirms they are authorised to do so.</p></LegalSection>
    <LegalSection title="Service Providers aur External Resources"><p>Technical hosting, storage and font-delivery providers may process limited data required to operate the website. Independent imaging centres process information under their own privacy and clinical obligations.</p></LegalSection>
    <LegalSection title="Complaint aur Contact"><p>Use the Grievance Redressal page for privacy requests or complaints. The formal operator name, registered address, grievance email and officer particulars are pending publication and will be added when supplied.</p></LegalSection>
  </LegalPage>;
}