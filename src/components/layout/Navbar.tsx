"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getCartCount = useCartStore((state) => state.getCartCount);
  const toggleCart = useUIStore((state) => state.toggleCart);
  
  // Hydration fix for Zustand
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", href: "/explore" },
    { name: "Vintage", href: "/shop/vintage" },
    { name: "Dresses", href: "/shop/dresses" },
    { name: "Socks", href: "/shop/socks" },
    { name: "Tops", href: "/shop/tops" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-center py-2 text-xs md:text-sm font-medium tracking-wide z-[60] relative">
        ✨ Handpicked thrift finds • Branded pieces
      </div>

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500"
        style={{
          top: isScrolled ? "1rem" : "3.5rem"
        }}
      >
        <header
          className={`transition-all duration-500 rounded-full flex items-center justify-between py-3 px-6 md:px-8 ${
            isScrolled
              ? "bg-[#080808]/85 backdrop-blur-[20px] border border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_1px_15px_rgba(229,33,43,0.15)]"
              : "bg-[#080808]/55 backdrop-blur-[20px] border border-white/10 shadow-none"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50">
            <h1 
              className={`font-heading font-bold tracking-tighter text-foreground transition-opacity duration-300 hover:opacity-80`}
              style={{
                fontSize: '1.6rem',
                letterSpacing: '0.04em',
                WebkitTextStroke: '0.3px rgba(229, 33, 43, 0.5)',
                textShadow: '0 0 10px rgba(229, 33, 43, 0.2)',
              }}
            >
              ZANKA
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs tracking-[0.25em] uppercase font-medium transition-colors hover:text-white relative group ${
                  link.name === "Sale" ? "text-orange" : "text-muted"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-6 z-50">
            <button aria-label="Search" className="text-muted hover:text-white transition-colors">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button aria-label="Wishlist" className="hidden md:block text-muted hover:text-white transition-colors">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button aria-label="Account" className="hidden md:block text-muted hover:text-white transition-colors">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button aria-label="Cart" onClick={toggleCart} className="text-muted hover:text-white transition-colors relative">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              {mounted && getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              aria-label="Toggle Menu"
              className="lg:hidden flex flex-col gap-1.5 p-1 text-muted hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`block h-px w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </header>
      </motion.div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-32 px-6 pb-6 flex flex-col lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-heading font-semibold tracking-tight ${
                    link.name === "Sale" ? "text-orange" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-border pt-6 flex justify-around">
              <button aria-label="Wishlist" className="flex flex-col items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
                <Heart className="w-6 h-6" />
                Wishlist
              </button>
              <button aria-label="Account" className="flex flex-col items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
                <User className="w-6 h-6" />
                Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
