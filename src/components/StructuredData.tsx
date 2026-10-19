import type { WeddingContent } from "@/lib/content/wedding";
import type { RccContent } from "@/lib/content/rcc";
import { SITE_INFO } from "@/lib/sites";

/** Tells Google who the business is (name, contact, area served), for local results and the knowledge panel. */
export function WeddingStructuredData({ c }: { c: WeddingContent }) {
  const url = SITE_INFO.wedding.url;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${url}/#business`,
        name: SITE_INFO.wedding.name,
        description: c["seo.description"],
        url,
        image: `${url}/img/wedding/share.jpg`,
        logo: `${url}/img/wedding/logo.png`,
        telephone: c["contact.phone"],
        email: c["contact.email"],
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        areaServed: [
          { "@type": "City", name: "London" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        founder: { "@type": "Person", name: "Minnie", jobTitle: "Wedding celebrant" },
        knowsAbout: ["Wedding ceremonies", "Vow renewals", "Elopements", "LGBTQ+ weddings", "Commitment ceremonies"],
      }}
    />
  );
}

export function RccStructuredData({ c }: { c: RccContent }) {
  const url = SITE_INFO.rcc.url;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `${url}/#organization`,
        name: SITE_INFO.rcc.name,
        description: c["seo.description"],
        url,
        image: `${url}/img/rcc/share.jpg`,
        logo: `${url}/img/rcc/RCC-logo.png`,
        email: c["contact.email"],
        areaServed: { "@type": "Country", name: "United Kingdom" },
        audience: { "@type": "EducationalAudience", educationalRole: "school", audienceType: "KS2 and KS3 pupils" },
        knowsAbout: ["Resilience", "Confidence", "Critical thinking", "PSHE workshops"],
      }}
    />
  );
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
