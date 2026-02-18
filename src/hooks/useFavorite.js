import { useFavorites } from '../context/FavoritesContext';

export const useFavorite = (product) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const handleFavorite = () => {
    toggleFavorite(product);
  };
  
  return {
    isFavorite: isFavorite(product.id),
    toggleFavorite: handleFavorite
  };
};
