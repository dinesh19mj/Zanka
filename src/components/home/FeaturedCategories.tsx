import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "../animations/FadeUp";

export function FeaturedCategories() {
  return (
    <section className="py-24 bg-[#0D0D0D] border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <FadeUp>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-body text-[10px] tracking-[0.4em] uppercase font-light text-primary block mb-3">
              Shop By Category
            </span>
            <h2 className="font-display text-3xl md:text-5xl tracking-widest text-white uppercase mb-4">
              Curated Collections
            </h2>
            <p className="font-body text-xs tracking-widest uppercase text-white/40 max-w-xl mx-auto">
              Explore our handpicked selections crafted to make a bold statement.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Category 1 */}
          <FadeUp delay={0.1}>
            <Link href="/shop/vintage" className="group block relative aspect-[4/5] overflow-hidden bg-[#080808] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1542295669297-4d352b042bce?q=80&w=1887&auto=format&fit=crop"
                alt="Vintage Finds"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 mix-blend-overlay grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase font-light text-primary mb-2">
                  Category
                </span>
                <h3 className="font-display text-2xl tracking-widest text-white uppercase mb-2">Vintage</h3>
                <p className="font-body text-xs text-white/50 mb-4 line-clamp-2">Timeless classics rescued for you.</p>
                <span className="inline-flex items-center text-[10px] font-bold text-white gap-2 uppercase tracking-widest group-hover:text-primary transition-colors">
                  Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </FadeUp>

          {/* Category 2 */}
          <FadeUp delay={0.2}>
            <Link href="/shop/dresses" className="group block relative aspect-[4/5] overflow-hidden bg-[#080808] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1515347619152-1f0f353683f1?q=80&w=2080&auto=format&fit=crop"
                alt="Pop Culture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 mix-blend-overlay grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase font-light text-primary mb-2">
                  Category
                </span>
                <h3 className="font-display text-2xl tracking-widest text-white uppercase mb-2">Pop Culture</h3>
                <p className="font-body text-xs text-white/50 mb-4 line-clamp-2">Express yourself loud and clear.</p>
                <span className="inline-flex items-center text-[10px] font-bold text-white gap-2 uppercase tracking-widest group-hover:text-primary transition-colors">
                  Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </FadeUp>
          
          {/* Category 3 */}
          <FadeUp delay={0.3}>
            <Link href="/shop/tops" className="group block relative aspect-[4/5] overflow-hidden bg-[#080808] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1434389678369-182cb1bb3124?q=80&w=2074&auto=format&fit=crop"
                alt="Minimal Essentials"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 mix-blend-overlay grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase font-light text-primary mb-2">
                  Category
                </span>
                <h3 className="font-display text-2xl tracking-widest text-white uppercase mb-2">Minimal</h3>
                <p className="font-body text-xs text-white/50 mb-4 line-clamp-2">Understated pieces for everyday.</p>
                <span className="inline-flex items-center text-[10px] font-bold text-white gap-2 uppercase tracking-widest group-hover:text-primary transition-colors">
                  Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
