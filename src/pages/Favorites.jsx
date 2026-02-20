import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HeartCrack } from "lucide-react"; 
import ProductCard from "../components/ProductCard"; // Ajuste o caminho se necessário
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites } = useFavorites();

  // Rola para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4">
        
        {/* Título da Página */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 italic uppercase border-l-4 border-brand-primary pl-3">
            Meus Favoritos
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            {favorites.length} {favorites.length === 1 ? "manto salvo" : "mantos salvos"}
          </p>
        </div>

        {/* Renderização Condicional: Vazio ou Com Produtos */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <HeartCrack size={64} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-black text-gray-700 mb-2 uppercase italic">Sua lista está vazia</h2>
            <p className="text-gray-500 text-center max-w-md mb-8 text-sm">
              Você ainda não adicionou nenhum manto aos seus favoritos. Navegue pela nossa loja e clique no coração para salvar os que você mais curtir!
            </p>
            <Link
              to="/catalog"
              className="bg-brand-primary hover:bg-yellow-500 text-[#FFFFFF] font-black py-3 px-8 rounded-lg uppercase tracking-wider transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Explorar Camisas
            </Link>
          </div>
        ) : (
          /* Grid de Produtos Favoritos */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 animate-fade-in">
            {favorites.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Favorites;
