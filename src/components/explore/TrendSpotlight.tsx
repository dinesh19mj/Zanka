"use client";

import { motion } from "framer-motion";

export function TrendSpotlight() {
  return (
    <section className="py-32 bg-[#080808] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-primary"></span>
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary">
                  Trend Spotlight
                </span>
              </div>
              
              <h2 className="font-display text-5xl md:text-7xl text-white uppercase tracking-widest leading-none mb-8">
                Y2K <br /> <span className="text-white/20">Revival</span>
              </h2>
              
              <p className="font-body text-sm text-white/50 leading-relaxed mb-10 max-w-md">
                The turn of the millennium called, and it wants its bold aesthetic back. We're embracing the low-rise silhouettes, bold graphics, and statement accessories that defined an era of unapologetic style.
              </p>
              
              <button className="w-fit font-body text-xs tracking-widest uppercase text-white border-b border-primary pb-2 hover:text-primary transition-colors flex items-center gap-3 group">
                Shop The Trend
                <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 border border-primary/30 z-0" />
              <img
                src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?q=80&w=2070&auto=format&fit=crop"
                alt="Y2K Trend Spotlight"
                className="relative z-10 w-full h-full object-cover grayscale border border-white/10"
              />
              
              {/* Floating Element */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 z-20 bg-[#0D0D0D] border border-white/10 p-6 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1542295669297-4d352b042bce?q=80&w=1887&auto=format&fit=crop"
                  alt="Accessory"
                  className="w-32 h-40 object-cover grayscale"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
