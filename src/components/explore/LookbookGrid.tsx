"use client";

import { motion } from "framer-motion";

const lookbookItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1550614000-4b95d415d311?q=80&w=1964&auto=format&fit=crop",
    title: "Street Grunge",
    items: "3 pieces",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    title: "Midnight Silk",
    items: "Dress + Accessories",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1962&auto=format&fit=crop",
    title: "Avant-Garde",
    items: "Full Look",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
    title: "Urban Minimalist",
    items: "Coat + Trousers",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
];

export function LookbookGrid() {
  return (
    <section className="py-32 bg-[#0D0D0D] border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-body text-[10px] tracking-[0.4em] uppercase font-light text-primary block mb-3">
            Inspiration
          </span>
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-white uppercase">
            The Lookbook
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:gap-6 auto-rows-[300px]">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-[#080808] border border-white/5 ${item.span}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/20 transition-colors duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 backdrop-blur-sm">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
                  {item.items}
                </span>
                <h3 className="font-display text-3xl text-white uppercase tracking-widest mb-6">
                  {item.title}
                </h3>
                <button className="font-body text-xs tracking-widest uppercase text-white border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-colors">
                  Shop Look
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
