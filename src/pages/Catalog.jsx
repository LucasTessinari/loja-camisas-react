import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';

// IMPORTA O HOOK DO BANCO
import { useProducts } from '../hooks/useProducts'; 

const Catalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Todos');

  // CHAMA O HOOK
  const { products: dbProducts, loading } = useProducts();

  // USEMEMO EVITA LOOP INFINITO NO USEEFFECT
  const CATEGORY_GROUPS = useMemo(() => ({
    'Todos': [], 
    'Brasileirão': ['Brasileirão', 'Brasileiro'],
    'Europeus': ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League', 'Europeus'],
    'Seleções': ['Seleções', 'Copa do Mundo', 'Copa América', 'Eurocopa'],
    'Retrô': ['Retrô', 'Clássicos', 'Retro'],
    'Lançamento': ['Lançamento', 'Nova'],
  }), []);

  const filterButtons = Object.keys(CATEGORY_GROUPS);

  // LÊ A URL APENAS QUANDO ELA MUDA
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      if (CATEGORY_GROUPS[categoryParam] || categoryParam === 'Todos') {
        setActiveFilter(categoryParam);
      } else {
         setActiveFilter(categoryParam);
      }
    } else {
      setActiveFilter('Todos');
    }
  }, [location.search, CATEGORY_GROUPS]);

  // FUNÇÃO DE FILTRAGEM REFINADA
  const getFilteredProducts = () => {
    if (!dbProducts) return [];
    if (activeFilter === 'Todos') return dbProducts;

    const groupLagues = CATEGORY_GROUPS[activeFilter];
    
    if (groupLagues && activeFilter !== 'Lançamento') {
      return dbProducts.filter(p => {
        // Tira possíveis espaços/enters que vieram sujos do banco
        const safeLeague = p.league ? p.league.trim() : "";
        const safeCategory = p.category ? p.category.trim() : "";

        return (
          groupLagues.includes(safeLeague) || 
          groupLagues.includes(safeCategory) || // <-- O City Retrô é pego aqui
          safeLeague === activeFilter ||
          safeCategory === activeFilter
        );
      });
    }
    
    if (activeFilter === 'Lançamento') {
        return dbProducts.filter(p => p.isNew === true);
    }

    return dbProducts.filter(p => {
      const safeLeague = p.league ? p.league.trim() : "";
      const safeTeam = p.team ? p.team.trim() : "";
      const safeCategory = p.category ? p.category.trim() : "";

      return (
        safeLeague === activeFilter || 
        safeTeam === activeFilter || 
        safeCategory === activeFilter
      );
    });
  };

  const filteredProducts = getFilteredProducts();

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
    navigate(`/catalog?category=${encodeURIComponent(newFilter)}`, { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 font-bold animate-pulse text-lg">Carregando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      
      {/* Cabeçalho do Catálogo */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 mt-4">
        <h1 className="text-3xl font-black text-gray-800 italic uppercase tracking-tighter">
          Catálogo <span className="text-brand-primary">/ {activeFilter}</span>
        </h1>
        
        {/* Filtros Mobile/Desktop */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
          {filterButtons.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all uppercase tracking-wide border ${
                activeFilter === cat 
                  ? 'bg-brand-primary text-white border-brand-primary shadow-md transform scale-105' 
                  : 'bg-white text-gray-500 hover:text-brand-primary hover:border-brand-primary border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Produtos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Filter size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-xl font-medium">Nenhuma camisa encontrada em "{activeFilter}".</p>
          <p className="text-gray-400 text-sm mb-6">Tente outra categoria ou limpe os filtros.</p>
          <button 
            onClick={() => handleFilterChange('Todos')} 
            className="bg-brand-primary text-white px-6 py-2 rounded-full font-bold hover:bg-brand-dark transition-colors"
          >
            Ver todas as camisas
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;
