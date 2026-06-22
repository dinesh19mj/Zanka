import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/utils/supabase";
import { RazorpayButton } from "@/components/checkout/RazorpayButton";
import { Star, Truck, ShieldCheck, RotateCcw, Tag } from "lucide-react";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('name, description')
    .eq('id', id)
    .single();

  if (!product) return { title: 'Product Not Found | Zanka' };

  return {
    title: `${product.name} | Zanka`,
    description: product.description || `Buy ${product.name} at Zanka.`,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // Fetch product data
  const { data: product, error } = await supabaseAdmin
    .from('products')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq('id', id)
    .single();

  if (error || !product) {
    return notFound();
  }

  // Mock Data for E-commerce feel
  const mrp = Math.round(product.price_inr * 1.4); // 40% markup for MRP
  const discountPercent = Math.round(((mrp - product.price_inr) / mrp) * 100);
  const ratingCount = Math.floor(Math.random() * 500) + 50;
  const ratingValue = (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1);

  return (
    <main className="min-h-screen bg-[#080808] pt-24 pb-20 font-body">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/40 mb-6 border-b border-white/5 pb-4">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          {product.categories?.slug && (
            <>
              <Link href={`/shop/${product.categories.slug}`} className="hover:text-primary transition-colors">
                {product.categories.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 justify-center">
          
          {/* Left Column: Image Gallery (Sticky) */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <div className="sticky top-24 flex flex-col gap-4 w-full max-w-sm">
              
              {/* Main Image */}
              <div className="relative aspect-[3/4] w-full bg-[#0D0D0D] border border-white/5 shadow-2xl">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] uppercase text-white/20">No Image</span>
                  </div>
                )}
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10 shadow-lg">
                    <span className="bg-primary text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-bold rounded-sm">
                      {product.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons (Under Main Image) */}
              <div className="flex gap-4 mt-2">
                <button className="flex-1 bg-[#1A1A1A] border border-white/10 text-white font-bold text-[10px] tracking-widest uppercase py-4 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  Add to Cart
                </button>
                <RazorpayButton 
                  amount={product.price_inr} 
                  productName={product.name} 
                  productId={product.id}
                  className="flex-1 bg-primary text-white font-bold text-[10px] tracking-widest uppercase py-4 hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(229,33,43,0.3)]"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Product Details (E-commerce Style) */}
          <div className="w-full lg:w-7/12 flex flex-col pt-2 lg:pt-0 max-w-2xl">
            
            {/* Title & Brand */}
            <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold mb-2">
              ZANKA EXCLUSIVE
            </p>
            <h1 className="text-2xl md:text-3xl text-white font-medium mb-3 leading-snug">
              {product.name}
            </h1>
            
            {/* Ratings */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center bg-green-800/20 text-green-500 px-2 py-0.5 rounded-sm gap-1 border border-green-500/20">
                <span className="text-xs font-bold">{ratingValue}</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-xs text-white/50 underline decoration-white/20 underline-offset-4 cursor-pointer hover:text-white transition-colors">
                {ratingCount} Ratings & {Math.floor(ratingCount * 0.3)} Reviews
              </span>
            </div>

            {/* Pricing Block */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-semibold text-white">₹{product.price_inr}</span>
              <span className="text-sm text-white/40 line-through mb-1">₹{mrp}</span>
              <span className="text-sm font-bold text-green-500 mb-1">{discountPercent}% off</span>
            </div>

            <div className="w-full h-[1px] bg-white/5 mb-6 hidden lg:block" />

            {/* Available Offers */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-500" />
                Available Offers
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-2 text-sm text-white/70">
                  <span className="font-bold text-white">Bank Offer</span> 5% Unlimited Cashback on Zanka Axis Bank Credit Card
                </li>
                <li className="flex gap-2 text-sm text-white/70">
                  <span className="font-bold text-white">Special Price</span> Get extra 10% off (price inclusive of cashback/coupon)
                </li>
                <li className="flex gap-2 text-sm text-white/70">
                  <span className="font-bold text-white">Partner Offer</span> Sign up for Zanka+ and get ₹500 Gift Card
                </li>
              </ul>
            </div>

            <div className="w-full h-[1px] bg-white/5 mb-6" />

            {/* Delivery / Pincode */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-white/70" />
                <span className="text-sm font-bold text-white">Delivery</span>
              </div>
              <div className="flex items-center gap-0 w-full max-w-sm mb-2 border border-white/10 focus-within:border-primary transition-colors">
                <input 
                  type="text" 
                  placeholder="Enter Delivery Pincode" 
                  className="bg-transparent text-sm text-white px-4 py-2 w-full outline-none placeholder:text-white/30"
                />
                <button className="text-primary text-sm font-bold px-4 hover:text-white transition-colors uppercase tracking-wider">
                  Check
                </button>
              </div>
              <p className="text-xs text-white/50">Delivery usually takes 5-7 business days.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="flex items-center gap-3 p-3 border border-white/5 bg-[#0A0A0A]">
                 <RotateCcw className="w-6 h-6 text-primary" />
                 <span className="text-xs text-white/70 font-medium">7 Days Return Policy</span>
               </div>
               <div className="flex items-center gap-3 p-3 border border-white/5 bg-[#0A0A0A]">
                 <ShieldCheck className="w-6 h-6 text-green-500" />
                 <span className="text-xs text-white/70 font-medium">100% Authentic Quality</span>
               </div>
            </div>

            <div className="w-full h-[1px] bg-white/5 mb-6" />

            {/* Highlights & Details */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-white mb-4">Product Details</h3>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">
                    {product.description || "Premium thrifted and vintage items, curated by our expert stylists. Each piece is rigorously authenticated and quality-checked before shipping to ensure maximum aesthetic appeal and durability."}
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-white/40">Category</span>
                    <span className="text-white font-medium">{product.categories?.name || 'Uncategorized'}</span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-white/40">Condition</span>
                    <span className="text-white font-medium">Excellent (Thrifted)</span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-white/40">Fit</span>
                    <span className="text-white font-medium">Oversized / Standard</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
