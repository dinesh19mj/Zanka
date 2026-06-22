"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  isNew?: boolean;
  isSale?: boolean;
  isThriftPick?: boolean;
  isLimited?: boolean;
  rating: number;
  reviews: number;
  colors?: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  const isLiked = mounted ? isInWishlist(product.id) : false;

  return (
    <div className="group relative flex flex-col w-full bg-surface border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(232,93,117,0.15)]">
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-card border-b border-border">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="secondary" className="bg-white text-black hover:bg-gray-100 rounded-sm rounded-tl-none font-bold tracking-wider text-[10px] px-2 py-1 uppercase">
              New
            </Badge>
          )}
          {product.isSale && (
            <Badge variant="destructive" className="bg-orange text-white hover:bg-orange/90 rounded-sm rounded-tl-none font-bold tracking-wider text-[10px] px-2 py-1 uppercase border-none">
              Sale
            </Badge>
          )}
          {product.isThriftPick && (
            <Badge variant="default" className="bg-green text-white hover:bg-green/90 rounded-sm rounded-tl-none font-bold tracking-wider text-[10px] px-2 py-1 uppercase border-none">
              Thrift Pick
            </Badge>
          )}
          {product.isLimited && (
            <Badge variant="secondary" className="bg-gold text-[#111111] hover:bg-gold/90 rounded-sm rounded-tl-none font-bold tracking-wider text-[10px] px-2 py-1 uppercase border-none">
              Limited
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          aria-label="Add to Wishlist"
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-surface/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${isLiked ? 'text-primary' : 'text-muted hover:text-primary'}`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-primary' : ''}`} />
        </button>

        {/* Images */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100"
        />

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent flex justify-center z-20">
          <button 
            onClick={handleQuickAdd}
            className="w-full bg-primary text-white py-3 px-4 font-bold text-xs tracking-widest uppercase hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-current" : "text-muted opacity-50"}`} />
            ))}
          </div>
          <span className="text-xs text-muted">({product.reviews})</span>
        </div>

        <Link href={`/product/${product.id}`} className="font-heading font-semibold text-base hover:text-primary transition-colors line-clamp-1 text-foreground">
          {product.name}
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-primary">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="text-[#777777] text-xs line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Color variants */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 mt-1">
            {product.colors.map((color, idx) => (
              <div 
                key={idx} 
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
