import { supabaseAdmin } from '@/utils/supabase';
import { ProductCard } from '@/components/shop/ProductCard';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { category: string } }) {
  const { category } = await params;
  
  // Try to fetch category details
  const { data } = await supabaseAdmin
    .from('categories')
    .select('name')
    .eq('slug', category)
    .single();

  if (!data) return { title: 'Category Not Found | Zanka' };

  return {
    title: `${data.name} | Zanka Shop`,
    description: `Shop our curated selection of ${data.name.toLowerCase()} at Zanka.`,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category: slug } = await params;

  // Fetch the category by slug
  const { data: categoryData, error: catError } = await supabaseAdmin
    .from('categories')
    .select('id, name')
    .eq('slug', slug)
    .single();

  if (catError || !categoryData) {
    return notFound();
  }

  try {
    // Fetch products belonging to this category
    const { data: products, error: prodError } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq('category_id', categoryData.id)
      .order('created_at', { ascending: false });

    if (prodError) throw prodError;

    return (
      <div className="flex flex-col">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl tracking-widest text-white uppercase mb-4">
            {categoryData.name}
          </h1>
          <p className="font-body text-xs tracking-widest uppercase text-white/50 max-w-xl">
            Explore our curated selection of {categoryData.name.toLowerCase()}.
          </p>
        </div>

        {(!products || products.length === 0) ? (
          <p className="font-body text-xs tracking-widest uppercase text-white/40">
            No products found in this category.
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
    console.error(`Failed to load products for category ${slug}:`, err);
    return (
      <div className="flex flex-col text-center py-20">
        <p className="font-body text-xs tracking-widest uppercase text-red-500">
          Failed to load category data.
        </p>
      </div>
    );
  }
}
