import { supabaseAdmin } from "@/utils/supabase";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeUp } from "../animations/FadeUp";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 0;

export async function NewArrivals() {
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
      .limit(4);

    if (error || !products || products.length === 0) {
      return null;
    }

    return (
      <section className="py-32 bg-[#0D0D0D] border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="font-body text-[10px] tracking-[0.4em] uppercase font-light text-primary block mb-3">
                  Latest Additions
                </span>
                <h2 className="font-display text-3xl md:text-5xl tracking-widest text-white uppercase mb-4">
                  Just Dropped
                </h2>
                <p className="font-body text-xs tracking-widest uppercase text-white/40 max-w-xl">
                  Fresh out of the oven. Cop these before they sell out.
                </p>
              </div>
              <Link 
                href="/shop"
                className="group inline-flex items-center text-[10px] font-bold text-white gap-2 uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
              >
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <FadeUp key={product.id} delay={0.1 * idx}>
                <ProductCard product={product} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (err) {
    console.error("Failed to load new arrivals:", err);
    return null;
  }
}
