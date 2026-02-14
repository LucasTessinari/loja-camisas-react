import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { CreditCard, Banknote, MapPin, CheckCircle, ShieldCheck, Truck } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const PHONE_NUMBER = '5527999674761';

  if (cartItems.length === 0 && !isSuccess) {
    navigate('/');
    return null;
  }

  const handleFinishOrder = (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Captura os dados do formulário
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // 2. Monta a mensagem do WhatsApp
    let message = `*NOVO PEDIDO - FUTSHOP* ⚽\n\n`;
    
    message += `*👤 Cliente:* ${data.name}\n`;
    message += `*📍 Endereço:* ${data.address}, ${data.number} - ${data.city}\n`;
    message += `*💳 Pagamento:* ${paymentMethod === 'pix' ? 'PIX (10% OFF)' : 'Cartão de Crédito'}\n\n`;
    
    message += `*🛒 ITENS DO PEDIDO:*\n`;
    cartItems.forEach(item => {
      message += `▪ ${item.quantity}x ${item.name} (${item.size})\n`;
      if(item.customization.name) {
         message += `   _Pers: ${item.customization.name} ${item.customization.number}_\n`;
      }
    });

    const finalTotal = paymentMethod === 'pix' ? cartTotal * 0.9 : cartTotal;
    message += `\n*💰 TOTAL:* ${formatPrice(finalTotal)}\n`;
    message += `------------------------------\n`;
    message += `Aguardo a confirmação!`;

    // 3. Cria o link e abre
    const link = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Simula processamento visual
    setTimeout(() => {
      window.open(link, '_blank'); // Abre o Zap numa nova aba
      setLoading(false);
      setIsSuccess(true);
      clearCart();
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in min-h-[60vh]">
        <div className="bg-green-500/10 p-6 rounded-full mb-6 text-green-500 animate-bounce">
          <CheckCircle size={80} />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Pedido Enviado!</h2>
        <p className="text-gray-400 mb-8 max-w-md text-lg">
          Você será redirecionado para o WhatsApp para finalizar o pagamento com nosso atendente.
        </p>
        <Button variant="primary" onClick={() => navigate('/')} className="w-full max-w-xs py-4">
          Voltar para a Loja
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        Finalizar no WhatsApp <ShieldCheck className="text-green-500" />
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* ESQUERDA */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-brand-light p-6 rounded-lg border border-brand-light/50">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MapPin className="text-brand-primary" /> Endereço de Entrega
            </h2>
            
            <form id="checkout-form" onSubmit={handleFinishOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required name="name" type="text" placeholder="Nome Completo" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary outline-none" />
              <input required name="email" type="email" placeholder="E-mail" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary outline-none" />
              <input required name="cep" type="text" placeholder="CEP" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full focus:border-brand-primary outline-none" />
              <input required name="city" type="text" placeholder="Cidade / UF" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full focus:border-brand-primary outline-none" />
              <input required name="address" type="text" placeholder="Endereço (Rua, Av)" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary outline-none" />
              <input required name="number" type="text" placeholder="Número" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full focus:border-brand-primary outline-none" />
              <input name="complement" type="text" placeholder="Complemento (Opcional)" className="bg-brand-dark border border-gray-700 rounded p-3 text-white w-full focus:border-brand-primary outline-none" />
            </form>
          </section>

          <section className="bg-brand-light p-6 rounded-lg border border-brand-light/50">
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Banknote className="text-brand-primary" /> Forma de Pagamento
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-brand-primary bg-brand-primary/10 text-white shadow-[0_0_15px_rgba(102,252,241,0.1)]' 
                    : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:bg-gray-800'
                }`}
              >
                <CreditCard size={28} />
                <span className="font-bold">Cartão de Crédito</span>
              </button>

              <button 
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'pix' 
                    ? 'border-brand-primary bg-brand-primary/10 text-white shadow-[0_0_15px_rgba(102,252,241,0.1)]' 
                    : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:bg-gray-800'
                }`}
              >
                <span className="font-bold text-2xl">PIX</span>
                <span className="text-xs font-bold text-green-400">10% de Desconto</span>
              </button>
            </div>
            
            <div className="p-4 bg-brand-dark/50 rounded border border-gray-800 text-center animate-fade-in">
              <p className="text-gray-300">
                Ao confirmar, você será redirecionado para o <strong>WhatsApp</strong> para enviarmos o link de pagamento ou chave PIX.
              </p>
            </div>
          </section>
        </div>

        {/* DIREITA */}
        <div className="h-fit space-y-4">
          <div className="bg-brand-light p-6 rounded-lg border border-gray-800 sticky top-24 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Resumo</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto scrollbar-hide pr-2">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 text-sm border-b border-gray-800 pb-3 last:border-0">
                   <div className="w-10 h-10 bg-gray-700 rounded overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-white font-bold line-clamp-1">{item.quantity}x {item.name}</div>
                    <div className="text-gray-500 text-xs">Tam: {item.size}</div>
                  </div>
                  <div className="text-gray-300 font-mono">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span className="flex items-center gap-1"><Truck size={14}/> Frete</span>
                <span className="text-brand-primary font-bold">Grátis</span>
              </div>
              
              <div className="flex justify-between text-white text-xl font-bold pt-4 border-t border-gray-800 mt-2">
                <span>Total</span>
                <span className="text-brand-primary">
                  {formatPrice(paymentMethod === 'pix' ? cartTotal * 0.9 : cartTotal)}
                </span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              variant="primary" 
              className="w-full py-4 text-lg font-bold shadow-lg shadow-brand-primary/20 bg-green-500 hover:bg-green-600 border-green-500 text-white"
              disabled={loading}
            >
              {loading ? 'Abrindo WhatsApp...' : 'Enviar Pedido no Zap'}
            </Button>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
