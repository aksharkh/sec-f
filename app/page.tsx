import { MeridianHero } from "@/components/meridian/home/MeridianHero";
import {
  Facts,
  FrameworkBand,
  Perspective,
  CoreFrameworks,
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
import { SHOW_STORIES } from "@/lib/stories";

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
      <CoreFrameworks />
      <ThreadKnot className="container-x pt-16 pb-10 md:pt-24 md:pb-14" />
      <Capabilities />
      <Approach />
      <ControlMatrix />
      <WhyUs />
      <FrameworkDirectory />
      <ThreadKnot className="container-x -my-2" />
      <RegionalCoverage />
      <OverlapMap eyebrow={<Numbered dark n="08" label="Assess once" />} />
      <ReadinessCheck eyebrow={<Numbered n="09" label="Readiness check" />} />
      <Industries eyebrow={<Numbered dark n="10" label="Industries" />} />
      {SHOW_STORIES ? (
        <>
          <Voices />
          <ThreadKnot className="container-x -mt-4 pb-10 md:-mt-6 md:pb-14" />
        </>
      ) : (
        <ThreadKnot className="container-x pb-10 pt-16 md:pb-14 md:pt-24" />
      )}
      <Journal />
      <ClosingCTA />
      <ProgressRail />
    </>
  );
}
