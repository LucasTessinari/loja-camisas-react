import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carrega favoritos do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('netfut_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Salva no localStorage sempre que muda
  useEffect(() => {
    localStorage.setItem('netfut_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (product) => {
    const exists = favorites.some(fav => fav.id === product.id);
    if (!exists) {
      setFavorites(prev => [...prev, product]);
    }
  };

  const removeFavorite = (productId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== productId));
  };

  const toggleFavorite = (product) => {
    const exists = favorites.some(fav => fav.id === product.id);
    if (exists) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const value = {
    favorites,
    favoritesCount: favorites.length,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite: (productId) => favorites.some(fav => fav.id === product.id)
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
