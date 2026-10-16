import { MeridianHero } from "@/components/meridian/home/MeridianHero";
import {
  Facts,
  FrameworkBand,
  Perspective,
  Capabilities,
  Approach,
  WhyUs,
  FrameworkDirectory,
  Voices,
  Journal,
  ClosingCTA,
} from "@/components/meridian/home/Sections";
import { Numbered } from "@/components/meridian/home/Head";
import { RegionalCoverage } from "@/components/meridian/home/RegionalCoverage";
import { ControlMatrix } from "@/components/meridian/home/ControlMatrix";
import { ProgressRail } from "@/components/meridian/ProgressRail";
import { OverlapMap } from "@/components/home/OverlapMap";
import { ReadinessCheck } from "@/components/home/ReadinessCheck";
import { Industries } from "@/components/home/Industries";
import { ThreadKnot } from "@/components/brand/ThreadKnot";

/**
 * The homepage as one story: the tangle (hero), the problem, how we tie it,
 * the proof, and the end of the thread. Each section carries a `data-rail`
 * label for the side progress rail.
 */
export default function Home() {
  return (
    <>
      <MeridianHero />
      <Facts />
      <FrameworkBand />
      <Perspective />
      <ThreadKnot className="container-x -mt-4 pb-10 md:-mt-6 md:pb-14" />
      <Capabilities />
      <Approach />
      <ControlMatrix />
      <WhyUs />
      <FrameworkDirectory />
      <ThreadKnot className="container-x -my-2" />
      <RegionalCoverage />
      <OverlapMap eyebrow={<Numbered dark n="07" label="Assess once" />} />
      <ReadinessCheck eyebrow={<Numbered n="08" label="Readiness check" />} />
      <Industries eyebrow={<Numbered dark n="09" label="Industries" />} />
      <Voices />
      <ThreadKnot className="container-x -mt-4 pb-10 md:-mt-6 md:pb-14" />
      <Journal />
      <ClosingCTA />
      <ProgressRail />
    </>
  );
}
