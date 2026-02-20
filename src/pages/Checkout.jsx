import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  CreditCard,
  Banknote,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  if (cartItems.length === 0 && !isSuccess) {
    navigate("/");
    return null;
  }

  // NOVA FUNÇÃO: finalizar indo para o Mercado Pago
  const handleFinishOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Captura dados do formulário
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      // 2. Monta array de itens no formato esperado pelo backend
      const items = cartItems.map((item) => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
      }));

      const body = {
        items,
        payer: {
          email: data.email,
          name: data.name,
        },
        paymentMethod, // só pra você ter essa info no backend se quiser
        shipping: {
          address: data.address,
          number: data.number,
          city: data.city,
          cep: data.cep,
          complement: data.complement || "",
        },
      };

      // 3. Chama o backend para criar a preferência do Mercado Pago
      const res = await fetch(`${API_URL}/api/payments/create_preference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok || !result.init_point) {
        console.error("Erro ao criar preferência:", result);
        alert("Erro ao iniciar o pagamento. Tente novamente.");
        setLoading(false);
        return;
      }

      // 4. Limpa carrinho e marca sucesso (caso queira usar tela de Sucesso depois)
      clearCart();
      setIsSuccess(true);

      // 5. Redireciona para o checkout do Mercado Pago
      window.location.href = result.init_point;
    } catch (error) {
      console.error("Erro no checkout:", error);
      alert("Erro ao conectar com o servidor de pagamento.");
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in min-h-[60vh] bg-[#00162D] w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
        <div className="bg-green-500/10 p-6 rounded-full mb-6 text-green-500 animate-bounce">
          <CheckCircle size={80} />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Redirecionando para pagamento...
        </h2>
        <p className="text-gray-400 mb-8 max-w-md text-lg mx-auto">
          Estamos te levando para a tela segura do Mercado Pago para concluir o
          seu pagamento.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          className="w-full max-w-xs py-4 mx-auto"
        >
          Voltar para a Loja
        </Button>
      </div>
    );
  }

  return (
    // Fundo da TELA ligeiramente mais escuro para as caixas destacarem
    <div className="bg-[#00162D] min-h-screen w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] animate-fade-in pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          Finalizar Compra <ShieldCheck className="text-green-500" />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ESQUERDA */}
          <div className="lg:col-span-2 space-y-8">
            {/* BOX 1: ENDEREÇO (Aqui entra a cor exata do header bg-[#001f3f]) */}
            <section className="bg-[#001f3f] p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="text-brand-primary" /> Endereço de Entrega
              </h2>

              <form
                id="checkout-form"
                onSubmit={handleFinishOrder}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Inputs com fundo transparente e borda para manter o design limpo */}
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Nome Completo"
                  className="bg-transparent border border-gray-600 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary focus:bg-white/5 outline-none placeholder-gray-400 transition-colors"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="bg-transparent border border-gray-600 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary focus:bg-white/5 outline-none placeholder-gray-400 transition-colors"
                />
                <input
                  required
                  name="cep"
                  type="text"
                  placeholder="CEP"
                  className="bg-transparent border border-gray-600 rounded p-3 text-white w-full focus:border-brand-primary focus:bg-white/5 outline-none placeholder-gray-400 transition-colors"
                />
                <input
                  required
                  name="city"
                  type="text"
                  placeholder="Cidade / UF"
                  className="bg-transparent border border-gray-600 rounded p-3 text-white w-full focus:border-brand-primary focus:bg-white/5 outline-none placeholder-gray-400 transition-colors"
                />
                <input
                  required
                  name="address"
                  type="text"
                  placeholder="Endereço (Rua, Av)"
                  className="bg-transparent border border-gray-600 rounded p-3 text-white w-full md:col-span-2 focus:border-brand-primary focus:bg-white/5 outline-none placeholder-gray-400 transition-colors"
                />
                <input
                  required
                  name="number"
                  type="text"
                  placeholder="Número"
                  className="bg-transparent border border-gray-600 rounded p-3 text-white w-full focus:border-brand-primary focus:bg-white/5 outline-none placeholder-gray-400 transition-colors"
                />
                <input
                  name="complement"
                  type="text"
                  placeholder="Complemento (Opcional)"
                  className="bg-transparent border border-gray-600 rounded p-3 text-white w-full focus:border-brand-primary focus:bg-white/5 outline-none placeholder-gray-400 transition-colors"
                />
              </form>
            </section>

            {/* BOX 2: FORMA DE PAGAMENTO (bg-[#001f3f]) */}
            <section className="bg-[#001f3f] p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Banknote className="text-brand-primary" /> Forma de Pagamento
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-brand-primary bg-brand-primary/10 text-white shadow-[0_0_15px_rgba(102,252,241,0.1)]"
                      : "border-gray-600 text-gray-400 hover:border-gray-400 hover:bg-white/5"
                  }`}
                >
                  <CreditCard size={28} />
                  <span className="font-bold">Cartão de Crédito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "pix"
                      ? "border-brand-primary bg-brand-primary/10 text-white shadow-[0_0_15px_rgba(102,252,241,0.1)]"
                      : "border-gray-600 text-gray-400 hover:border-gray-400 hover:bg-white/5"
                  }`}
                >
                  <span className="font-bold text-2xl">PIX</span>
                  <span className="text-xs font-bold text-green-400">
                    10% de Desconto
                  </span>
                </button>
              </div>

              <div className="p-4 bg-[#00162D] rounded border border-gray-700 text-center animate-fade-in">
                <p className="text-gray-300 text-sm">
                  Ao confirmar, você será redirecionado para o{" "}
                  <strong className="text-white">Mercado Pago</strong> para
                  realizar o pagamento com segurança.
                </p>
              </div>
            </section>
          </div>

          {/* DIREITA - BOX 3: RESUMO (bg-[#001f3f]) */}
          <div className="h-fit space-y-4">
            <div className="bg-[#001f3f] p-6 rounded-lg border border-gray-700/50 sticky top-24 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Resumo</h2>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto scrollbar-hide pr-2">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-3 text-sm border-b border-gray-700 pb-3 last:border-0"
                  >
                    <div className="w-12 h-12 bg-[#00162D] rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="text-white font-bold line-clamp-1">
                        {item.quantity}x {item.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        Tam: {item.size}
                      </div>
                    </div>
                    <div className="text-brand-primary font-mono font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6 space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-1">
                    <Truck size={16} /> Frete
                  </span>
                  <span className="text-green-400 font-bold">Grátis</span>
                </div>

                <div className="flex justify-between text-white text-xl font-black pt-4 border-t border-gray-700 mt-2">
                  <span>Total</span>
                  <span className="text-white">
                    {formatPrice(
                      paymentMethod === "pix" ? cartTotal * 0.9 : cartTotal,
                    )}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                variant="primary"
                className="w-full py-4 text-lg font-bold shadow-lg shadow-green-500/20 bg-green-500 hover:bg-green-600 border-green-500 text-white transition-all"
                disabled={loading}
              >
                {loading ? "Redirecionando..." : "Finalizar Pagamento"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
