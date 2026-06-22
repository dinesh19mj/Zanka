"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import Link from "next/link";
import { useState, useEffect } from "react";

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  
  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-[70] shadow-2xl flex flex-col border-l border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-2xl">Your Cart</h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={closeCart}
                    className="mt-4 px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-accent transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-border pb-6">
                      <div className="w-24 h-32 bg-muted relative flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-sm leading-tight pr-4">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-xs text-muted-foreground mb-2 flex gap-2">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                        
                        <div className="font-bold mt-auto flex items-end justify-between">
                          <span>₹{item.price.toLocaleString("en-IN")}</span>
                          
                          <div className="flex items-center border border-border">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 bg-background">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">₹{getCartTotal().toLocaleString("en-IN")}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  Shipping, taxes, and discount codes calculated at checkout.
                </p>
                <Link 
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center py-4 bg-accent text-white font-bold text-sm tracking-widest uppercase hover:bg-accent/90 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
