// src/store/cart-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';

interface CartItem {
  id: string; // ID del item en el carrito
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    stock: number;
  };
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  count: number; // Total de items en el carrito
  subtotal: number;
  hasHydrated: boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      count: 0,
      subtotal: 0,
      hasHydrated: false,
      addItem: (product, quantity = 1) => set((state) => {
        const existingItem = state.items.find(item => item.productId === product.id);
        
        if (existingItem) {
          // Actualizar cantidad si el producto ya está en el carrito
          const newQuantity = existingItem.quantity + quantity;
          return {
            items: state.items.map(item => 
              item.productId === product.id 
                ? { ...item, quantity: newQuantity } 
                : item
            ),
            count: state.count + quantity,
            subtotal: state.subtotal + (product.price * quantity)
          };
        } else {
          // Añadir nuevo item al carrito
          const newItem: CartItem = {
            id: Date.now().toString(),
            productId: product.id,
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              stock: product.stock
            },
            quantity,
            price: product.price
          };
          return {
            items: [...state.items, newItem],
            count: state.count + quantity,
            subtotal: state.subtotal + (product.price * quantity)
          };
        }
      }),
      removeItem: (itemId) => set((state) => {
        const itemToRemove = state.items.find(item => item.id === itemId);
        if (!itemToRemove) return state;
        
        return {
          items: state.items.filter(item => item.id !== itemId),
          count: state.count - itemToRemove.quantity,
          subtotal: state.subtotal - (itemToRemove.price * itemToRemove.quantity)
        };
      }),
      updateQuantity: (itemId, quantity) => set((state) => {
        const itemToUpdate = state.items.find(item => item.id === itemId);
        if (!itemToUpdate || quantity < 1 || quantity > itemToUpdate.product.stock) return state;
        
        const quantityDiff = quantity - itemToUpdate.quantity;
        
        return {
          items: state.items.map(item => 
            item.id === itemId 
              ? { ...item, quantity } 
              : item
          ),
          count: state.count + quantityDiff,
          subtotal: state.subtotal + (itemToUpdate.price * quantityDiff)
        };
      }),
      clearCart: () => set({ items: [], count: 0, subtotal: 0 }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

// Hook personalizado para el carrito
export const useCart = () => {
  const store = useCartStore();
  const [isHydrated, setIsHydrated] = useState(!store.hasHydrated);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    ...store,
    isHydrated,
  };
};