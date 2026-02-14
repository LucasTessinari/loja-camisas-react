import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { CreditCard, Banknote, MapPin, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  // Se não tiver itens, volta pra home
  if (cartItems.length === 0 && !isSuccess) {
    navigate('/');
    return null;
  }

  const handleFinishOrder = (e) => {
    e.preventDefault();
    // Aqui seria a integração com Backend
    setIsSuccess(true);
    clearCart(); // Limpa o carrinho
    
    // Rola para o topo
    window.scrollTo(0, 0);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="bg-green-500/20 p-6 rounded-full mb-6 text-green-500">
          <CheckCircle size={64} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Pedido Realizado!</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Obrigado por comprar na FutShop. Você receberá um e-mail com os detalhes do rastreamento em breve.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Voltar para a Loja
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <h1 className="text-3xl font-bold text-white mb-8">Finalizar Pedido</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* FORMULÁRIO (Esquerda) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Dados Pessoais e Endereço */}
          <section className="bg-brand-light p-6 rounded-lg border border-brand-light/50">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="text-brand-primary" /> Endereço de Entrega
            </h2>
            
            <form id="checkout-form" onSubmit={handleFinishOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="Nome Completo" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary outline-none" />
              <input required type="email" placeholder="E-mail" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary outline-none" />
              <input required type="text" placeholder="CEP" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full focus:border-brand-primary outline-none" />
              <input required type="text" placeholder="Cidade" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full focus:border-brand-primary outline-none" />
              <input required type="text" placeholder="Endereço (Rua, Av)" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary outline-none" />
              <input required type="text" placeholder="Número" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full focus:border-brand-primary outline-none" />
              <input type="text" placeholder="Complemento" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full focus:border-brand-primary outline-none" />
            </form>
          </section>

          {/* Pagamento */}
          <section className="bg-brand-light p-6 rounded-lg border border-brand-light/50">
             <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Banknote className="text-brand-primary" /> Pagamento
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'card' ? 'border-brand-primary bg-brand-primary/10 text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'
                }`}
              >
                <CreditCard size={24} />
                Cartão de Crédito
              </button>

              <button 
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'pix' ? 'border-brand-primary bg-brand-primary/10 text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'
                }`}
              >
                <span className="font-bold text-xl">PIX</span>
                À vista (10% off)
              </button>
            </div>
            
            {/* Campos do Cartão (Simulação) */}
            {paymentMethod === 'card' && (
              <div className="mt-4 grid grid-cols-2 gap-4 animate-fade-in">
                <input required type="text" placeholder="Número do Cartão" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full col-span-2 outline-none" />
                <input required type="text" placeholder="Nome no Cartão" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full col-span-2 outline-none" />
                <input required type="text" placeholder="Validade (MM/AA)" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full outline-none" />
                <input required type="text" placeholder="CVV" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full outline-none" />
              </div>
            )}

             {/* Aviso PIX */}
             {paymentMethod === 'pix' && (
              <div className="mt-4 p-4 bg-brand-dark rounded text-center text-gray-400 text-sm animate-fade-in">
                O QR Code será gerado na próxima tela após a confirmação.
              </div>
            )}
          </section>

        </div>

        {/* RESUMO (Direita) */}
        <div className="h-fit space-y-4">
          <div className="bg-brand-light p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Resumo da Compra</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto scrollbar-hide">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 text-sm">
                  <img src={item.image} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-grow">
                    <div className="text-white font-bold">{item.quantity}x {item.name}</div>
                    <div className="text-gray-500">{item.size}</div>
                  </div>
                  <div className="text-gray-300">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Frete</span>
                <span className="text-brand-primary">Grátis</span>
              </div>
              <div className="flex justify-between text-white text-xl font-bold pt-2">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* O botão submete o formulário lá da esquerda pelo ID */}
            <Button 
              type="submit" 
              form="checkout-form"
              variant="primary" 
              className="w-full py-4 text-lg font-bold"
            >
              Confirmar Pedido
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
