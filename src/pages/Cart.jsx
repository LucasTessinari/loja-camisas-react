import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Pega tudo do nosso Contexto
  const { cartItems, removeItem, updateQuantity, cartTotal, totalItems } = useCart();

  // Se o carrinho estiver vazio, mostra mensagem amigável
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="bg-brand-light p-6 rounded-full mb-6 border border-gray-700">
          <ShoppingBag size={64} className="text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-400 mb-8">Parece que você ainda não escolheu seu manto sagrado.</p>
        <Link to="/">
          <Button variant="primary">Voltar para a Loja</Button>
        </Link>
      </div>
    );
  }

  // Se tiver itens, mostra a lista e o resumo
  return (
    <div className="animate-fade-in pb-20">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
        Meu Carrinho <span className="text-base font-normal text-gray-500">({totalItems} itens)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* ESQUERDA: LISTA DE PRODUTOS */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="bg-brand-light p-4 rounded-lg flex gap-4 border border-brand-light/50 transition-all hover:border-gray-600">
              
              {/* Imagem do Produto */}
              <div className="w-24 h-24 bg-gray-800 rounded-md overflow-hidden flex-shrink-0 border border-gray-700">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Informações e Controles */}
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-400">Tamanho: <span className="text-white font-bold">{item.size}</span></p>
                    
                    {/* Mostra personalização se existir */}
                    {(item.customization.name || item.customization.number) && (
                      <div className="text-xs text-brand-primary mt-1 bg-brand-primary/10 px-2 py-1 rounded inline-block border border-brand-primary/20">
                        {item.customization.name} {item.customization.number}
                      </div>
                    )}
                  </div>
                  
                  {/* Preço Unitário */}
                  <div className="text-white font-bold text-lg">
                    {formatPrice(item.price)}
                  </div>
                </div>

                {/* Área de Ações (Qtd e Remover) */}
                <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center bg-brand-dark rounded-lg border border-gray-700">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="p-2 text-gray-400 hover:text-white disabled:opacity-30 hover:bg-gray-700 rounded-l-lg transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-white text-sm font-bold min-w-[30px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-r-lg transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition-colors hover:underline"
                  >
                    <Trash2 size={16} /> Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DIREITA: RESUMO DO PEDIDO */}
        <div className="h-fit space-y-4">
          <div className="bg-brand-light p-6 rounded-lg border border-gray-800 sticky top-24 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Frete</span>
                <span className="text-brand-primary font-bold">Grátis</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between text-white text-xl font-bold">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">em até 10x sem juros</p>
            </div>

            {/* Link para o Checkout */}
            <Link to="/checkout" className="block">
              <Button variant="primary" className="w-full flex justify-center items-center gap-2 py-4 text-lg font-bold shadow-lg shadow-brand-primary/20">
                Finalizar Compra <ArrowRight size={20} />
              </Button>
            </Link>
            
            <div className="mt-6 flex justify-center gap-3 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholders de bandeiras de cartão (visual) */}
               <div className="w-10 h-6 bg-gray-600 rounded"></div>
               <div className="w-10 h-6 bg-gray-600 rounded"></div>
               <div className="w-10 h-6 bg-gray-600 rounded"></div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-2">Compra 100% Segura</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
