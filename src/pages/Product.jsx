import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingCart, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { useState, useEffect } from 'react';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estados do formulário
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [customization, setCustomization] = useState({ name: '', number: '' });

  const sizes = ['P', 'M', 'G', 'GG', 'XG'];

  useEffect(() => {
    console.log("--> Buscando produto com ID:", id);
    
    // Converte o ID da URL para número (pois no arquivo js é número)
    const productId = Number(id);
    const found = products.find(p => p.id === productId);

    if (found) {
      console.log("--> Produto ENCONTRADO:", found.name);
      setProduct(found);
    } else {
      console.error("--> Produto NÃO encontrado para o ID:", productId);
    }
    setLoading(false);
  }, [id]);

  // --- RENDERS DE CARREGAMENTO E ERRO ---

  // 1. Carregando
  if (loading) {
    return <div className="text-white text-center mt-20 text-xl">Carregando informações...</div>;
  }

  // 2. Não encontrado (Erro 404)
  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-white text-2xl mb-4">Produto não encontrado :/</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-brand-primary underline hover:text-white"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  // 3. Produto Carregado (Renderização Normal)
  return (
    <div className="animate-fade-in pb-20">
      {/* Botão Voltar */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-gray-400 hover:text-brand-primary transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para a loja
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* COLUNA DA ESQUERDA: Galeria */}
        <div className="space-y-4">
          {/* Imagem Principal */}
          <div className="aspect-square bg-brand-light rounded-xl overflow-hidden border border-brand-light/50 relative group">
            {/* Proteção extra: só renderiza img se o array existir */}
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[mainImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">Sem imagem</div>
            )}
            
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-primary text-brand-dark font-bold px-3 py-1 rounded">
                LANÇAMENTO
              </span>
            )}
          </div>

          {/* Miniaturas */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images && product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                  mainImage === idx ? 'border-brand-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* COLUNA DA DIREITA: Detalhes */}
        <div className="space-y-8">
          <div>
            <h2 className="text-brand-primary font-bold text-sm tracking-widest uppercase mb-2">{product.team}</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-3xl text-brand-white font-light">
              {formatPrice(product.price)}
              <span className="text-sm text-gray-500 ml-2 font-normal">em até 3x sem juros</span>
            </p>
          </div>

          {/* Seletor de Tamanho */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300 font-medium">Escolha o Tamanho</span>
              <button className="text-brand-primary text-xs underline">Guia de medidas</button>
            </div>
            <div className="flex gap-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded border font-bold transition-all ${
                    selectedSize === size 
                      ? 'bg-brand-primary border-brand-primary text-brand-dark scale-110' 
                      : 'border-gray-600 text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-red-400 mt-2">* Selecione um tamanho</p>}
          </div>

          {/* Personalização */}
          <div className="bg-brand-light p-6 rounded-lg border border-gray-800 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={18} className="text-brand-primary" />
              <h3 className="text-white font-bold">Personalização Oficial</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Nome na camisa (+R$ 15,00)</label>
                <input 
                  type="text" 
                  placeholder="Ex: RONALDO"
                  maxLength={12}
                  className="w-full bg-brand-dark border border-gray-700 rounded p-2 text-white focus:border-brand-primary outline-none uppercase"
                  value={customization.name}
                  onChange={(e) => setCustomization({...customization, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Número</label>
                <input 
                  type="number" 
                  placeholder="10"
                  maxLength={2}
                  className="w-full bg-brand-dark border border-gray-700 rounded p-2 text-white focus:border-brand-primary outline-none text-center"
                  value={customization.number}
                  onChange={(e) => setCustomization({...customization, number: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Botão de Compra */}
          <div className="pt-4 border-t border-gray-800">
            <Button 
              variant="primary" 
              className="w-full flex justify-center items-center gap-2 text-lg py-4"
              disabled={!selectedSize} 
              onClick={() => alert('Em breve adicionará ao carrinho!')}
            >
              <ShoppingCart size={24} />
              Adicionar ao Carrinho
            </Button>
            <p className="text-center text-gray-500 text-sm mt-4">
              <Check size={14} className="inline mr-1 text-green-500"/>
              Estoque disponível. Envio imediato.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
