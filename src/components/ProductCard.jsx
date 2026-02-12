import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Funções de navegação (Mantivemos igual)
  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div 
      className="group bg-brand-light rounded-lg overflow-hidden border border-transparent hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Área da Imagem */}
      <div className="relative h-64 bg-gray-800 overflow-hidden">
        
        {/* --- MUDANÇA AQUI: Renderizamos TODAS as imagens --- */}
        {product.images.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={`${product.name} - Foto ${index + 1}`} 
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Tag de Novo */}
        {product.isNew && !isHovered && (
          <span className="absolute top-2 left-2 bg-brand-primary text-brand-dark text-xs font-bold px-2 py-1 rounded z-20">
            LANÇAMENTO
          </span>
        )}

        {/* Controles (Setas e Dots) */}
        {product.images.length > 1 && isHovered && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-brand-primary hover:text-brand-dark transition-colors z-30"
            >
              <ChevronLeft size={20} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-brand-primary hover:text-brand-dark transition-colors z-30"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-30">
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
      </div>

      {/* Informações do Produto (Mantido igual) */}
      <div className="p-4 relative z-20 bg-brand-light">
        <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">{product.team}</p>
        <h3 className="text-brand-white font-bold text-lg mb-2 truncate">{product.name}</h3>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-brand-primary font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          
          <button className="bg-brand-primary p-2 rounded-full text-brand-dark hover:bg-white transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
