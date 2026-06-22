import { supabaseAdmin } from '@/utils/supabase';
import { ProductCard } from '@/components/shop/ProductCard';

export const revalidate = 0;

export const metadata = {
  title: "Shop All | Zanka",
  description: "Browse all curated thrift and vintage collections.",
};

export default async function ShopPage() {
  try {
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        categories (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (
      <div className="flex flex-col">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl tracking-widest text-white uppercase mb-4">
            All Products
          </h1>
          <p className="font-body text-xs tracking-widest uppercase text-white/50 max-w-xl">
            Our complete collection of thrifted dresses, pop culture socks, and statement tops.
          </p>
        </div>

        {(!products || products.length === 0) ? (
          <p className="font-body text-xs tracking-widest uppercase text-white/40">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (err) {
    console.error('Failed to load shop products:', err);
    return (
      <div className="flex flex-col text-center py-20">
        <p className="font-body text-xs tracking-widest uppercase text-red-500">
          Failed to load catalog.
        </p>
      </div>
    );
  }
}
