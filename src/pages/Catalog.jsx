import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Para ler a URL
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Catalog = () => {
  const location = useLocation();
  const [filter, setFilter] = useState('Todos');

  // Categorias disponíveis
  const categories = ['Todos', 'Brasileirão', 'Premier League', 'La Liga', 'Seleções'];

  // Efeito para ler a URL e aplicar filtro automático
  // Ex: Se vier de um link "?category=Brasileirão"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setFilter(categoryParam);
    }
  }, [location]);

  // Filtra os produtos
  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.league === filter || p.team === filter);

  return (
    <div className="animate-fade-in pb-20">
      
      {/* Cabeçalho do Catálogo */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">
          Catálogo <span className="text-brand-primary">/ {filter}</span>
        </h1>
        
        {/* Filtros Mobile/Desktop */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-brand-primary text-brand-dark' 
                  : 'bg-brand-light text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Produtos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">Nenhuma camisa encontrada nessa categoria.</p>
          <button onClick={() => setFilter('Todos')} className="text-brand-primary mt-4 hover:underline">
            Ver todas as camisas
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;