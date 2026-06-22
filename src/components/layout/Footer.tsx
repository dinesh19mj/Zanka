import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] text-muted pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="font-heading font-bold text-3xl tracking-tighter text-foreground">ZANKA</h2>
            <p className="text-sm max-w-xs">
              Curated Thrift. Endless Style. Premium pop culture socks and vintage dresses designed for the bold.
            </p>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">JOIN THE CLUB (10% OFF)</h3>
              <form className="flex border-b border-muted/30 focus-within:border-primary transition-colors pb-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none outline-none flex-1 text-sm placeholder:text-muted/50 text-foreground"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-foreground">SHOP</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/shop/vintage" className="hover:text-primary transition-colors">Vintage Collection</Link>
              </li>
              <li>
                <Link href="/shop/dresses" className="hover:text-primary transition-colors">Dresses</Link>
              </li>
              <li>
                <Link href="/shop/socks" className="hover:text-primary transition-colors">Pop Culture Socks</Link>
              </li>
              <li>
                <Link href="/shop/tops" className="hover:text-primary transition-colors">Statement Tops</Link>
              </li>
              <li>
                <Link href="/shop/new" className="hover:text-primary transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link href="/shop/sale" className="text-orange hover:text-primary transition-colors">Sale</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-foreground">SUPPORT</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-foreground">ABOUT ZANKA</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/our-story" className="hover:text-primary transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/stockists" className="hover:text-primary transition-colors">Stockists</Link>
              </li>
            </ul>
            
            {/* Social */}
            <div className="pt-4">
              <h3 className="font-semibold text-sm mb-4 text-foreground">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="Instagram" className="text-muted hover:text-primary transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" aria-label="TikTok" className="text-muted hover:text-primary transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="text-muted hover:text-primary transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="text-muted hover:text-primary transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="YouTube" className="text-muted hover:text-primary transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M2.5 7.1A19.5 19.5 0 0 1 12 6c3.5 0 7.1.3 9.5 1.1a2.5 2.5 0 0 1 1.7 1.7A19.5 19.5 0 0 1 24 12a19.5 19.5 0 0 1-.8 3.2 2.5 2.5 0 0 1-1.7 1.7A19.5 19.5 0 0 1 12 18c-3.5 0-7.1-.3-9.5-1.1a2.5 2.5 0 0 1-1.7-1.7A19.5 19.5 0 0 1 0 12a19.5 19.5 0 0 1 .8-3.2 2.5 2.5 0 0 1 1.7-1.7z"/><polygon points="9.8 15.5 15.8 12 9.8 8.5 9.8 15.5"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted/80">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              {/* Payment icons placeholder */}
              <div className="flex gap-2 opacity-70">
                <div className="w-8 h-5 bg-border rounded"></div>
                <div className="w-8 h-5 bg-border rounded"></div>
                <div className="w-8 h-5 bg-border rounded"></div>
                <div className="w-8 h-5 bg-border rounded"></div>
              </div>
            </span>
          </div>
          <p>&copy; {currentYear} Zanka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
