"use client";

import { motion } from "framer-motion";

export function ExploreHero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512413914595-5858022a1011?q=80&w=2070&auto=format&fit=crop"
          alt="Editorial Lookbook"
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-[#080808]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-6"
        >
          Curated Editorial
        </motion.span>
        
        <div className="relative overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-display text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.8] tracking-widest text-white uppercase text-center"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.1)",
              color: "transparent",
            }}
          >
            THE EDIT
          </motion.h1>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="absolute top-0 left-0 font-display text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.8] tracking-widest text-white uppercase text-center w-full"
            style={{
              clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)",
            }}
          >
            THE EDIT
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-body text-xs tracking-widest uppercase text-white/50 mt-8 max-w-lg mx-auto"
        >
          Discover how we style the season's boldest thrifted pieces.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 w-full h-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
