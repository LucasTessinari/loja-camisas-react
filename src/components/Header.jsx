import { ShoppingCart, Menu, Search, User, Heart } from "lucide-react";
// Opcional: Se você instalou o lucide-react recente, pode importar o ícone do celular/whatsapp. Usaremos Phone como fallback se não tiver.
import { Phone } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext"; // Import do Contexto de Autenticação
import { useGoogleLogin } from "@react-oauth/google"; // Hook do Google
import { Link, useNavigate } from "react-router-dom"; // IMPORTANTE: adicionar useNavigate

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { favorites } = useFavorites();
  const { user, login, logout } = useAuth(); // Puxando dados do usuário logado
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // --- ESTADOS DA BUSCA ---
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  // Coloque o número do WhatsApp da loja aqui (Código País + DDD + Número)
  const WHATSAPP_NUMBER = "5511999999999";
  // Mensagem automática opcional ao abrir o whats
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Olá! Não encontrei um modelo no site, vocês conseguem para mim?",
  );

  // Função que dispara o pop-up do Google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Pega as informações do usuário logado (Nome, Foto, Email)
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        );
        const userInfo = await res.json();

        // Salva no nosso Contexto
        login({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        });
      } catch (error) {
        console.error("Erro ao buscar dados do Google", error);
      }
    },
    onError: () => console.log("Falha no Login do Google"),
  });

  // --- LÓGICA DA BUSCA ---
  // Busca a lista de produtos no backend APENAS quando o usuário clicar na barra de pesquisa
  const handleFocusSearch = async () => {
    setShowSuggestions(true);
    if (!hasFetched) {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setSearchProducts(data);
        setHasFetched(true);
      } catch (error) {
        console.error("Erro ao carregar produtos para a busca", error);
      }
    }
  };

  // Filtra os produtos com base no que foi digitado (Ignora Maiúsculas/Minúsculas)
  const suggestions =
    searchTerm.trim() === ""
      ? []
      : searchProducts
          .filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .slice(0, 5); // Mostra no máximo 5 sugestões

  // Quando o usuário aperta ENTER ou clica na Lupa
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowSuggestions(false);
      setIsMenuOpen(false);
    }
  };

  // HTML do Dropdown de Sugestões (Para usarmos no Mobile e Desktop)
  const renderSuggestionsDropdown = () => {
    if (!showSuggestions || searchTerm.trim() === "") return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
        {suggestions.length > 0 ? (
          suggestions.map((prod) => (
            <Link
              key={prod._id}
              to={`/product/${prod._id}`}
              onMouseDown={() => {
                // onMouseDown executa ANTES do onBlur do input
                setSearchTerm("");
                setShowSuggestions(false);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
            >
              <img
                src={prod.images?.[0] || "https://via.placeholder.com/40"}
                alt={prod.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 line-clamp-1">
                  {prod.name}
                </span>
                <span className="text-xs text-brand-primary font-bold">
                  R$ {prod.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500 font-medium">
            Nenhum manto encontrado com "{searchTerm}" :/
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50 shadow-md">
      {/* 1. Topo Fino (Este some ao rolar) */}
      <div className="bg-brand-dark text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Lado Esquerdo */}
          <div className="flex gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de falar com o atendimento da NetFut.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-green-400 transition-colors font-medium"
            >
              Fale Conosco
            </a>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[18px] h-[18px] text-green-400 group-hover:scale-110 transition-transform"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span className="font-bold underline decoration-green-400 decoration-2 underline-offset-2">
                  Chame no WhatsApp
                </span>
                <span>e nós conseguimos!</span>
              </span>
            </a>
          </div>

          {/* Lado Direito */}
          <div className="flex gap-4">
            <Link
              to="/tracking"
              className="text-yellow-400 font-bold hover:opacity-80 transition-opacity"
            >
              Acompanhe seu pedido
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Barra Principal + Menu (Este GRUPO fica fixo) */}
      <div className="w-full">
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
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleFocusSearch}
                  onBlur={() => setShowSuggestions(false)}
                  placeholder="O que você está procurando?"
                  className="w-full py-3 px-4 rounded-full text-sm text-gray-700 focus:outline-none shadow-inner border border-transparent focus:border-yellow-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-primary hover:bg-brand-primary hover:text-white rounded-full p-2 transition-colors"
                >
                  <Search size={20} />
                </button>
                {/* Renderiza o Dropdown */}
                {renderSuggestionsDropdown()}
              </form>
            </div>

            {/* Ícones da Direita */}
            <div className="flex items-center gap-6 text-white">
              {/* ÁREA DO USUÁRIO LOGADO OU DESLOGADO */}
              {user ? (
                <div className="hidden md:flex flex-col items-center text-xs gap-1 relative group cursor-pointer hover:text-yellow-400 transition-colors">
                  {/* Se tiver foto usa a foto, se não usa a primeira letra do nome */}
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt="Avatar"
                      className="w-6 h-6 rounded-full border border-transparent group-hover:border-yellow-400 transition-colors"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-brand-primary text-brand-dark flex items-center justify-center font-bold text-[10px] border border-transparent group-hover:border-yellow-400">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>Olá, {user.name.split(" ")[0]}</span>

                  {/* Dropdown de Sair - pt-2 (padding top invisível) para criar uma "ponte" para o mouse */}
                  <div className="absolute top-full pt-2 hidden group-hover:block w-32 z-50">
                    <div className="bg-white text-gray-800 p-3 rounded shadow-xl border border-gray-100 text-center relative">
                      {/* Setinha apontando pra cima (opcional para ficar bonito) */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-100"></div>

                      <p
                        className="font-bold text-sm mb-2 truncate"
                        title={user.name}
                      >
                        {user.name}
                      </p>
                      <button
                        onClick={logout}
                        className="w-full bg-red-50 hover:bg-red-100 text-red-500 font-bold py-1.5 rounded transition-colors"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => handleGoogleLogin()}
                  className="hidden md:flex flex-col items-center text-xs gap-1 cursor-pointer hover:text-yellow-400 transition-colors"
                >
                  <User size={24} />
                  <span>Entrar</span>
                </div>
              )}

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

              {/* Botão de Carrinho */}
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
          <div className="md:hidden px-4 mt-3 pb-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleFocusSearch}
                onBlur={() => setShowSuggestions(false)}
                placeholder="Buscar produtos..."
                className="w-full py-2 px-4 rounded text-sm outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <Search size={18} />
              </button>
              {/* Renderiza o Dropdown no Mobile */}
              {renderSuggestionsDropdown()}
            </form>
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

            {/* Aviso Whatsapp no Mobile também */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4 font-medium flex items-center gap-2"
            >
              <Phone size={16} />
              Não achou seu manto? Peça no WhatsApp!
            </a>

            {/* PERFIL MOBILE */}
            <div className="border-b border-gray-100 pb-4 mb-2">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-primary text-brand-dark flex items-center justify-center font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-gray-800 font-bold">
                      Olá, {user.name.split(" ")[0]}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleGoogleLogin()}
                  className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-2 rounded-lg"
                >
                  <User size={18} /> Entrar com Google
                </button>
              )}
            </div>

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
