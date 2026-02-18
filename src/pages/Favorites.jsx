import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sua lista está vazia</h2>
        <p className="text-gray-500 mb-8">Adicione camisas aos favoritos para vê-las aqui.</p>
        <Link 
          to="/catalog" 
          className="bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-dark transition-colors inline-flex items-center gap-2"
        >
          <ShoppingCart size={20} />
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Meus Favoritos</h1>
          <p className="text-gray-600">{favorites.length} item{favorites.length !== 1 ? 's' : ''}</p>
        </div>
        {favorites.length > 0 && (
          <button 
            onClick={() => favorites.forEach(fav => removeFavorite(fav.id))}
            className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1 text-sm"
          >
            <Trash2 size={16} />
            Limpar Tudo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden group">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.img || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </Link>
              
              {/* Botão Favoritar (Já está favoritado) */}
              <button
                onClick={() => removeFavorite(product.id)}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all group-hover:scale-110 z-20"
              >
                <Heart size={20} className="text-red-500 fill-current" />
              </button>
            </div>

            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 mb-2 hover:text-brand-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-black text-brand-primary">
                  R$ {product.price?.toFixed(2).replace('.', ',') || 'Consultar'}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-md text-sm transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={16} />
                  Carrinho
                </button>
                
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Remover dos favoritos"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
