import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// ... (seus outros imports: ícones, carrinho, etc) ...

const ProductDetail = () => {
  const { id } = useParams(); // Pega o _id da URL
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0); // Controle de qual imagem exibir
  
  // Busca o produto pelo ID no backend
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Produto não encontrado');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) return <div className="p-20 text-center text-xl">Carregando...</div>;
  if (!product) return <div className="p-20 text-center text-xl">Produto não encontrado.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* LADO ESQUERDO: IMAGENS */}
        <div className="flex flex-col gap-4">
          {/* Imagem Principal */}
          <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border">
            <img 
              src={product.images?.[mainImage]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Miniaturas (Thumbnails) */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images?.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setMainImage(idx)}
                className={`w-20 h-24 shrink-0 rounded border-2 overflow-hidden ${mainImage === idx ? 'border-brand-primary' : 'border-transparent'}`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* LADO DIREITO: INFORMAÇÕES */}
        <div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-6">{product.league}</p>

          <div className="mb-6">
            {product.oldPrice && (
              <span className="text-gray-400 line-through mr-3">
                R$ {product.oldPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-3xl font-black text-brand-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* ... AQUI VAI O RESTO DA SUA PÁGINA (Botão Comprar, Seleção de Tamanho, Descrição, etc) ... */}
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
