// src/store/favorites-store.ts
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: {
    name: string;
  };
}

interface FavoritesState {
  favorites: FavoriteItem[];
  addFavorite: (product: FavoriteItem) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  count: number;
  hasHydrated: boolean; // Nuevo campo para controlar la hidratación
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      count: 0,
      hasHydrated: false, // Inicialmente false
      addFavorite: (product) =>
        set((state) => {
          const exists = state.favorites.some((fav) => fav.id === product.id);
          if (!exists) {
            return {
              favorites: [...state.favorites, product],
              count: state.count + 1,
            };
          }
          return state;
        }),
      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== productId),
          count: state.favorites.filter((fav) => fav.id !== productId).length,
        })),
      isFavorite: (productId) =>
        get().favorites.some((fav) => fav.id === productId),
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true; // Marcamos como hidratado
        }
      },
    }
  )
);

// Hook personalizado para esperar la hidratación
export const useFavorites = () => {
  const store = useFavoritesStore();
  const [isHydrated, setIsHydrated] = useState(!store.hasHydrated);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    ...store,
    isHydrated,
  };
};