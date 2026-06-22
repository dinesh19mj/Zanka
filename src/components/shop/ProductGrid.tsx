import Image from 'next/image';
import Link from 'next/link';
import { supabaseAdmin } from '@/utils/supabase';
import { ProductCard } from '@/components/shop/ProductCard';

export const revalidate = 0; // Disable caching for now to always fetch fresh products

export async function ProductGrid() {
  try {
    // Fetch products and categories from Supabase
    const { data: products, error: prodError } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        categories (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (prodError) throw prodError;

    if (!products || products.length === 0) {
      return (
        <section className="py-24 bg-[#0D0D0D] border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-5xl tracking-widest text-white uppercase mb-4">
              The Collection
            </h2>
            <p className="font-body text-xs tracking-widest uppercase text-white/40">
              No products found in the catalog.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section className="py-24 bg-[#0D0D0D] border-t border-white/5" id="shop">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-body text-[10px] tracking-[0.4em] uppercase font-light text-primary block mb-3">
              Latest Drops
            </span>
            <h2 className="font-display text-3xl md:text-5xl tracking-widest text-white uppercase">
              The Collection
            </h2>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <section className="py-24 bg-[#0D0D0D] border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body text-xs tracking-widest text-red-500 uppercase">
            Failed to load catalog. Please ensure Supabase is configured properly.
          </p>
        </div>
      </section>
    );
  }
}
