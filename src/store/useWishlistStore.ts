import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/components/shared/ProductCard';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        if (!currentItems.find((item) => item.id === product.id)) {
          set({ items: [...currentItems, product] });
        }
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      isInWishlist: (id) => get().items.some((item) => item.id === id),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'zanka-wishlist-storage',
    }
  )
);
