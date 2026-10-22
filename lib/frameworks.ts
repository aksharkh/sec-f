import { frameworkGroups } from "./content";

export type Framework = {
  slug: string;
  name: string;
  full: string;
  group: string;
  groupId: string;
  issuer: string;
  summary: string;
  who: string[];
  requirements: { t: string; d: string }[];
  timeline: string;
  validity: string;
  assessment: string;
  related: string[];
  faq: { q: string; a: string }[];
  /** Only on the core frameworks: deeper content for the homepage and their own pages. */
  core?: CoreDetail;
};

export type CoreDetail = {
  /** The market the framework opens. */
  market: string;
  proves: string;
  buyer: string;
  phases: { t: string; time: string; d: string }[];
  deliverables: string[];
};

type Detail = Omit<Framework, "slug" | "name" | "group" | "groupId" | "faq"> & { faq?: { q: string; a: string }[] };

const details: Record<string, Detail> = {
  "soc-2": {
    full: "System and Organization Controls 2",
    issuer: "AICPA",
    summary: "An independent CPA attestation that your controls meet the Trust Services Criteria for security, availability, processing integrity, confidentiality and privacy. The report most B2B buyers ask for first.",
    who: ["SaaS and cloud companies selling to enterprise", "Managed service and data-processing providers", "Any vendor facing security questionnaires in procurement"],
    requirements: [
      { t: "Trust Services Criteria", d: "Security is mandatory; availability, confidentiality, processing integrity and privacy are chosen by scope." },
      { t: "System description", d: "A description of your service, its boundaries and the criteria in scope, which the auditor reports against." },
      { t: "Control design (Type I)", d: "Auditor confirms controls are suitably designed at a point in time." },
      { t: "Operating effectiveness (Type II)", d: "Controls are tested over an observation window, typically 3 to 12 months." },
      { t: "Vendors & subservice organizations", d: "How the cloud providers and vendors you rely on are covered, carved out or included, and monitored." },
      { t: "Evidence & sampling", d: "Population-based sampling of access reviews, change tickets, onboarding, incidents and more." },
    ],
    timeline: "8-16 weeks to Type I",
    validity: "Renewed annually",
    assessment: "Licensed CPA firm",
    related: ["iso-27001", "soc-3", "hipaa", "iso-42001"],
    core: {
      market: "Commercial trust",
      proves: "That your controls meet the AICPA Trust Services Criteria, tested by an independent CPA firm.",
      buyer: "Enterprise customers, in security reviews and procurement.",
      phases: [
        { t: "Scope", time: "Weeks 1-2", d: "Choose the Trust Services Criteria your buyers expect, draw the system boundary, and decide between Type I and Type II." },
        { t: "Gap assessment", time: "Weeks 2-4", d: "Test your current controls against the criteria and turn the gaps into a prioritized plan." },
        { t: "Remediate & collect evidence", time: "Weeks 4-12", d: "Policies written, missing controls implemented, and evidence collection set up in the tools you already use." },
        { t: "Readiness review & audit", time: "Weeks 12-16", d: "A mock audit, help choosing a CPA firm, and coordination through Type I fieldwork and the Type II window." },
      ],
      deliverables: ["Scoping memo", "Control matrix mapped to the criteria", "Policy set", "System description draft", "Evidence calendar", "Mock audit", "CPA firm shortlist"],
    },
    faq: [
      { q: "Type I or Type II, which do we need?", a: "Most enterprise buyers ultimately want Type II. A Type I is a useful first milestone that unblocks deals while your observation window runs." },
      { q: "Who issues the SOC 2 report?", a: "An independent, licensed CPA firm. We prepare you and coordinate the audit; we never issue the report ourselves, which keeps the attestation independent." },
      { q: "How long is the Type II observation window?", a: "Anywhere from 3 to 12 months. First reports often use a shorter window so you have a report sooner, then move to 12 months at renewal." },
    ],
  },
  "soc-1": {
    full: "System and Organization Controls 1 (SSAE 18)",
    issuer: "AICPA",
    summary: "An attestation over controls at a service organization that are relevant to your customers' internal control over financial reporting.",
    who: ["Payroll, billing and payments processors", "Fund administrators and fintech platforms", "Vendors whose systems touch customers' financial statements"],
    requirements: [
      { t: "Control objectives", d: "Defined by you and the auditor around financial-reporting risk." },
      { t: "ITGCs", d: "Access, change management and operations controls supporting the in-scope applications." },
      { t: "Complementary user entity controls", d: "Clear articulation of what your customers must do on their side." },
      { t: "Type I / Type II", d: "Design at a point in time, or operating effectiveness over a period." },
    ],
    timeline: "10-16 weeks",
    validity: "Renewed annually",
    assessment: "Licensed CPA firm",
    related: ["itgc", "soc-2", "pci-dss"],
  },
  "soc-3": {
    full: "System and Organization Controls 3",
    issuer: "AICPA",
    summary: "A general-use version of your SOC 2 report that can be published on your website, a public trust signal without sharing detailed test results.",
    who: ["Companies with a SOC 2 Type II wanting a public trust badge", "Consumer-facing platforms", "Teams tired of NDAs before sharing SOC 2"],
    requirements: [
      { t: "SOC 2 foundation", d: "Issued alongside or after a SOC 2 examination using the same criteria." },
      { t: "Unqualified opinion", d: "Designed for organizations that achieve a clean SOC 2 result." },
      { t: "Public description", d: "A concise system description suitable for general distribution." },
      { t: "Annual refresh", d: "Kept current with the underlying SOC 2 cycle." },
    ],
    timeline: "Alongside SOC 2",
    validity: "Renewed annually",
    assessment: "Licensed CPA firm",
    related: ["soc-2", "iso-27001"],
  },
  "iso-27001": {
    full: "ISO/IEC 27001:2022 Information Security Management",
    issuer: "ISO / IEC",
    summary: "The international standard for an information security management system (ISMS). Certification proves your security program is systematic, risk-based and continuously improving.",
    who: ["Companies selling into Europe, the Middle East and Asia", "Enterprises needing a globally recognized certificate", "Teams that want a management system, not just a report"],
    requirements: [
      { t: "ISMS clauses 4-10", d: "Context, leadership, planning, support, operation, evaluation and improvement." },
      { t: "Risk assessment & treatment", d: "A documented methodology, risk register and treatment plan." },
      { t: "Annex A controls", d: "93 controls across organizational, people, physical and technological themes, justified in a Statement of Applicability." },
      { t: "Internal audit & management review", d: "Evidence the system checks and improves itself." },
    ],
    timeline: "12-20 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["soc-2", "iso-27701", "iso-42001", "iso-22301"],
    faq: [{ q: "Is ISO 27001 harder than SOC 2?", a: "It's different. ISO 27001 demands a management system, risk methodology, internal audit, management review, while SOC 2 focuses on control operation. With a unified control set, most of the work serves both." }],
  },
  "nist-csf": {
    full: "NIST Cybersecurity Framework 2.0",
    issuer: "NIST",
    summary: "A voluntary, outcome-based framework organized around six functions, Govern, Identify, Protect, Detect, Respond and Recover, used to measure and mature a cybersecurity program.",
    who: ["Critical infrastructure and regulated industries", "Boards wanting a maturity baseline", "Organizations aligning to US federal expectations"],
    requirements: [
      { t: "Current profile", d: "Where you are today across the framework's categories and subcategories." },
      { t: "Target profile", d: "Where you need to be, based on risk and business objectives." },
      { t: "Implementation tiers", d: "Rigour of risk management practices, from Partial to Adaptive." },
      { t: "Roadmap", d: "Prioritized actions to close the gap between profiles." },
    ],
    timeline: "4-8 weeks assessment",
    validity: "Re-assess annually",
    assessment: "Self or third-party assessment",
    related: ["nist-800-53", "iso-27001", "cmmc"],
  },
  itgc: {
    full: "IT General Controls",
    issuer: "PCAOB / external auditors",
    summary: "The foundational technology controls, access, change, operations and development, that financial auditors rely on for SOX and statutory audits.",
    who: ["Pre-IPO and public companies preparing for SOX", "Finance teams facing audit findings", "Organizations with ERP or billing systems in audit scope"],
    requirements: [
      { t: "Logical access", d: "Provisioning, de-provisioning, privileged access and periodic reviews." },
      { t: "Change management", d: "Authorized, tested and approved changes with segregation of duties." },
      { t: "IT operations", d: "Job scheduling, backups, incident and problem management." },
      { t: "Program development", d: "Controls over new system implementations and data migration." },
    ],
    timeline: "6-10 weeks",
    validity: "Tested annually",
    assessment: "Internal audit / external auditor",
    related: ["soc-1", "soc-2"],
  },
  "unified-audits": {
    full: "Unified Multi-Framework Audit",
    issuer: "SecureKnots methodology",
    summary: "One scoping exercise, one control set, one fieldwork window, with evidence mapped to every framework you need. We prepare you and coordinate the auditors; each accredited auditor issues its own report or certificate.",
    who: ["Companies needing two or more frameworks this year", "Teams exhausted by duplicate evidence requests", "Organizations consolidating audit vendors"],
    requirements: [
      { t: "Unified control library", d: "A single set of controls mapped to each target framework's requirements." },
      { t: "Common evidence", d: "Collect once, reuse everywhere, with framework-specific supplements only where needed." },
      { t: "Coordinated fieldwork", d: "Auditors and certification bodies scheduled together." },
      { t: "Consolidated reporting", d: "One remediation register and one executive view across frameworks." },
    ],
    timeline: "Varies by scope",
    validity: "Aligned renewal calendar",
    assessment: "Coordinated auditors",
    related: ["soc-2", "iso-27001", "pci-dss", "hipaa"],
  },
  "fedramp-20x": {
    full: "FedRAMP 20x, Classes A to D",
    issuer: "GSA / FedRAMP",
    summary: "FedRAMP's certification path under its Consolidated Rules for 2026. Long narrative control write-ups give way to Key Security Indicators (KSIs) backed by automated evidence, recorded in a Security Decision Record (SDR) in both human-readable and JSON form.",
    who: [
      "Cloud providers pursuing FedRAMP certification under the 2026 rules",
      "SaaS companies with a recent SOC 2 Type II, FedRAMP Rev5 or GovRAMP certification (the Class A route)",
      "Teams that would rather prove security with automation than with narrative documents",
    ],
    requirements: [
      { t: "Class A", d: "Builds on a certification from an approved framework in the past 12 months: FedRAMP Rev5 (including FedRAMP Ready), SOC 2 Type II or GovRAMP. A fresh independent assessment is optional." },
      { t: "Class B", d: "A fresh independent assessment, and at least one automated method for each Key Security Indicator." },
      { t: "Class C", d: "A fresh independent assessment, and at least two automated methods for each Key Security Indicator." },
      { t: "Class D", d: "A fresh independent assessment, and at least four automated methods for each Key Security Indicator. Class D is currently being piloted." },
      { t: "Key Security Indicators (KSIs)", d: "Measurable statements of security capability across ten themes, from identity and access management to supply chain risk, each with its own measures, automation and history." },
      { t: "Security Decision Record (SDR)", d: "For every applicable rule and KSI: how it is met, and how that was verified and validated, independently too. Supplied in human-readable form and as JSON that validates against FedRAMP's schema." },
    ],
    timeline: "Varies by class",
    validity: "Ongoing, with persistent validation",
    assessment: "Independent assessor",
    related: ["fedramp", "stateramp", "soc-2", "nist-800-53"],
    core: {
      market: "US federal cloud",
      proves: "That a cloud service meets FedRAMP's security outcomes, shown through Key Security Indicators and automated, machine-readable evidence.",
      buyer: "Federal agencies choosing cloud services from the FedRAMP Marketplace.",
      phases: [
        { t: "Choose your class", time: "Weeks 1-2", d: "Match Class A, B, C or D to the certifications you already hold, your customers, and how much of your security you can show automatically." },
        { t: "Map to the KSIs", time: "Weeks 2-6", d: "Map your controls and tooling to each Key Security Indicator, then close the gaps in measures and automated validation." },
        { t: "Build the SDR package", time: "Weeks 6-12", d: "Write the Security Decision Record as a Word document and generate the matching JSON, validated against FedRAMP's schema." },
        { t: "Assessment & upkeep", time: "Ongoing", d: "Coordinate with your independent assessor, answer their comments in the SDR, and keep the KSI evidence current." },
      ],
      deliverables: ["Class recommendation (A to D)", "KSI mapping", "Automated validation plan", "Security Decision Record (Word)", "SDR in JSON, schema-validated", "Assessor coordination"],
    },
    faq: [
      { q: "What is FedRAMP 20x?", a: "FedRAMP's path to certification under its Consolidated Rules for 2026. Instead of long narrative control descriptions, you show security through Key Security Indicators, backed by automated evidence and a Security Decision Record." },
      { q: "Which class do we need?", a: "It depends on what you already hold and what you can automate. Class A builds on a recent FedRAMP Rev5, SOC 2 Type II or GovRAMP certification. Classes B, C and D need a fresh independent assessment and progressively more automated validation for each KSI. We recommend a class in the first two weeks." },
      { q: "What is the SDR, and why Word and JSON?", a: "The Security Decision Record documents how you meet each applicable rule and KSI, and how that was verified and validated. FedRAMP requires it in human-readable form and as JSON that validates against its schema, so we deliver both: a Word document for people and JSON for systems." },
      { q: "When do the 2026 rules apply?", a: "The Consolidated Rules for 2026 launched on June 24, 2026. Providers can obtain initial certification under them from July 4, 2026, and must maintain ongoing certification under them from January 1, 2027." },
      { q: "Who certifies us?", a: "FedRAMP, based on an independent assessment. We are your readiness partner: we prepare your KSIs and SDR package and coordinate with the assessor. We never perform the assessment ourselves." },
    ],
  },
  fedramp: {
    full: "Federal Risk and Authorization Management Program",
    issuer: "GSA / FedRAMP PMO",
    summary: "The US government's standardized approach to security assessment and authorization for cloud services, based on NIST SP 800-53 baselines.",
    who: ["Cloud service providers selling to US federal agencies", "SaaS companies pursuing public-sector revenue", "Vendors to agencies with an authorizing sponsor"],
    requirements: [
      { t: "Impact baseline", d: "Low, Moderate or High control baselines drawn from NIST SP 800-53 Rev. 5." },
      { t: "Authorization boundary", d: "Every component, data flow and external service that touches federal data, drawn and inventoried." },
      { t: "System Security Plan", d: "A detailed SSP with implementation statements for each applicable control." },
      { t: "FIPS-validated cryptography", d: "Federal data encrypted in transit and at rest with FIPS 140 validated modules." },
      { t: "3PAO assessment", d: "Independent testing by an accredited Third Party Assessment Organization." },
      { t: "Continuous monitoring", d: "Monthly vulnerability scanning, POA&M updates and an annual assessment." },
    ],
    timeline: "6-18 months",
    validity: "Continuous monitoring",
    assessment: "Accredited 3PAO",
    related: ["fedramp-20x", "nist-800-53", "stateramp", "cmmc"],
    core: {
      market: "US federal cloud",
      proves: "That a cloud service meets the NIST SP 800-53 baseline the US government requires before agencies can use it.",
      buyer: "Federal agencies, and the contractors who buy cloud services for them.",
      phases: [
        { t: "Impact level & route", time: "Months 1-2", d: "Confirm the impact level, the authorization route that fits your sales plan, and the boundary." },
        { t: "SSP & remediation", time: "Months 2-8", d: "Boundary diagrams, inventory and control statements, while closing gaps such as FIPS encryption, MFA and logging." },
        { t: "3PAO assessment", time: "Months 8-12", d: "Coordination with an accredited 3PAO through testing, then POA&Ms worked down for the authorization decision." },
        { t: "Continuous monitoring", time: "Ongoing", d: "Monthly scans, POA&M updates and the annual assessment, run so the authorization stays current." },
      ],
      deliverables: ["Impact level & route assessment", "Boundary & data-flow diagrams", "System Security Plan", "Policies & procedures", "POA&M", "Continuous monitoring plan"],
    },
    faq: [
      { q: "Do we need an agency sponsor?", a: "The traditional Rev5 path runs through an agency authorization. FedRAMP 20x is the other path, based on Key Security Indicators, so during scoping we'll map both routes to your go-to-market plan." },
      { q: "Low, Moderate or High?", a: "The impact level reflects the harm if the data were compromised. Most cloud services sold to agencies are categorized Moderate, which brings several hundred controls; High is for the most sensitive systems." },
      { q: "Who grants the authorization?", a: "A federal authorizing official, after reviewing your package and the 3PAO's independent assessment. We prepare you and coordinate the work; the assessment and the decision stay independent." },
    ],
  },
  stateramp: {
    full: "GovRAMP (formerly StateRAMP)",
    issuer: "GovRAMP",
    summary: "A security verification program for cloud providers serving US state and local governments, built on NIST SP 800-53 and aligned with FedRAMP.",
    who: ["Cloud providers selling to states, counties and cities", "EdTech and GovTech vendors", "FedRAMP-bound companies starting at state level"],
    requirements: [
      { t: "Impact level", d: "Low, Low+ or Moderate security categorization." },
      { t: "Security package", d: "SSP, policies and supporting documentation." },
      { t: "3PAO audit", d: "Independent assessment for verified status." },
      { t: "Continuous monitoring", d: "Monthly reporting to maintain status." },
    ],
    timeline: "4-9 months",
    validity: "Continuous monitoring",
    assessment: "Accredited 3PAO",
    related: ["fedramp", "fedramp-20x", "nist-800-53"],
  },
  cmmc: {
    full: "Cybersecurity Maturity Model Certification",
    issuer: "US Department of Defense",
    summary: "The DoD's program verifying that defense contractors protect Federal Contract Information and Controlled Unclassified Information, now being phased into contracts.",
    who: ["Defense Industrial Base primes and subcontractors", "Manufacturers and engineering firms handling CUI", "IT and cloud providers to defense suppliers"],
    requirements: [
      { t: "Level 1, Foundational", d: "Basic safeguarding of FCI with an annual self-assessment." },
      { t: "Level 2, Advanced", d: "The 110 requirements of NIST SP 800-171, assessed by the company itself or by a C3PAO, depending on the contract." },
      { t: "Level 3, Expert", d: "Selected NIST SP 800-172 requirements, assessed by the government." },
      { t: "CUI scoping", d: "Which people, systems and facilities touch CUI, often with an enclave to shrink the boundary." },
      { t: "SSP & POA&M", d: "Documented implementation, and limited, time-bound plans of action for what is still open." },
      { t: "SPRS score", d: "Level 2 results are scored against the 110 requirements and recorded in the government's SPRS system." },
    ],
    timeline: "4-12 months to Level 2",
    validity: "3 years, annual affirmation",
    assessment: "Self / C3PAO / DIBCAC",
    related: ["cui", "nist-800-53", "itar", "ear"],
    core: {
      market: "US defense supply chain",
      proves: "That a defense contractor protects contract and controlled unclassified information to the level its contracts require.",
      buyer: "The Department of Defense, and the prime contractors who flow requirements down to suppliers.",
      phases: [
        { t: "Scope CUI", time: "Weeks 1-3", d: "Map where FCI and CUI flow, confirm the level you need, and decide whether an enclave shrinks the boundary." },
        { t: "Gap assessment", time: "Weeks 3-6", d: "Score against the 110 NIST SP 800-171 requirements and estimate your SPRS score." },
        { t: "Remediate & document", time: "Months 2-8", d: "Missing requirements implemented, the SSP written, and POA&Ms kept within what the rule allows." },
        { t: "Mock assessment & C3PAO", time: "Months 8-12", d: "An assessment-style rehearsal of your evidence, then coordination with your C3PAO." },
      ],
      deliverables: ["CUI flow map", "Scoping & enclave design", "System Security Plan", "SPRS score estimate", "POA&M", "Mock assessment"],
    },
    faq: [
      { q: "When does CMMC show up in our contracts?", a: "The DFARS rule took effect on November 10, 2025 and phases CMMC in over several years. Phase 1 brought Level 1 and Level 2 self-assessments into contracts; from November 10, 2026, Phase 2 adds Level 2 certification assessments by a C3PAO. If you handle CUI, Level 2 readiness rarely takes less than a few months." },
      { q: "Can we pass with open items?", a: "Only for certain lower-weighted requirements and above a minimum score. Open items go on a POA&M and must be closed within 180 days, so plan to fix most gaps before the assessment." },
      { q: "Who performs the assessment?", a: "Level 1 is a self-assessment. Level 2 is a self-assessment or a C3PAO certification assessment, depending on the contract, and Level 3 is assessed by the government. We prepare you; the assessment stays independent." },
    ],
  },
  "nist-800-53": {
    full: "NIST SP 800-53 Rev. 5",
    issuer: "NIST",
    summary: "The comprehensive catalog of security and privacy controls underpinning FISMA, FedRAMP and much of US government security.",
    who: ["Federal agencies and contractors", "FedRAMP and StateRAMP candidates", "Enterprises wanting a rigorous control baseline"],
    requirements: [
      { t: "20 control families", d: "From Access Control to Supply Chain Risk Management." },
      { t: "Baselines", d: "Low, Moderate and High selections, plus a privacy baseline." },
      { t: "Tailoring", d: "Scoping, parameter values and compensating controls." },
      { t: "Assessment", d: "Testing procedures aligned to SP 800-53A." },
    ],
    timeline: "8-24 weeks",
    validity: "Continuous",
    assessment: "Independent assessor",
    related: ["fedramp", "stateramp", "cmmc", "nist-csf"],
  },
  cui: {
    full: "Controlled Unclassified Information (NIST SP 800-171)",
    issuer: "NIST / US Department of Defense",
    summary: "The safeguarding rules for sensitive government information held by contractors: the security requirements of NIST SP 800-171, plus DFARS 252.204-7012 incident reporting on defense contracts. The foundation CMMC Level 2 assesses.",
    who: ["Defense contractors and subcontractors handling CUI", "Universities and research labs on federal contracts", "Manufacturers receiving controlled technical drawings"],
    requirements: [
      { t: "CUI identification", d: "Knowing which information is CUI, how it is marked, and where it flows through your systems." },
      { t: "NIST SP 800-171", d: "The security requirements for protecting CUI in contractor systems; the 110 requirements of Rev. 2 are what CMMC Level 2 assesses." },
      { t: "System Security Plan", d: "How each requirement is met, for every system that stores, processes or transmits CUI." },
      { t: "Incident reporting", d: "Cyber incidents affecting covered defense information reported to the DoD within 72 hours under DFARS 252.204-7012." },
      { t: "Cloud services", d: "Cloud services holding covered defense information must meet the FedRAMP Moderate baseline or equivalent." },
      { t: "Flow-down", d: "The same requirements passed on to subcontractors who handle CUI." },
    ],
    timeline: "3-9 months",
    validity: "Ongoing obligation",
    assessment: "Self-assessment / CMMC",
    related: ["cmmc", "itar", "nist-800-53", "ear"],
    faq: [{ q: "How is CUI different from CMMC?", a: "The CUI rules are the requirements; CMMC is how the DoD verifies that you meet them. Getting your CUI program right is most of the work toward CMMC Level 2." }],
  },
  itar: {
    full: "International Traffic in Arms Regulations",
    issuer: "US Department of State (DDTC)",
    summary: "US export controls over defense articles, services and technical data on the US Munitions List, including who can access that data in your systems.",
    who: ["Defense manufacturers and exporters", "Engineering firms handling USML technical data", "Cloud and IT providers hosting ITAR data"],
    requirements: [
      { t: "Registration", d: "DDTC registration for manufacturers and exporters." },
      { t: "Jurisdiction & classification", d: "Determining USML categories for products and data." },
      { t: "Access controls", d: "Preventing unauthorized foreign-person access to technical data." },
      { t: "Compliance program", d: "Policies, training, recordkeeping and voluntary disclosure procedures." },
    ],
    timeline: "6-12 weeks",
    validity: "Ongoing obligation",
    assessment: "Internal program review",
    related: ["ear", "cmmc"],
  },
  ear: {
    full: "Export Administration Regulations",
    issuer: "US Department of Commerce (BIS)",
    summary: "US controls on dual-use items, software and technology on the Commerce Control List, including encryption and emerging technologies.",
    who: ["Technology and software exporters", "Companies with encryption in their products", "Semiconductor and advanced-manufacturing firms"],
    requirements: [
      { t: "Classification", d: "Assigning ECCNs or EAR99 to products, software and technology." },
      { t: "Licensing", d: "Determining license requirements and exceptions by destination and end use." },
      { t: "Screening", d: "Restricted-party and end-use screening." },
      { t: "Recordkeeping", d: "Export documentation retained per regulation." },
    ],
    timeline: "6-10 weeks",
    validity: "Ongoing obligation",
    assessment: "Internal program review",
    related: ["itar", "cmmc"],
  },
  "iso-42001": {
    full: "ISO/IEC 42001:2023 AI Management System",
    issuer: "ISO / IEC",
    summary: "The first certifiable standard for governing AI, covering responsible development, risk and impact assessment, and oversight of AI systems across their lifecycle.",
    who: ["Companies building or embedding AI in products", "AI vendors facing buyer governance questions", "Enterprises preparing for AI regulation"],
    requirements: [
      { t: "AI management system", d: "Policy, roles, objectives and continual improvement for AI." },
      { t: "AI risk assessment", d: "Identification and treatment of AI-specific risks." },
      { t: "AI system impact assessment", d: "Effects on individuals, groups and society." },
      { t: "Annex A controls", d: "Data, lifecycle, transparency and third-party controls for AI systems." },
    ],
    timeline: "12-20 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["iso-27001", "iso-27701", "gdpr", "soc-2"],
    faq: [{ q: "We already have ISO 27001, how much carries over?", a: "A great deal. The management-system clauses are aligned, so your ISMS structure, internal audit and management review extend naturally. The new work is AI-specific risk, impact assessment and lifecycle controls." }],
  },
  "iso-27701": {
    full: "ISO/IEC 27701 Privacy Information Management",
    issuer: "ISO / IEC",
    summary: "A privacy information management system (PIMS) that builds on ISO 27001 to demonstrate accountable handling of personal data as a controller or processor.",
    who: ["ISO 27001-certified companies processing personal data", "Processors serving privacy-conscious enterprises", "Teams mapping one program to GDPR, CCPA and DPDPA"],
    requirements: [
      { t: "PIMS scope", d: "Controller and/or processor roles defined." },
      { t: "Privacy risk", d: "Privacy risk assessment integrated with security risk." },
      { t: "Controller & processor controls", d: "Lawful basis, consent, rights handling, sub-processor management." },
      { t: "Mapping", d: "Alignment to GDPR and other privacy laws." },
    ],
    timeline: "8-14 weeks on top of ISO 27001",
    validity: "Certified with ISO 27001",
    assessment: "Accredited certification body",
    related: ["iso-27001", "gdpr", "ccpa", "dpdpa"],
  },
  gdpr: {
    full: "EU General Data Protection Regulation",
    issuer: "European Union",
    summary: "The EU's data protection law governing how personal data of people in the EU is collected, used and transferred, with significant penalties for non-compliance.",
    who: ["Any company processing personal data of people in the EU", "SaaS processors serving European customers", "Companies transferring data outside the EU"],
    requirements: [
      { t: "Lawful basis & transparency", d: "Documented basis for processing and clear privacy notices." },
      { t: "Records & DPIAs", d: "Records of processing activities and impact assessments for high-risk processing." },
      { t: "Data subject rights", d: "Access, erasure, portability and objection handled on time." },
      { t: "Processors & contracts", d: "Data processing agreements with every processor, and due diligence on their sub-processors." },
      { t: "International transfers", d: "Standard Contractual Clauses or another valid mechanism, with a transfer assessment, for data leaving the EEA." },
      { t: "Breach notification", d: "Supervisory authority notified within 72 hours where required." },
    ],
    timeline: "8-12 weeks",
    validity: "Ongoing obligation",
    assessment: "Gap assessment & audit",
    related: ["iso-27701", "ccpa", "dpdpa", "pdpa"],
    core: {
      market: "EU privacy",
      proves: "That you collect, use and transfer the personal data of people in the EU lawfully, and can show it.",
      buyer: "European customers and their data protection officers, and EU regulators.",
      phases: [
        { t: "Data mapping", time: "Weeks 1-3", d: "Find where personal data lives, why you hold it and who you share it with, and build the record of processing." },
        { t: "Gap assessment", time: "Weeks 3-5", d: "Test notices, lawful bases, contracts, rights handling and security against the regulation." },
        { t: "Fix & document", time: "Weeks 5-10", d: "Privacy notices, DPAs, transfer mechanisms, DPIAs and a rights-request process that works." },
        { t: "Operate", time: "Ongoing", d: "Breach response drills, vendor reviews, and updates when your product or processing changes." },
      ],
      deliverables: ["Data map & record of processing", "Privacy notice review", "DPA templates", "Transfer assessment", "DPIA template", "Rights & breach procedures"],
    },
    faq: [
      { q: "Is there a GDPR certificate?", a: "There is no single, widely used GDPR certificate. Companies show compliance through records, contracts and procedures, often backed by ISO 27701 or SOC 2 privacy criteria. We prepare that evidence and, where you want a certification, coordinate the auditors." },
      { q: "Does GDPR apply if we have no EU office?", a: "Yes, if you offer goods or services to people in the EU or monitor their behavior." },
      { q: "Do we need a data protection officer?", a: "Only in certain cases, such as large-scale monitoring of people or large-scale processing of sensitive data. We'll tell you during the gap assessment whether you do." },
    ],
  },
  ccpa: {
    full: "California Consumer Privacy Act (as amended by CPRA)",
    issuer: "State of California",
    summary: "California's privacy law granting consumers rights over their personal information and imposing obligations on businesses that meet its thresholds.",
    who: ["Businesses meeting CCPA revenue or data thresholds", "Adtech and data-driven consumer platforms", "Service providers to California businesses"],
    requirements: [
      { t: "Consumer rights", d: "Know, delete, correct, and opt out of sale or sharing." },
      { t: "Notices", d: "Notice at collection and a comprehensive privacy policy." },
      { t: "Contracts", d: "Service provider and contractor terms." },
      { t: "Risk assessments", d: "Assessments and cybersecurity audits for higher-risk processing." },
    ],
    timeline: "6-10 weeks",
    validity: "Ongoing obligation",
    assessment: "Gap assessment",
    related: ["gdpr", "iso-27701"],
  },
  hipaa: {
    full: "Health Insurance Portability and Accountability Act",
    issuer: "US Department of Health & Human Services",
    summary: "US rules protecting health information, the Privacy, Security and Breach Notification Rules apply to covered entities and their business associates.",
    who: ["Health-tech and digital health platforms", "Business associates handling ePHI", "Providers, payers and clearinghouses"],
    requirements: [
      { t: "Risk analysis", d: "An accurate and thorough assessment of risks to ePHI." },
      { t: "Safeguards", d: "Administrative, physical and technical safeguards under the Security Rule." },
      { t: "Business associate agreements", d: "Contracts with every vendor handling ePHI." },
      { t: "Breach notification", d: "Procedures for notifying individuals, HHS and, in some cases, media." },
    ],
    timeline: "8-12 weeks",
    validity: "Ongoing obligation",
    assessment: "Third-party assessment",
    related: ["soc-2", "iso-27001", "iso-27701"],
    faq: [{ q: "Is there an official HIPAA certification?", a: "No. HHS does not certify compliance. Buyers typically accept an independent HIPAA assessment, often delivered alongside a SOC 2 report that includes HIPAA mapping." }],
  },
  pdpa: {
    full: "Personal Data Protection Act (Singapore)",
    issuer: "Personal Data Protection Commission",
    summary: "Singapore's baseline privacy law governing the collection, use and disclosure of personal data, with similar PDPA regimes in Thailand and Malaysia.",
    who: ["Companies operating in or serving Singapore", "Regional APAC businesses", "Processors for Singapore organizations"],
    requirements: [
      { t: "Consent & purpose", d: "Obligations for consent, purpose limitation and notification." },
      { t: "Data Protection Officer", d: "A designated DPO with published contact details." },
      { t: "Protection & retention", d: "Reasonable security arrangements and retention limits." },
      { t: "Breach notification", d: "Assessing and notifying notifiable data breaches promptly." },
    ],
    timeline: "6-10 weeks",
    validity: "Ongoing obligation",
    assessment: "Gap assessment",
    related: ["gdpr", "dpdpa", "iso-27701"],
  },
  dpdpa: {
    full: "Digital Personal Data Protection Act, 2023 (India)",
    issuer: "Government of India",
    summary: "India's comprehensive data protection law, with implementing rules being phased in, covering consent, data fiduciary duties and rights of data principals.",
    who: ["Companies processing personal data of people in India", "Global firms with Indian operations or users", "Significant Data Fiduciaries designated by government"],
    requirements: [
      { t: "Notice & consent", d: "Clear, itemized notices and verifiable consent, including via consent managers." },
      { t: "Data fiduciary obligations", d: "Accuracy, security safeguards, retention limits and breach reporting." },
      { t: "Rights of data principals", d: "Access, correction, erasure and grievance redressal." },
      { t: "Significant Data Fiduciaries", d: "DPO, independent audits and DPIAs where designated." },
    ],
    timeline: "8-12 weeks",
    validity: "Ongoing obligation",
    assessment: "Gap assessment & audit",
    related: ["gdpr", "iso-27701", "sebi-cscrf"],
  },
  "pci-dss": {
    full: "Payment Card Industry Data Security Standard v4.0.1",
    issuer: "PCI Security Standards Council",
    summary: "The security standard for any entity that stores, processes or transmits cardholder data, validated by a QSA Report on Compliance or a Self-Assessment Questionnaire.",
    who: ["Merchants and payment service providers", "Fintechs touching card data", "SaaS platforms in the payment flow"],
    requirements: [
      { t: "12 requirements", d: "From network security controls to security policies and programs." },
      { t: "Scoping & segmentation", d: "Minimizing the cardholder data environment." },
      { t: "Customized approach", d: "v4 option to meet objectives with tailored controls." },
      { t: "Validation", d: "ROC by a QSA or SAQ, plus quarterly ASV scans." },
    ],
    timeline: "12-24 weeks",
    validity: "Validated annually",
    assessment: "QSA or SAQ",
    related: ["pci-risk-assessment", "soc-2", "iso-27001", "soc-1"],
  },
  "pci-risk-assessment": {
    full: "PCI DSS Risk Assessment & Targeted Risk Analysis",
    issuer: "PCI Security Standards Council",
    summary: "The risk analyses PCI DSS v4 now requires, including targeted risk analyses that justify control frequencies and customized approaches.",
    who: ["Entities adopting PCI DSS v4", "Organizations using the customized approach", "Teams reducing scope and cost"],
    requirements: [
      { t: "Targeted risk analyses", d: "Documented analyses for requirements with flexible frequencies." },
      { t: "Scope validation", d: "Confirming CDE boundaries and connected systems." },
      { t: "Threat & vulnerability view", d: "Risks to cardholder data prioritized." },
      { t: "Annual review", d: "Analyses reviewed at least every 12 months." },
    ],
    timeline: "3-6 weeks",
    validity: "Reviewed annually",
    assessment: "Consultant-led",
    related: ["pci-dss"],
  },
  dora: {
    full: "Digital Operational Resilience Act",
    issuer: "European Union",
    summary: "The EU regulation, applicable since January 2025, requiring financial entities to withstand, respond to and recover from ICT disruptions, including those at third parties.",
    who: ["EU banks, insurers, investment and payment firms", "Crypto-asset service providers", "ICT providers serving EU financial entities"],
    requirements: [
      { t: "ICT risk management", d: "A governed framework owned by the management body." },
      { t: "Incident reporting", d: "Classification and reporting of major ICT incidents." },
      { t: "Resilience testing", d: "Regular testing, with threat-led penetration testing for some entities." },
      { t: "Third-party risk", d: "Register of information and contractual requirements for ICT providers." },
    ],
    timeline: "10-20 weeks",
    validity: "Ongoing obligation",
    assessment: "Gap assessment",
    related: ["iso-27001", "iso-22301", "pci-dss"],
  },
  "sebi-cscrf": {
    full: "SEBI Cybersecurity & Cyber Resilience Framework",
    issuer: "Securities and Exchange Board of India",
    summary: "SEBI's consolidated cybersecurity framework for regulated entities in India's securities market, with requirements scaled by entity category.",
    who: ["Stock brokers and depository participants", "Asset management companies and RTAs", "Market infrastructure institutions"],
    requirements: [
      { t: "Governance", d: "Board-approved policy, roles and cyber resilience objectives." },
      { t: "Identify, protect, detect", d: "Asset inventory, access controls, SOC monitoring." },
      { t: "Respond & recover", d: "Incident response, BCP and recovery testing." },
      { t: "Cyber audit", d: "Periodic audits by CERT-In empaneled auditors." },
    ],
    timeline: "8-16 weeks",
    validity: "Periodic audits",
    assessment: "CERT-In empaneled auditor",
    related: ["dpdpa", "iso-27001", "iso-22301"],
  },
  "iso-9001": {
    full: "ISO 9001:2015 Quality Management",
    issuer: "ISO",
    summary: "The world's most widely used quality management standard, a framework for consistent products, services and customer satisfaction.",
    who: ["Manufacturers and service businesses", "Suppliers to large enterprises and government", "Teams formalizing operational quality"],
    requirements: [
      { t: "Process approach", d: "Defined, measured and improved business processes." },
      { t: "Customer focus", d: "Requirements captured and satisfaction monitored." },
      { t: "Risk-based thinking", d: "Risks and opportunities addressed in planning." },
      { t: "Internal audit", d: "Evidence of continual improvement." },
    ],
    timeline: "10-16 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["iso-27001", "iso-20000", "iso-45001"],
  },
  "iso-20000": {
    full: "ISO/IEC 20000-1 IT Service Management",
    issuer: "ISO / IEC",
    summary: "The international standard for IT service management systems, demonstrating reliable, well-governed service delivery.",
    who: ["Managed service and IT outsourcing providers", "Internal IT organizations", "Cloud operations teams"],
    requirements: [
      { t: "Service management system", d: "Policy, objectives and planning for services." },
      { t: "Service delivery", d: "Catalog, SLAs, capacity and availability management." },
      { t: "Resolution & fulfillment", d: "Incident, request and problem management." },
      { t: "Control processes", d: "Change, release and configuration management." },
    ],
    timeline: "12-18 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["iso-27001", "iso-9001", "iso-22301"],
  },
  "iso-22301": {
    full: "ISO 22301 Business Continuity Management",
    issuer: "ISO",
    summary: "The standard for business continuity management systems, proving you can keep critical services running through disruption.",
    who: ["Financial services and critical infrastructure", "SaaS providers with uptime commitments", "Organizations facing DORA or resilience rules"],
    requirements: [
      { t: "Business impact analysis", d: "Critical activities, RTOs and RPOs defined." },
      { t: "Continuity strategies", d: "Solutions for people, sites, technology and suppliers." },
      { t: "Plans & procedures", d: "Documented continuity and recovery plans." },
      { t: "Exercising", d: "Regular tests that prove plans work." },
    ],
    timeline: "10-16 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["iso-27001", "dora", "iso-20000"],
  },
  "iso-41001": {
    full: "ISO 41001 Facility Management",
    issuer: "ISO",
    summary: "A management system standard for facility management, aligning workplace services with organizational objectives.",
    who: ["Facility management providers", "Real-estate and workplace teams", "Organizations with large physical estates"],
    requirements: [
      { t: "FM system", d: "Scope, policy and objectives for facility services." },
      { t: "Stakeholder needs", d: "Demand and service requirements captured." },
      { t: "Operational control", d: "Service delivery, integration and performance." },
      { t: "Evaluation", d: "Monitoring, internal audit and improvement." },
    ],
    timeline: "10-14 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["iso-45001", "iso-9001"],
  },
  "iso-45001": {
    full: "ISO 45001 Occupational Health & Safety",
    issuer: "ISO",
    summary: "The international standard for occupational health and safety management, reducing workplace risk and demonstrating a safe operation.",
    who: ["Manufacturing, construction and logistics", "Contractors bidding for large projects", "Organizations formalizing safety programs"],
    requirements: [
      { t: "Worker participation", d: "Consultation and participation of workers." },
      { t: "Hazard identification", d: "OH&S risks and opportunities assessed." },
      { t: "Operational planning", d: "Controls, emergency preparedness and contractors." },
      { t: "Incident investigation", d: "Nonconformity and corrective action." },
    ],
    timeline: "10-14 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["iso-9001", "iso-41001", "iso-14001", "bs-9997"],
  },
  "iso-14001": {
    full: "ISO 14001:2015 Environmental Management Systems",
    issuer: "ISO",
    summary: "The international standard for environmental management systems, a structured way to control your environmental impact, meet legal obligations and show buyers measurable progress.",
    who: ["Manufacturers, construction and logistics firms", "Suppliers facing sustainability clauses in enterprise and public contracts", "Organizations building toward ESG reporting"],
    requirements: [
      { t: "Environmental aspects", d: "Activities, products and services assessed for their environmental impacts, with significant aspects identified." },
      { t: "Compliance obligations", d: "A maintained register of the legal and other requirements that apply to you." },
      { t: "Objectives & operational control", d: "Measurable objectives, life-cycle thinking and emergency preparedness built into operations." },
      { t: "Evaluation & improvement", d: "Monitoring, internal audit and management review that drive continual improvement." },
    ],
    timeline: "10-16 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["iso-9001", "iso-45001", "iso-28000"],
    faq: [{ q: "Can ISO 14001 share a system with ISO 9001 and ISO 45001?", a: "Yes. All three follow the same high-level structure, so most organizations run them as one integrated management system with a single internal audit and management review." }],
  },
  "iso-28000": {
    full: "ISO 28000:2022 Security and Resilience: Security Management Systems",
    issuer: "ISO",
    summary: "A management system standard for security across your operations and supply chain. The 2022 edition widened its scope from supply chains to security risk across the whole organization.",
    who: ["Logistics, freight, ports and warehousing operators", "Manufacturers and exporters with critical supply chains", "Suppliers to defense, aviation and critical infrastructure"],
    requirements: [
      { t: "Security risk assessment", d: "Threats to people, assets, information and the supply chain identified and evaluated." },
      { t: "Policy & objectives", d: "Leadership commitment, a security policy and measurable security objectives." },
      { t: "Operational controls", d: "Controls over sites, suppliers, outsourced processes and goods in transit." },
      { t: "Incident response & recovery", d: "Emergency preparedness, response and recovery, tested and reviewed." },
    ],
    timeline: "12-18 weeks",
    validity: "3-year certificate, annual surveillance",
    assessment: "Accredited certification body",
    related: ["iso-22301", "iso-27001", "iso-9001", "bs-7858"],
  },
  "bs-9997": {
    full: "BS 9997:2019 Fire Risk Management Systems",
    issuer: "BSI (British Standards Institution)",
    summary: "A British Standard that sets requirements for a fire risk management system, giving the people responsible for fire safety a structured, auditable way to manage it across buildings and sites.",
    who: ["Property, housing and facilities management organizations", "Healthcare, education and hospitality estates", "Responsible persons for fire safety across multiple sites"],
    requirements: [
      { t: "Fire safety policy & roles", d: "Leadership commitment and clearly assigned fire safety responsibilities." },
      { t: "Fire risk assessment", d: "Suitable and sufficient fire risk assessments, kept under review." },
      { t: "Operational controls", d: "Maintenance of fire protection systems, evacuation strategy and emergency plans." },
      { t: "Competence & review", d: "Training, monitoring, internal audit and management review of fire safety performance." },
    ],
    timeline: "8-14 weeks",
    validity: "Certified, with annual surveillance",
    assessment: "Certification body",
    related: ["iso-45001", "iso-41001", "iso-22301"],
  },
  "iso-15489-1": {
    full: "ISO 15489-1:2016 Records Management: Concepts and Principles",
    issuer: "ISO",
    summary: "The international reference for records management, setting out how to create, capture and manage records so they remain authentic, reliable and usable for as long as they are needed.",
    who: ["Regulated organizations with retention obligations", "Legal, financial services, healthcare and public sector bodies", "Teams consolidating document and records systems"],
    requirements: [
      { t: "Policies & responsibilities", d: "A records policy with clear ownership and accountability." },
      { t: "Appraisal", d: "Deciding which records must be created, captured and kept, and for how long." },
      { t: "Records controls", d: "Metadata, classification schemes, access rules and disposition authorities." },
      { t: "Records processes", d: "Creating, capturing, storing, migrating and disposing of records, monitored over time." },
    ],
    timeline: "8-12 weeks",
    validity: "Ongoing program",
    assessment: "Gap assessment (not certifiable on its own)",
    related: ["bs-10008-1", "bs-en-15713", "iso-27001", "gdpr"],
    faq: [{ q: "Can we be certified to ISO 15489-1?", a: "No. It is a concepts-and-principles standard rather than a certifiable requirements standard. We assess your records program against it and align it with the certifiable standards you hold, such as ISO 27001 or BS 10008-1." }],
  },
  "bs-10008-1": {
    full: "BS 10008-1:2020 Evidential Weight and Legal Admissibility of Electronic Information",
    issuer: "BSI (British Standards Institution)",
    summary: "A British Standard specifying how to manage electronically stored information so that it carries maximum evidential weight if it is ever challenged in a dispute, an investigation or a court.",
    who: ["Organizations that scan paper records and destroy the originals", "Legal, insurance, financial services and public sector bodies", "Archiving, e-signature and document-scanning providers"],
    requirements: [
      { t: "Information management policy", d: "Documented policy, roles and procedures for electronic information." },
      { t: "Capture & integrity", d: "Controlled capture of scanned and born-digital information, with integrity checks." },
      { t: "Authenticity & audit trails", d: "Evidence of who did what to information, and when, across its life." },
      { t: "Storage, transfer & disposal", d: "Secure retention, migration, transfer and authorized disposal." },
    ],
    timeline: "10-16 weeks",
    validity: "Certified, with annual surveillance",
    assessment: "Certification body",
    related: ["iso-15489-1", "bs-en-15713", "iso-27001"],
  },
  "bs-en-15713": {
    full: "BS EN 15713:2023 Secure Destruction of Confidential Material",
    issuer: "BSI / CEN (European standard)",
    summary: "The code of practice for destroying confidential material securely, covering collection, transport, storage, destruction and the audit trail that proves it happened.",
    who: ["Shredding, records-destruction and IT asset disposal providers", "Records management and storage companies", "Organizations auditing the suppliers that destroy their data"],
    requirements: [
      { t: "Secure premises", d: "Protected storage and processing areas with intrusion detection and monitoring." },
      { t: "Collection & transport", d: "Secured vehicles and an unbroken chain of custody." },
      { t: "Screened staff", d: "Personnel screened before they handle confidential material." },
      { t: "Destruction & certification", d: "Destruction to the specified size for each material, with a certificate of destruction." },
    ],
    timeline: "6-10 weeks",
    validity: "Certified, with annual surveillance",
    assessment: "Certification body",
    related: ["bs-7858", "bs-10008-1", "iso-15489-1"],
  },
  "bs-7858": {
    full: "BS 7858:2019 Screening of Individuals Working in a Secure Environment",
    issuer: "BSI (British Standards Institution)",
    summary: "The British Standard code of practice for security screening and vetting of people who work where the security of people, goods, data or property matters.",
    who: ["Security services and guarding companies", "Facilities management, data center and cash-handling operators", "Contractors with access to sensitive sites or confidential material"],
    requirements: [
      { t: "Identity & right to work", d: "Verified identity and right to work before screening begins." },
      { t: "History verification", d: "Employment, education and activity history checked across the screening period, with gaps accounted for." },
      { t: "Financial & criminal checks", d: "Financial and criminal record checks carried out within the law." },
      { t: "Records & conditional employment", d: "Controlled screening files, data protection and limits on provisional employment." },
    ],
    timeline: "4-8 weeks",
    validity: "Ongoing, reviewed at audit",
    assessment: "Certification body",
    related: ["bs-en-15713", "iso-28000", "iso-27001"],
  },
};

