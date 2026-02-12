import Button from '../components/Button';
import ProductCard from '../components/ProductCard'; // <--- Importamos o Card
import { products } from '../data/products'; // <--- Importamos os dados

const Home = () => {
  // Vamos pegar apenas os 4 primeiros produtos para a Home
  const featuredProducts = products.slice(0, 4); 

  return (
    <div className="space-y-12">
      {/* Hero Section (Mantivemos igual) */}
      <section className="py-12 md:py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-brand-white mb-6 leading-tight">
            Vista a Paixão.<br />
            <span className="text-brand-primary">Sinta o Jogo.</span>
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            As camisas oficiais dos maiores times do mundo, com qualidade de jogador e personalização exclusiva.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">Ver Coleção 2026</Button>
            <Button variant="outline">Personalizar</Button>
          </div>
        </div>
      </section>

      {/* Seção Destaques (Atualizada) */}
      <section>
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-brand-white">Destaques da Semana</h2>
            <a href="/catalog" className="text-brand-primary hover:underline text-sm">Ver tudo &rarr;</a>
        </div>
        
        {/* O Grid Mágico do Tailwind */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
