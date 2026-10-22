/**
 * Site content. Anything marked PLACEHOLDER must be replaced with
 * client-supplied facts before launch (numbers, quotes, case studies).
 */

export const contact = {
  email: "contact@secureknots.com",
  phoneUS: "+1-302-608-6708",
  phoneIN: "080-3165-8865",
  offices: [
    {
      city: "Wilmington",
      region: "Delaware, US",
      address: "1207 Delaware Ave #749, Wilmington, DE 19806",
      tz: "America/New_York",
    },
    {
      city: "Bengaluru",
      region: "Karnataka, IN",
      address: "Bengaluru, India",
      tz: "Asia/Kolkata",
    },
  ],
};

export type Region = "US" | "UK" | "EU" | "India" | "APAC" | "Global";

export type FrameworkGroup = {
  id: string;
  name: string;
  blurb: string;
  items: { name: string; slug: string; region: Region; full?: string }[];
};

export const frameworkGroups: FrameworkGroup[] = [
  {
    id: "assurance",
    name: "Security & Assurance",
    blurb: "Attestations your customers ask for first.",
    items: [
      { name: "SOC 2", slug: "soc-2", region: "US", full: "Service Organization Control 2" },
      { name: "SOC 1", slug: "soc-1", region: "US" },
      { name: "SOC 3", slug: "soc-3", region: "US" },
      { name: "ISO 27001", slug: "iso-27001", region: "Global", full: "Information Security Management" },
      { name: "NIST CSF", slug: "nist-csf", region: "US" },
      { name: "ITGC", slug: "itgc", region: "US", full: "IT General Controls" },
      { name: "Unified Audits", slug: "unified-audits", region: "Global" },
    ],
  },
  {
    id: "government",
    name: "Government & Defense",
    blurb: "Authorizations that unlock public-sector revenue.",
    items: [
      { name: "FedRAMP 20x", slug: "fedramp-20x", region: "US", full: "FedRAMP 20x, Classes A to D" },
      { name: "FedRAMP", slug: "fedramp", region: "US" },
      { name: "GovRAMP", slug: "stateramp", region: "US", full: "Formerly StateRAMP" },
      { name: "CMMC", slug: "cmmc", region: "US", full: "Cybersecurity Maturity Model Certification" },
      { name: "CUI", slug: "cui", region: "US", full: "Controlled Unclassified Information (NIST SP 800-171)" },
      { name: "NIST 800-53", slug: "nist-800-53", region: "US" },
      { name: "ITAR", slug: "itar", region: "US" },
      { name: "EAR", slug: "ear", region: "US" },
    ],
  },
  {
    id: "privacy",
    name: "Privacy & AI",
    blurb: "Govern data and models before regulators do.",
    items: [
      { name: "ISO 42001", slug: "iso-42001", region: "Global", full: "AI Management System" },
      { name: "ISO 27701", slug: "iso-27701", region: "Global" },
      { name: "GDPR", slug: "gdpr", region: "EU" },
      { name: "CCPA", slug: "ccpa", region: "US" },
      { name: "HIPAA", slug: "hipaa", region: "US" },
      { name: "PDPA", slug: "pdpa", region: "APAC" },
      { name: "DPDPA", slug: "dpdpa", region: "India" },
    ],
  },
  {
    id: "financial",
    name: "Financial Services",
    blurb: "Resilience for payments, banking and markets.",
    items: [
      { name: "PCI DSS", slug: "pci-dss", region: "Global" },
      { name: "PCI Risk Assessment", slug: "pci-risk-assessment", region: "Global" },
      { name: "DORA", slug: "dora", region: "EU" },
      { name: "SEBI CSCRF", slug: "sebi-cscrf", region: "India" },
    ],
  },
  {
    id: "management",
    name: "Management Systems",
    blurb: "Quality, environment, continuity, security and safety.",
    items: [
      { name: "ISO 9001", slug: "iso-9001", region: "Global" },
      { name: "ISO 14001", slug: "iso-14001", region: "Global", full: "Environmental Management" },
      { name: "ISO 20000", slug: "iso-20000", region: "Global" },
      { name: "ISO 22301", slug: "iso-22301", region: "Global" },
      { name: "ISO 28000", slug: "iso-28000", region: "Global", full: "Security Management Systems" },
      { name: "ISO 41001", slug: "iso-41001", region: "Global" },
      { name: "ISO 45001", slug: "iso-45001", region: "Global" },
      { name: "BS 9997", slug: "bs-9997", region: "UK", full: "Fire Risk Management Systems" },
    ],
  },
  {
    id: "records",
    name: "Records & Secure Handling",
    blurb: "Records that stand up, people who are vetted, data destroyed properly.",
    items: [
      { name: "ISO 15489-1", slug: "iso-15489-1", region: "Global", full: "Records Management" },
      { name: "BS 10008-1", slug: "bs-10008-1", region: "UK", full: "Evidential Weight of Electronic Information" },
      { name: "BS EN 15713", slug: "bs-en-15713", region: "UK", full: "Secure Destruction of Confidential Material" },
      { name: "BS 7858", slug: "bs-7858", region: "UK", full: "Security Screening of Individuals" },
    ],
  },
];

