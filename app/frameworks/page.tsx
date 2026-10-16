import type { Metadata } from "next";
import { frameworks } from "@/lib/frameworks";
import { PageHero } from "@/components/page/PageHero";
import { FrameworkExplorer } from "@/components/frameworks/FrameworkExplorer";
import { CoverageGrid } from "@/components/meridian/CoverageGrid";
import { OverlapMap } from "@/components/home/OverlapMap";
import { ReadinessCheck } from "@/components/home/ReadinessCheck";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Frameworks",
  description: `SOC 2, ISO 27001, FedRAMP, CMMC, PCI DSS, HIPAA, ISO 42001, GDPR, DORA, ISO 14001, BS 7858 and more: ${frameworks.length} frameworks and standards prepared as one unified program.`,
};

export default function FrameworksPage() {
  return (
    <>
      <PageHero
        eyebrow={`${frameworks.length} frameworks`}
        title={
          <>
            Every framework. <span className="em text-brand">One method.</span>
          </>
        }
        intro="Security attestations, government authorizations, privacy laws, AI governance, management systems and records standards, scoped together, tested once and mapped everywhere."
        actions={
          <>
            <Button href="#book">Find my frameworks</Button>
            <Button href="#assess-once" variant="outline" magnetic={false}>
              See the overlap
            </Button>
          </>
        }
        art="frameworks-hub"
      />
      <FrameworkExplorer items={frameworks} />
      <CoverageGrid />
      <OverlapMap eyebrow="Assess once" />
      <ReadinessCheck eyebrow="Not sure where to start?" />
      <FinalCTA eyebrow="Start here" />
    </>
  );
}
