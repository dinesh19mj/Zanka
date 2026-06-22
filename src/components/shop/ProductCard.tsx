import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price_inr: number;
  image_url?: string;
  tag?: string;
  categories?: { name: string } | null;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className="group relative flex flex-col border border-white/5 bg-white/[0.01] overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#080808]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-body text-[10px] uppercase text-white/20">No Image</span>
          </div>
        )}
        {/* Tag Overlay */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-primary text-white font-body text-[9px] tracking-[0.2em] uppercase px-3 py-1 font-semibold">
              {product.tag}
            </span>
          </div>
        )}
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="font-body text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">
          {product.categories?.name || 'Uncategorized'}
        </p>
        <h3 className="font-body text-sm font-semibold text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="font-body text-sm font-bold text-white">
              ₹{product.price_inr}
            </span>
          </div>
          <div className="font-body text-[10px] tracking-widest uppercase text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <span>View</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
