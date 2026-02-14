import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <--- Importe o hook

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart(); // <--- Pegue a função addItem

  // Navegação do carrossel
  const nextImage = (e) => {
    e.preventDefault(); 
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  // Botão de adicionar ao carrinho DO CARD
  const handleAddToCart = (e) => {
    e.preventDefault(); // Não abre a página do produto
    
    // Adiciona com tamanho padrão "G" (ou abre modal depois)
    // Para simplificar agora, vamos adicionar como "G"
    addItem(product, 'G', { name: '', number: '' });
    
    // Feedback visual simples (depois faremos Toast)
    alert(`Camisa ${product.team} (G) adicionada!`);
  };

  return (
    <div 
      className="group bg-brand-light rounded-lg overflow-hidden border border-transparent hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/product/${product.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver detalhes de ${product.name}`}
      />

      <div className="relative h-64 bg-gray-800 overflow-hidden">
        {product.images.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={product.name} 
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {product.images.length > 1 && isHovered && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-brand-primary hover:text-brand-dark transition-colors z-20"
            >
              <ChevronLeft size={20} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-brand-primary hover:text-brand-dark transition-colors z-20"
            >
              <ChevronRight size={20} />
            </button>
            
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
              {product.images.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImage ? 'w-4 bg-brand-primary' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {product.isNew && !isHovered && (
          <span className="absolute top-2 left-2 bg-brand-primary text-brand-dark text-xs font-bold px-2 py-1 rounded">
            LANÇAMENTO
          </span>
        )}
      </div>

      <div className="p-4 bg-brand-light relative">
        <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">{product.team}</p>
        <h3 className="text-brand-white font-bold text-lg mb-2 truncate">{product.name}</h3>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-brand-primary font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          
          {/* Botão Carrinho CONECTADO AGORA */}
          <button 
            onClick={handleAddToCart}
            className="bg-brand-primary p-2 rounded-full text-brand-dark hover:bg-white transition-colors relative z-20"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
