import { ShoppingCart, Menu, Search, User, Heart } from "lucide-react";
// Opcional: Se você instalou o lucide-react recente, pode importar o ícone do celular/whatsapp. Usaremos Phone como fallback se não tiver.
import { Phone } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext"; // Import do FavoritesContext
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { favorites } = useFavorites(); // Puxando a lista de favoritos

  // Coloque o número do WhatsApp da loja aqui (Código País + DDD + Número)
  const WHATSAPP_NUMBER = "5511999999999";
  // Mensagem automática opcional ao abrir o whats
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Olá! Não encontrei um modelo no site, vocês conseguem para mim?",
  );

  return (
    <header className="w-full font-sans">
      {/* 1. Topo Fino (Este some ao rolar) */}
      <div className="bg-brand-dark text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Lado Esquerdo */}
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-gray-300 transition-colors">
              Fale Conosco
            </span>
          </div>

          {/* Frase Central com Link pro WhatsApp (COM ÍCONE OFICIAL) */}
          <div className="flex-1 flex justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center font-medium hover:text-green-400 transition-colors group"
            >
              <span className="flex items-center gap-1.5">
                Não encontrou seu manto?
                {/* Ícone oficial do WhatsApp no meio do texto */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[18px] h-[18px] text-green-400 group-hover:scale-110 transition-transform"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span className="font-bold underline decoration-green-400 decoration-2 underline-offset-2">
                  Chame no Zap
                </span>
                <span>e nós conseguimos!</span>
              </span>
            </a>
          </div>

          {/* Lado Direito */}
          <div className="flex gap-4">
            <span className="text-yellow-400 font-bold cursor-pointer hover:opacity-80 transition-opacity">
              Acompanhe seu pedido
            </span>
          </div>
        </div>
      </div>

      {/* 2. Barra Principal + Menu (Este GRUPO fica fixo) */}
      <div className="sticky top-0 z-50 w-full">
        {/* Barra Azul */}
        <div className="bg-brand-primary py-4 shadow-md relative z-20">
          <div className="container mx-auto px-4 flex items-center justify-between gap-4">
            {/* Menu Mobile */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={28} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-3xl font-black italic text-white tracking-tighter flex-shrink-0"
            >
              NET<span className="text-yellow-400">FUT</span>
            </Link>

            {/* Busca (Estilo Barra Grande) */}
            <div className="hidden md:flex flex-grow max-w-2xl relative mx-8">
              <input
                type="text"
                placeholder="O que você está procurando?"
                className="w-full py-3 px-4 rounded-full text-sm text-gray-700 focus:outline-none shadow-inner border border-transparent focus:border-yellow-400"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-primary hover:bg-brand-primary hover:text-white rounded-full p-2 transition-colors">
                <Search size={20} />
              </button>
            </div>

            {/* Ícones da Direita */}
            <div className="flex items-center gap-6 text-white">
              <div className="hidden md:flex flex-col items-center text-xs gap-1 cursor-pointer hover:text-yellow-400 transition-colors">
                <User size={24} />
                <span>Entrar</span>
              </div>

              {/* Botão de Favoritos no Header com Badge */}
              <Link
                to="/favorites"
                className="hidden md:flex flex-col items-center text-xs gap-1 cursor-pointer hover:text-yellow-400 transition-colors relative group"
              >
                <Heart
                  size={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Favoritos</span>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 right-2 bg-yellow-400 text-[#FFFFFF] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="flex flex-col items-center text-xs gap-1 relative group hover:text-yellow-400 transition-colors"
              >
                <ShoppingCart
                  size={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Carrinho</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-yellow-400 text-[#FFFFFF] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Busca Mobile (Aparece embaixo no celular) */}
          <div className="md:hidden px-4 mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full py-2 px-4 rounded text-sm outline-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Branco (Fica grudado embaixo da barra azul) */}
        <div className="bg-white border-b border-gray-200 hidden md:block shadow-sm relative z-10">
          <div className="container mx-auto px-4">
            <nav className="flex justify-between text-sm font-bold text-gray-700 py-3 overflow-x-auto">
              <Link
                to="/catalog?category=Todos"
                className="hover:text-brand-primary whitespace-nowrap px-4 border-r"
              >
                TODAS AS CATEGORIAS
              </Link>
              <Link
                to="/catalog?category=Brasileirão"
                className="hover:text-brand-primary whitespace-nowrap px-4"
              >
                BRASILEIRÃO
              </Link>
              <Link
                to="/catalog?category=Europeus"
                className="hover:text-brand-primary whitespace-nowrap px-4"
              >
                EUROPEUS
              </Link>
              <Link
                to="/catalog?category=Seleções"
                className="hover:text-brand-primary whitespace-nowrap px-4"
              >
                SELEÇÕES
              </Link>
              <Link
                to="/catalog?category=Retrô"
                className="hover:text-brand-primary whitespace-nowrap px-4"
              >
                RETRÔ
              </Link>
              <Link
                to="/catalog?category=Lançamento"
                className="hover:text-brand-primary whitespace-nowrap px-4"
              >
                LANÇAMENTO
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Menu Lateral Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white w-3/4 h-full p-6 shadow-2xl flex flex-col gap-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <span className="font-black italic text-2xl text-brand-primary">
                NET<span className="text-yellow-400">FUT</span>
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 font-bold text-xl"
              >
                X
              </button>
            </div>

            {/* Aviso Whatsapp no Mobile também (Opcional, mas recomendado) */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4 font-medium flex items-center gap-2"
            >
              <Phone size={16} />
              Não achou seu manto? Peça no Zap!
            </a>

            {/* Menu Mobile Favoritos */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-800 font-bold flex items-center gap-2">
                <Heart size={18} /> Favoritos
              </span>
              <span className="bg-yellow-400 text-[#FFFFFF] px-2 py-0.5 rounded-full text-xs font-bold">
                {favorites.length}
              </span>
            </div>

            <Link
              to="/"
              className="text-gray-800 font-bold border-b border-gray-100 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/catalog"
              className="text-gray-800 border-b border-gray-100 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Todas as Categorias
            </Link>
            <Link
              to="/catalog?category=Brasileirão"
              className="text-gray-800 border-b border-gray-100 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Brasileirão
            </Link>
            <Link
              to="/catalog?category=Europeus"
              className="text-gray-800 border-b border-gray-100 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Europeus
            </Link>
            <Link
              to="/catalog?category=Seleções"
              className="text-gray-800 border-b border-gray-100 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Seleções
            </Link>
            <Link
              to="/catalog?category=Retrô"
              className="text-gray-800 border-b border-gray-100 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Retrô
            </Link>
            <Link
              to="/catalog?category=Lançamento"
              className="text-gray-800 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Lançamento
            </Link>
          </div>

          <div
            className="bg-black/50 w-1/4 h-full"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        </div>
      )}
    </header>
  );
};

export default Header;
