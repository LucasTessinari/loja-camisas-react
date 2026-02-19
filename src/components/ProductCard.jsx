import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  // Garante que images é sempre um array válido
  const images = product.images && product.images.length > 0 ? product.images : ['https://via.placeholder.com/300x400?text=Sem+Imagem'];

  const nextImage = (e) => {
    e.preventDefault(); 
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    // Como você já adiciona a camisa, mantemos o tamanho 'G' como default ou a lógica que você já tinha
    addItem(product, 'G', { name: '', number: '' });
  };

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/product/${product._id}`} // ID DO MONGO
        className="absolute inset-0 z-10"
        aria-label={`Ver detalhes de ${product.name}`}
      />

      {/* Imagem (Mantive fundo cinza claro para destacar a camisa) */}
      <div className="relative h-64 bg-gray-50 overflow-hidden shrink-0">
        {images.map((img, index) => (
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
        {images.length > 1 && isHovered && (
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
          <span className="absolute top-2 left-2 bg-yellow-400 text-brand-dark text-[10px] font-black uppercase px-2 py-1 rounded shadow-sm z-10">
            Lançamento
          </span>
        )}
      </div>

      {/* Informações (Fundo Branco, Texto Escuro) */}
      <div className="p-4 bg-white relative flex flex-col flex-grow">
        {/* Caso team não exista no banco, mostramos a liga ou categoria */}
        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider font-bold">
          {product.team || product.league || 'Camisa'}
        </p>
        
        {/* min-h garante que sempre cabem 2 linhas sem quebrar o layout */}
        <h3 className="text-gray-800 font-medium text-base mb-2 line-clamp-2 min-h-[2.5rem] leading-tight group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {/* Usa o preço antigo dinâmico se existir no banco */}
            {product.oldPrice ? (
              <span className="text-gray-400 text-xs line-through">
                {formatPrice(product.oldPrice)}
              </span>
            ) : (
               <span className="h-4"></span> // Mantém o espaço se não tiver oldPrice
            )}
             <span className="text-brand-primary font-bold text-xl">
               {formatPrice(product.price)}
             </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="bg-yellow-400/20 text-yellow-600 p-2 rounded-full hover:bg-yellow-400 hover:text-white transition-colors relative z-20"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
