import { FadeUp } from "../animations/FadeUp";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="py-24 bg-black text-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden border-border/20 border p-4">
              <div className="w-full h-full relative overflow-hidden bg-white/5">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                  alt="Zanka Lifestyle"
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
              </div>
            </div>
          </FadeUp>

          <div className="flex flex-col justify-center space-y-8">
            <FadeUp delay={0.2}>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                Not Just Fashion. <br/>
                <span className="text-accent">An Identity.</span>
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <div className="space-y-4 text-white/70 text-lg">
                <p>
                  Zanka was born out of a desire to break the mold. We believe what you wear should be a direct extension of who you are. No boring basics, no fading into the background.
                </p>
                <p>
                  Our pop culture socks and statement tops are meticulously designed to spark conversations, turn heads, and feel unapologetically premium.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10">
                <div>
                  <h4 className="font-heading font-bold text-3xl text-accent mb-1">100%</h4>
                  <p className="text-sm text-white/60 uppercase tracking-widest font-semibold">Premium Cotton</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-3xl text-accent mb-1">Zero</h4>
                  <p className="text-sm text-white/60 uppercase tracking-widest font-semibold">Compromises</p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.5}>
              <Link 
                href="/our-story"
                className="group inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors gap-2"
              >
                Read Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