export const frameworkCount = frameworkGroups.reduce((n, g) => n + g.items.length, 0);

/* ───────── Regional coverage ───────── */
export const regions: { id: Region; label: string; blurb: string; pairs: string[] }[] = [
  {
    id: "US",
    label: "United States",
    blurb: "The AICPA attestations US buyers ask for first, plus federal, defense, healthcare and state privacy obligations.",
    pairs: ["iso-27001", "iso-42001", "pci-dss"],
  },
  {
    id: "UK",
    label: "United Kingdom",
    blurb: "British Standards for records, staff vetting, secure destruction and fire risk, the ones UK contracts and tenders name.",
    pairs: ["iso-27001", "iso-22301", "iso-14001", "iso-15489-1"],
  },
  {
    id: "EU",
    label: "European Union",
    blurb: "Data protection and operational resilience for companies that sell into, or operate in, the EU.",
    pairs: ["iso-27001", "iso-27701", "iso-22301"],
  },
  {
    id: "India",
    label: "India",
    blurb: "Personal data protection and securities-market cyber resilience for companies operating in India.",
    pairs: ["iso-27001", "iso-27701", "pci-dss"],
  },
  {
    id: "APAC",
    label: "Asia-Pacific",
    blurb: "Personal data protection across Singapore and the wider region.",
    pairs: ["iso-27001", "iso-27701", "soc-2"],
  },
  {
    id: "Global",
    label: "International",
    blurb: "International standards that travel with you to every market.",
    pairs: [],
  },
];

export const services = [
  {
    id: "advisory",
    title: "Compliance Advisory",
    kicker: "Strategy",
    body: "We map where you sell to what you must prove, then design one control set that satisfies every framework on your roadmap, not five parallel programs.",
    deliverables: ["Framework roadmap", "Unified control library", "Policy suite", "Board-ready reporting"],
  },
  {
    id: "readiness",
    title: "Audit Readiness",
    kicker: "Gap → Ready",
    body: "A practitioner-led gap assessment, a prioritized remediation plan, and hands-on help closing it. You walk into the audit knowing what your auditor will test.",
    deliverables: ["Gap assessment", "Remediation sprints", "Evidence collection", "Mock audit"],
  },
  {
    id: "unified",
    title: "Auditor Coordination",
    kicker: "Assess once",
    body: "Each control tested once, its evidence mapped to SOC 2, ISO 27001, PCI DSS, HIPAA and more, and your independent auditors scheduled into one fieldwork window.",
    deliverables: ["Cross-framework mapping", "Single fieldwork window", "Shared evidence pool", "Auditor coordination"],
  },
  {
    id: "testing",
    title: "Security Testing",
    kicker: "Offense",
    body: "Web, API, mobile, cloud and network penetration testing by certified testers, scoped to satisfy auditors and actually find what attackers would.",
    deliverables: ["VAPT", "Cloud configuration review", "Red team exercises", "Retest & summary letter"],
  },
  {
    id: "continuous",
    title: "Continuous Compliance",
    kicker: "Always on",
    body: "A fractional compliance team and vCISO that keeps controls operating year-round, so renewal audits are a formality instead of a fire drill.",
    deliverables: ["vCISO", "Quarterly control testing", "Vendor risk management", "Security questionnaires"],
  },
];

/** How we describe our role, everywhere: we prepare and coordinate; independent auditors issue reports. */
export const roleLine = "We handle audit readiness and auditor coordination. Your SOC reports and ISO certificates are always issued by independent, accredited auditors.";

