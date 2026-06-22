import { ExploreHero } from "@/components/explore/ExploreHero";
import { LookbookGrid } from "@/components/explore/LookbookGrid";
import { TrendSpotlight } from "@/components/explore/TrendSpotlight";

export const metadata = {
  title: "Explore | Zanka",
  description: "Discover curated editorial lookbooks, styling inspiration, and the season's boldest thrifted trends at Zanka.",
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#080808]">
      <ExploreHero />
      <TrendSpotlight />
      <LookbookGrid />
    </main>
  );
}