export const frameworks: Framework[] = frameworkGroups.flatMap((g) =>
  g.items.map((it) => {
    const d = details[it.slug];
    const faq = [
      ...(d.faq ?? []),
      { q: `How long does ${it.name} take?`, a: `Typical timeline: ${d.timeline.toLowerCase()}, depending on scope, maturity and team availability. We'll give you a firm plan after a two-week scoping and gap assessment.` },
      {
        q: `Can ${it.name} be combined with other frameworks?`,
        a: `Yes, that's our specialty. ${it.name} shares substantial control overlap with ${d.related
          .slice(0, 2)
          .map((r) => nameOf(r))
          .join(" and ")}, so we build one control set and map evidence across all of them.`,
      },
    ];
    return { slug: it.slug, name: it.name, group: g.name, groupId: g.id, ...d, faq };
  }),
);

export function nameOf(slug: string) {
  for (const g of frameworkGroups) for (const i of g.items) if (i.slug === slug) return i.name;
  return slug;
}

export const getFramework = (slug: string) => frameworks.find((f) => f.slug === slug);

/** The frameworks SecureKnots leads with: one card each on the homepage. */
export const CORE_SLUGS = ["soc-2", "fedramp", "cmmc", "gdpr"];
/** Shown above the core cards, as the featured service. */
export const FEATURED_SLUG = "fedramp-20x";
/** Seema's core services: tagged "Core" and listed first across the site. */
export const CORE_SERVICES = ["fedramp-20x", "fedramp", "soc-2", "cmmc", "gdpr", "stateramp", "itar", "cui"];

type CoreFramework = Framework & { core: CoreDetail };
export const coreFrameworks = CORE_SLUGS.map((s) => getFramework(s)!) as CoreFramework[];
export const featuredFramework = getFramework(FEATURED_SLUG)! as CoreFramework;
export const isCore = (slug: string) => CORE_SERVICES.includes(slug);