export const process = [
  { n: "01", title: "Scope", time: "Week 1", body: "We learn your product, your buyers and your deadlines, then fix the exact frameworks, boundaries and systems in scope." },
  { n: "02", title: "Assess", time: "Weeks 2-3", body: "Control-by-control gap assessment against every target framework at once, with a single prioritized findings register." },
  { n: "03", title: "Remediate", time: "Weeks 3-10", body: "Policies written, controls implemented, evidence automated. We work inside your tools, Jira, GitHub, AWS, Google Workspace." },
  { n: "04", title: "Audit", time: "Weeks 10-14", body: "Mock audit, auditor selection and fieldwork coordination. Your independent auditor issues the report; we sit beside you until they do." },
  { n: "05", title: "Sustain", time: "Year-round", body: "Continuous monitoring, quarterly testing and a renewal calendar that never surprises you." },
];

/**
 * Figures shown under the hero. These describe the practice itself and are
 * true by construction. Add client outcome figures (audits completed, pass
 * rates) only once they are verified and cleared for publication.
 */
export const stats = [
  { value: frameworkCount, suffix: "", label: "Frameworks and standards in one practice" },
  { value: 16, suffix: "", label: "Control domains in one unified library" },
  { value: 3, suffix: "", label: "Delivery hubs, including Delaware and Bengaluru" },
  { value: 1, suffix: "", label: "Control set behind every framework you need" },
];

export const industries = [
  { name: "SaaS & Cloud", frameworks: ["SOC 2", "ISO 27001", "ISO 42001", "GDPR"], note: "Close enterprise deals without the security-review stall." },
  { name: "Fintech & Payments", frameworks: ["PCI DSS", "SOC 1", "DORA", "SEBI CSCRF"], note: "Prove resilience to banks, networks and regulators." },
  { name: "Healthcare & Life Sciences", frameworks: ["HIPAA", "ISO 27701", "SOC 2", "GDPR"], note: "Protect patient data and pass partner diligence." },
  { name: "Government & Defense", frameworks: ["FedRAMP 20x", "FedRAMP", "GovRAMP", "CMMC", "CUI", "ITAR"], note: "Win public-sector contracts with authorization in hand." },
  { name: "AI & Data Platforms", frameworks: ["ISO 42001", "ISO 27701", "GDPR", "SOC 2"], note: "Show responsible AI governance before buyers ask." },
  { name: "Enterprise & BFSI", frameworks: ["ISO 22301", "ITGC", "SOC 1", "DPDPA"], note: "Harmonize controls across entities and geographies." },
];

// PLACEHOLDER, anonymized sample testimonials; replace with approved client quotes.
export const testimonials = [
  {
    quote: "We had SOC 2, ISO 27001 and HIPAA on the same year's roadmap. SecureKnots turned it into one program and one fieldwork window. Our engineers barely noticed.",
    name: "VP Engineering",
    org: "Series B health-tech SaaS",
  },
  {
    quote: "They'd clearly sat on the auditor side of the table. Every piece of evidence we produced was accepted first time.",
    name: "Head of Security",
    org: "Payments platform, Europe & India",
  },
  {
    quote: "CMMC felt impossible for a 60-person supplier. Fourteen weeks later we had a clean assessment and a system we actually understand.",
    name: "CEO",
    org: "US defense manufacturer",
  },
];

/* ───────── Overlap map ─────────
   Illustrative mapping of control domains to frameworks, used by the
   interactive "Assess once" section. Weights ≈ number of testable controls. */
export const controlDomains = [
  { id: "gov", name: "Governance & Policy", weight: 14 },
  { id: "risk", name: "Risk Assessment", weight: 9 },
  { id: "access", name: "Access Control", weight: 18 },
  { id: "asset", name: "Asset Management", weight: 8 },
  { id: "crypto", name: "Cryptography", weight: 6 },
  { id: "ops", name: "Logging & Monitoring", weight: 12 },
  { id: "change", name: "Change Management", weight: 10 },
  { id: "sdlc", name: "Secure SDLC", weight: 9 },
  { id: "vendor", name: "Vendor Risk", weight: 7 },
  { id: "ir", name: "Incident Response", weight: 8 },
  { id: "bcdr", name: "Continuity & DR", weight: 7 },
  { id: "hr", name: "People Security", weight: 6 },
  { id: "physical", name: "Physical Security", weight: 7 },
  { id: "privacy", name: "Privacy & Data Rights", weight: 12 },
  { id: "cardholder", name: "Cardholder Data", weight: 11 },
  { id: "cui", name: "CUI Handling", weight: 10 },
] as const;

