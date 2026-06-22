import { supabaseAdmin } from "@/utils/supabase";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeUp } from "../animations/FadeUp";

export const revalidate = 0;

export async function TrendingSlider() {
  try {
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        categories (
          name
        )
      `)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error || !products || products.length === 0) {
      return null;
    }

    return (
      <section className="py-24 bg-[#080808] border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp>
            <div className="flex flex-col items-center text-center mb-16">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase font-light text-primary block mb-3">
                Trending Now
              </span>
              <h2 className="font-display text-3xl md:text-5xl tracking-widest text-white uppercase mb-4">
                The Hype
              </h2>
              <p className="font-body text-xs tracking-widest uppercase text-white/40 max-w-xl mx-auto">
                The most hyped pieces this week. Don't miss out.
              </p>
            </div>
          </FadeUp>

          <div className="relative">
            <div 
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product, idx) => (
                <div key={product.id} className="min-w-[280px] md:min-w-[320px] lg:min-w-[380px] snap-start">
                  <FadeUp delay={0.1 * idx}>
                    <ProductCard product={product} />
                  </FadeUp>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (err) {
    console.error("Failed to load trending products:", err);
    return null;
  }
}
