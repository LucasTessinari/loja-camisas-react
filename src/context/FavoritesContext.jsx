import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Inicializa o estado lendo do LocalStorage (se existir)
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('@NetFut:favorites');
    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }
    return [];
  });

  // Toda vez que os favoritos mudarem, salva no LocalStorage
  useEffect(() => {
    localStorage.setItem('@NetFut:favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Função para adicionar ou remover (Toggle)
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      // Verifica se o produto já está nos favoritos olhando o ID do Mongo
      const isFavorite = prevFavorites.some(p => p._id === product._id);
      
      if (isFavorite) {
        // Se já tem, remove
        return prevFavorites.filter(p => p._id !== product._id);
      } else {
        // Se não tem, adiciona
        return [...prevFavorites, product];
      }
    });
  };

  // Função auxiliar para saber se um produto específico é favorito
  const isFavorite = (productId) => {
    return favorites.some(p => p._id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
