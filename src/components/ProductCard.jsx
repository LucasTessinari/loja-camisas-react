import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const nextImage = (e) => {
    e.preventDefault(); 
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    addItem(product, 'G', { name: '', number: '' });
    // alert(`Camisa ${product.team} adicionada!`); // Opcional
  };

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/product/${product.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver detalhes de ${product.name}`}
      />

      {/* Imagem (Mantive fundo cinza claro para destacar a camisa) */}
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        {product.images.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={product.name} 
            className={`absolute top-0 left-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-500 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Setas de Navegação */}
        {product.images.length > 1 && isHovered && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-1 rounded-full hover:bg-brand-primary hover:text-white transition-colors z-20 shadow"
            >
              <ChevronLeft size={20} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-1 rounded-full hover:bg-brand-primary hover:text-white transition-colors z-20 shadow"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Tag Lançamento */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-brand-secondary text-brand-dark text-[10px] font-black uppercase px-2 py-1 rounded shadow-sm">
            Lançamento
          </span>
        )}
      </div>

      {/* Informações (Fundo Branco, Texto Escuro) */}
      <div className="p-4 bg-white relative">
        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider font-bold">{product.team}</p>
        <h3 className="text-gray-800 font-medium text-base mb-2 truncate leading-tight group-hover:text-brand-primary transition-colors">{product.name}</h3>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
             <span className="text-gray-400 text-xs line-through">R$ 399,90</span>
             <span className="text-brand-primary font-bold text-xl">
               {formatPrice(product.price)}
             </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="bg-brand-primary/10 text-brand-primary p-2 rounded-full hover:bg-brand-primary hover:text-white transition-colors relative z-20"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
