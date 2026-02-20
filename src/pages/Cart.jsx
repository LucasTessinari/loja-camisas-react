import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

import visaLogo from "../assets/icons/visa.svg";
import masterLogo from "../assets/icons/mastercard.svg";
import eloLogo from "../assets/icons/elo.svg";
import pixLogo from "../assets/icons/pix.svg";

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, cartTotal, totalItems } =
    useCart();
  const navigate = useNavigate();

  // CARRINHO VAZIO
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in min-h-[50vh]">
        <div className="bg-gray-100 p-8 rounded-full mb-6 animate-bounce">
          <ShoppingBag size={64} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Seu carrinho está vazio
        </h2>
        <p className="text-gray-500 mb-8 text-lg">
          Parece que você ainda não escolheu seu manto sagrado.
        </p>
        <Link to="/">
          <Button
            variant="primary"
            className="px-8 py-3 font-bold shadow-lg shadow-brand-primary/20"
          >
            Voltar para a Loja
          </Button>
        </Link>
      </div>
    );
  }

  // LISTA DE ITENS
  return (
    <div className="animate-fade-in pb-20 pt-8 container mx-auto px-4">
      <h1 className="text-3xl font-black text-gray-800 mb-8 flex items-center gap-2 border-b border-gray-200 pb-4">
        Meu Carrinho{" "}
        <span className="text-lg font-normal text-gray-500">
          ({totalItems} itens)
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ESQUERDA: LISTA DE PRODUTOS */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="bg-white p-6 rounded-xl flex gap-6 border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-brand-primary/30 group"
            >
              {/* Imagem do Produto */}
              <div className="w-28 h-28 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              {/* Informações e Controles */}
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-800 font-bold text-lg leading-tight mb-1 group-hover:text-brand-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded inline-block">
                      Tam: {item.size}
                    </p>

                    {/* Mostra personalização se existir */}
                    {item.customization &&
                      (item.customization.name ||
                        item.customization.number) && (
                        <div className="mt-2 text-xs text-brand-primary font-bold bg-brand-primary/5 px-2 py-1 rounded inline-flex items-center gap-1 border border-brand-primary/10">
                          <ShieldCheck size={12} /> {item.customization.name}{" "}
                          {item.customization.number}
                        </div>
                      )}
                  </div>

                  {/* Preço Unitário */}
                  <div className="text-gray-800 font-bold text-lg">
                    {formatPrice(item.price)}
                  </div>
                </div>

                {/* Área de Ações (Qtd e Remover) */}
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center bg-white rounded-lg border border-gray-300 shadow-sm">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="p-2 text-gray-500 hover:text-brand-primary hover:bg-gray-50 rounded-l-lg transition-colors disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 text-gray-800 text-sm font-bold min-w-[30px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="p-2 text-gray-500 hover:text-brand-primary hover:bg-gray-50 rounded-r-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors hover:bg-red-50 px-2 py-1 rounded"
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
          <div className="bg-white p-6 rounded-xl border border-gray-100 sticky top-28 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
              Resumo do Pedido
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Frete</span>
                <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                  Grátis
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between text-gray-900 text-2xl font-black">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-right text-xs text-gray-500 mt-1 font-medium">
                em até 10x sem juros
              </p>
            </div>

            {/* Link para o Checkout */}
            <Button
              onClick={() => navigate("/checkout")}
              className="w-full bg-brand-primary hover:bg-yellow-500 text-[#e8e8e8] font-black text-lg uppercase tracking-wider py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Finalizar Compra
            </Button>

            <div className="mt-6 flex justify-center gap-3 items-center">
              <img src={masterLogo} className="h-10 w-auto" alt="Mastercard" />
              <img src={visaLogo} className="h-10 w-auto" alt="Visa" />
              <img src={eloLogo} className="h-10 w-auto" alt="Elo" />
              <img src={pixLogo} className="h-8 w-auto" alt="Pix" />
            </div>

            <p className="text-center text-xs text-gray-400 mt-3 font-medium flex justify-center items-center gap-1">
              <ShieldCheck size={12} /> Compra 100% Segura
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
