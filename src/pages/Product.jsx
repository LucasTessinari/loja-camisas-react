import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingCart, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  
  // Estados do formulário
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [customization, setCustomization] = useState({ name: '', number: '' });

  const sizes = ['P', 'M', 'G', 'GG', 'XG'];

  useEffect(() => {
    // Converte o ID da URL para número
    const productId = Number(id);
    const found = products.find(p => p.id === productId);

    if (found) {
      setProduct(found);
    }
    setLoading(false);
  }, [id]);

  // --- RENDERS DE CARREGAMENTO E ERRO ---

  if (loading) {
    return <div className="text-gray-600 text-center mt-20 text-xl font-bold">Carregando informações...</div>;
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-gray-800 text-2xl mb-4 font-bold">Produto não encontrado :/</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-brand-primary underline hover:text-brand-primary/80"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  // 3. Produto Carregado (Renderização Normal - TEMA CLARO)
  return (
    <div className="animate-fade-in pb-20 pt-8 container mx-auto px-4">
      {/* Botão Voltar */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-gray-500 hover:text-brand-primary transition-colors font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para a loja
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100">
        
        {/* COLUNA DA ESQUERDA: Galeria */}
        <div className="space-y-4">
          {/* Imagem Principal */}
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 relative group">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[mainImage]} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">Sem imagem</div>
            )}
            
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-secondary text-brand-dark font-black text-xs uppercase px-3 py-1 rounded shadow-sm">
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
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all bg-gray-50 ${
                  mainImage === idx ? 'border-brand-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover mix-blend-multiply" />
              </button>
            ))}
          </div>
        </div>

        {/* COLUNA DA DIREITA: Detalhes */}
        <div className="space-y-8">
          <div>
            <h2 className="text-brand-primary font-bold text-sm tracking-widest uppercase mb-2">{product.team}</h2>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-bold text-brand-primary">{formatPrice(product.price)}</span>
               <span className="text-sm text-gray-500 font-medium">em até 3x sem juros</span>
            </div>
          </div>

          {/* Seletor de Tamanho */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 font-bold">Escolha o Tamanho</span>
              <button className="text-brand-primary text-xs underline font-medium hover:text-brand-primary/80">Guia de medidas</button>
            </div>
            <div className="flex gap-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded border font-bold transition-all shadow-sm ${
                    selectedSize === size 
                      ? 'bg-brand-primary border-brand-primary text-white scale-110 shadow-md' 
                      : 'border-gray-300 text-gray-600 hover:border-brand-primary hover:text-brand-primary bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-red-500 font-medium mt-2">* Selecione um tamanho</p>}
          </div>

          {/* Personalização */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={20} className="text-brand-primary" />
              <h3 className="text-gray-800 font-bold">Personalização Oficial</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-xs text-gray-600 font-bold mb-1">Nome (+R$ 15,00)</label>
                <input 
                  type="text" 
                  placeholder="Ex: RONALDO"
                  maxLength={12}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-gray-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none uppercase transition-shadow"
                  value={customization.name}
                  onChange={(e) => setCustomization({...customization, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 font-bold mb-1">Número</label>
                <input 
                  type="number" 
                  placeholder="10"
                  maxLength={2}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-gray-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none text-center transition-shadow"
                  value={customization.number}
                  onChange={(e) => setCustomization({...customization, number: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Botão de Compra */}
          <div className="pt-6 border-t border-gray-100">
            <Button 
              variant="primary" 
              className="w-full flex justify-center items-center gap-2 text-lg py-4 font-bold shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all hover:-translate-y-1"
              disabled={!selectedSize} 
              onClick={() => {
                addItem(product, selectedSize, customization);
                alert("Produto adicionado ao carrinho!"); 
              }}
            >
              <ShoppingCart size={24} />
              Adicionar ao Carrinho
            </Button>
            <p className="text-center text-gray-500 text-xs mt-4 flex items-center justify-center gap-1 font-medium">
              <Check size={14} className="text-green-500"/>
              Estoque disponível. Envio imediato.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
