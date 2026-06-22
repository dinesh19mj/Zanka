import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { TrendingSlider } from "@/components/home/TrendingSlider";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BrandStory } from "@/components/home/BrandStory";
import { LimitedDrop } from "@/components/home/LimitedDrop";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <FeaturedCategories />
      <TrendingSlider />
      <NewArrivals />
      <LimitedDrop />
      <BrandStory />
    </>
  );
}
