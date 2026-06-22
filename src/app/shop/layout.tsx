import Link from 'next/link';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-white/40 mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
