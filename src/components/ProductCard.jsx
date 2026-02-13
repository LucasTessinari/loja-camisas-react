import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // <--- Usamos Link agora

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Navegação do carrossel (Previne abrir a página do produto)
  const nextImage = (e) => {
    e.preventDefault(); 
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  // Botão de adicionar ao carrinho (Previne abrir a página do produto)
  const handleAddToCart = (e) => {
    e.preventDefault();
    alert("Adicionado ao carrinho (Lógica virá na fase 6)");
  };

  return (
    <div 
      className="group bg-brand-light rounded-lg overflow-hidden border border-transparent hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. O LINK MESTRE (Cobre tudo, Z-Index 10) */}
      <Link 
        to={`/product/${product.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver detalhes de ${product.name}`}
      />

      {/* 2. Área da Imagem (Fica visualmente embaixo do Link) */}
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

        {/* 3. Botões do Carrossel (Z-Index 20 - Ficam ACIMA do Link) */}
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

        {/* Tag Lançamento (Visual apenas, fica embaixo do Link) */}
        {product.isNew && !isHovered && (
          <span className="absolute top-2 left-2 bg-brand-primary text-brand-dark text-xs font-bold px-2 py-1 rounded">
            LANÇAMENTO
          </span>
        )}
      </div>

      {/* 4. Informações (Texto embaixo do Link, Botão em cima) */}
      <div className="p-4 bg-brand-light relative">
        <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">{product.team}</p>
        <h3 className="text-brand-white font-bold text-lg mb-2 truncate">{product.name}</h3>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-brand-primary font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          
          {/* Botão Carrinho (Z-Index 20 - Fica ACIMA do Link) */}
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