export type DomainId = (typeof controlDomains)[number]["id"];

const core: DomainId[] = ["gov", "risk", "access", "asset", "crypto", "ops", "change", "vendor", "ir", "hr"];

export const overlapFrameworks: { name: string; domains: DomainId[] }[] = [
  { name: "SOC 2", domains: [...core, "sdlc", "bcdr", "physical"] },
  { name: "ISO 27001", domains: [...core, "sdlc", "bcdr", "physical"] },
  { name: "PCI DSS", domains: [...core, "sdlc", "physical", "cardholder"] },
  { name: "HIPAA", domains: [...core, "bcdr", "physical", "privacy"] },
  { name: "GDPR", domains: ["gov", "risk", "access", "crypto", "vendor", "ir", "privacy"] },
  { name: "CMMC", domains: [...core, "physical", "cui"] },
  { name: "FedRAMP", domains: [...core, "sdlc", "bcdr", "physical", "cui"] },
  { name: "ISO 42001", domains: ["gov", "risk", "asset", "ops", "change", "sdlc", "vendor", "privacy"] },
];

/* ───────── Site navigation ───────── */
export const navLinks = [
  { label: "Frameworks", href: "/frameworks", menu: "frameworks" as const },
  { label: "Services", href: "/services", menu: "services" as const },
  { label: "Industries", href: "/industries" },
  { label: "Customers", href: "/customers" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

/* ───────── Service detail pages ───────── */
export const serviceDetails: Record<
  string,
  { tagline: string; includes: { t: string; d: string }[]; outcomes: { v: string; l: string }[]; frameworks: string[] }
> = {
  advisory: {
    tagline: "A roadmap that turns every framework you'll ever need into one program.",
    includes: [
      { t: "Framework strategy", d: "Which frameworks, in what order, tied to your pipeline and markets." },
      { t: "Unified control library", d: "One control set mapped to every target requirement." },
      { t: "Policy suite", d: "Plain-language policies your teams will actually follow." },
      { t: "Risk management", d: "Risk methodology, register and treatment plans." },
      { t: "Board reporting", d: "One executive view of posture across all obligations." },
      { t: "Regulatory watch", d: "Early warning on changes that affect you." },
    ],
    outcomes: [{ v: "1", l: "Control set for every framework" }, { v: "16", l: "Control domains, mapped once" }, { v: "2 wks", l: "To a costed roadmap" }],
    frameworks: ["soc-2", "fedramp-20x", "fedramp", "cmmc", "gdpr", "iso-27001"],
  },
  readiness: {
    tagline: "Walk into the audit already knowing what your auditor will test.",
    includes: [
      { t: "Gap assessment", d: "Control-by-control review against each target framework." },
      { t: "Remediation plan", d: "Prioritized, owned and sized to your team." },
      { t: "Hands-on remediation", d: "We write, configure and implement alongside you." },
      { t: "Evidence collection", d: "Automated where possible, organized always." },
      { t: "Mock audit", d: "A realistic dry run with auditor-grade sampling." },
      { t: "Auditor selection", d: "Shortlisting and negotiation support." },
    ],
    outcomes: [{ v: "8-16", l: "Weeks to audit-ready, typical" }, { v: "1", l: "Mock audit before fieldwork" }, { v: "0", l: "Reports issued by us; your auditor stays independent" }],
    frameworks: ["soc-2", "fedramp-20x", "fedramp", "cmmc", "cui", "gdpr"],
  },
  unified: {
    tagline: "Test each control once. Map the evidence everywhere. Coordinate every auditor.",
    includes: [
      { t: "Cross-framework mapping", d: "Every control traced to every applicable requirement." },
      { t: "Single fieldwork window", d: "Your CPA firm and certification bodies scheduled together." },
      { t: "Common evidence pool", d: "One request list, reused across assessors." },
      { t: "Consolidated findings", d: "One remediation register across frameworks." },
      { t: "Aligned renewals", d: "One compliance calendar instead of four." },
      { t: "Executive reporting", d: "One readiness view for the board." },
    ],
    outcomes: [{ v: "3-5", l: "Frameworks per program" }, { v: "1", l: "Fieldwork window" }, { v: "1", l: "Evidence request list" }],
    frameworks: ["unified-audits", "soc-2", "fedramp-20x", "fedramp", "cmmc", "iso-27001"],
  },
  testing: {
    tagline: "Find what attackers would, and satisfy auditors in the same engagement.",
    includes: [
      { t: "Web & API testing", d: "OWASP-aligned manual and automated testing." },
      { t: "Cloud configuration review", d: "AWS, Azure and GCP posture assessment." },
      { t: "Network & segmentation", d: "Internal, external and PCI segmentation tests." },
      { t: "Mobile testing", d: "iOS and Android application security." },
      { t: "Red team", d: "Objective-based adversary simulation." },
      { t: "Retest & summary letter", d: "Verification of fixes and a letter for your buyers." },
    ],
    // CONFIRM with SecureKnots: these are service commitments, not historical stats.
    outcomes: [{ v: "100%", l: "Manual validation of findings" }, { v: "48h", l: "Critical findings reported" }, { v: "Free", l: "Retest included" }],
    frameworks: ["soc-2", "fedramp", "pci-dss", "iso-27001", "dora"],
  },
  continuous: {
    tagline: "Stay audit-ready all year, so renewals are a formality.",
    includes: [
      { t: "Fractional vCISO", d: "Senior security leadership, part-time." },
      { t: "Quarterly control testing", d: "Internal audits that catch drift early." },
      { t: "Vendor risk management", d: "Third-party reviews and register upkeep." },
      { t: "Security questionnaires", d: "We answer them, fast and consistently." },
      { t: "Policy & training", d: "Annual reviews and awareness programs." },
      { t: "Renewal management", d: "Auditor scheduling and evidence refresh." },
    ],
    outcomes: [{ v: "365", l: "Days audit-ready" }, { v: "48h", l: "Questionnaire turnaround" }, { v: "1", l: "Named security lead" }],
    frameworks: ["soc-2", "fedramp-20x", "fedramp", "cmmc", "gdpr", "iso-27001"],
  },
};

/* ───────── About ───────── */
export const values = [
  { t: "Practitioners, not paper-pushers", d: "Our consultants have run security programs and sat on the auditor side of the table." },
  { t: "One program, many frameworks", d: "We design for the frameworks you'll need next year, not just this quarter." },
  { t: "Plain language", d: "If your engineers can't read the policy, it isn't a control." },
  { t: "Outcomes over hours", d: "We measure success in clean audits and closed deals." },
];

// PLACEHOLDER, replace with the real leadership team and credentials.
export const team = [
  { name: "Founder & CEO", role: "Leadership", focus: "Compliance strategy" },
  { name: "Head of Advisory", role: "Leadership", focus: "ISO & SOC programs" },
  { name: "Head of Government", role: "Leadership", focus: "FedRAMP & CMMC" },
  { name: "Head of Offensive Security", role: "Leadership", focus: "Penetration testing" },
  { name: "Head of Privacy", role: "Leadership", focus: "GDPR, DPDPA & AI" },
  { name: "Head of Delivery, India", role: "Leadership", focus: "SEBI & financial services" },
];

// PLACEHOLDER, confirm actual team certifications.
export const credentials = ["CISSP", "CISA", "CISM", "ISO 27001 Lead Auditor", "ISO 42001 Lead Auditor", "CMMC RP", "OSCP", "CIPP/E", "CRISC", "CCSP"];

// PLACEHOLDER, replace with real openings.
export const roles = [
  { title: "Senior GRC Consultant", team: "Advisory", location: "Remote, US", type: "Full-time" },
  { title: "ISO Lead Implementer", team: "Advisory", location: "Bengaluru, IN", type: "Full-time" },
  { title: "CMMC Assessment Specialist", team: "Government", location: "Remote, US", type: "Full-time" },
  { title: "Penetration Tester", team: "Offensive Security", location: "Bengaluru, IN / Remote", type: "Full-time" },
  { title: "Privacy Counsel", team: "Privacy", location: "Remote, EU / IN", type: "Contract" },
];
