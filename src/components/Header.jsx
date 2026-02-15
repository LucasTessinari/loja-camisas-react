import { ShoppingCart, Menu, Search, User, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="w-full font-sans">
      
      {/* 1. Topo Fino (Este some ao rolar) */}
      <div className="bg-brand-dark text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between">
          <div className="flex gap-4">
            <span>Fale Conosco</span>
            <span>Trocas e Devoluções</span>
          </div>
          <div className="flex gap-4">
            <span>Acompanhe seu pedido</span>
            <span className="text-yellow-400 font-bold">Baixe o App</span>
          </div>
        </div>
      </div>

      {/* 2. Barra Principal + Menu (Este GRUPO fica fixo) */}
      <div className="sticky top-0 z-50 w-full">
        
        {/* Barra Azul */}
        <div className="bg-brand-primary py-4 shadow-md relative z-20">
          <div className="container mx-auto px-4 flex items-center justify-between gap-4">
            
            {/* Menu Mobile */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={28} />
            </button>

            {/* Logo */}
            <Link to="/" className="text-3xl font-black italic text-white tracking-tighter flex-shrink-0">
              NET<span className="text-yellow-400">FUT</span>
            </Link>

            {/* Busca (Estilo Barra Grande) */}
            <div className="hidden md:flex flex-grow max-w-2xl relative mx-8">
              <input 
                type="text" 
                placeholder="O que você está procurando?" 
                className="w-full py-3 px-4 rounded-full text-sm text-gray-700 focus:outline-none shadow-inner"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-primary p-2">
                <Search size={20} />
              </button>
            </div>

            {/* Ícones da Direita */}
            <div className="flex items-center gap-6 text-white">
              <div className="hidden md:flex flex-col items-center text-xs gap-1 cursor-pointer hover:opacity-80">
                <User size={24} />
                <span>Entrar</span>
              </div>
              
              <div className="hidden md:flex flex-col items-center text-xs gap-1 cursor-pointer hover:opacity-80">
                <Heart size={24} />
                <span>Favoritos</span>
              </div>

              <Link to="/cart" className="flex flex-col items-center text-xs gap-1 relative group hover:opacity-80">
                <ShoppingCart size={24} />
                <span>Carrinho</span>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-2 bg-yellow-400 text-brand-dark text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
          
          {/* Busca Mobile (Aparece embaixo no celular) */}
          <div className="md:hidden px-4 mt-3">
            <div className="relative">
               <input type="text" placeholder="Buscar produtos..." className="w-full py-2 px-4 rounded text-sm" />
               <Search size={18} className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Menu Branco (Fica grudado embaixo da barra azul) */}
        <div className="bg-white border-b border-gray-200 hidden md:block shadow-sm relative z-10">
          <div className="container mx-auto px-4">
            <nav className="flex justify-between text-sm font-bold text-gray-700 py-3 overflow-x-auto">
              <Link to="/catalog?category=Todos" className="hover:text-brand-primary whitespace-nowrap px-4 border-r">TODAS AS CATEGORIAS</Link>
              <Link to="/catalog?category=Brasileirão" className="hover:text-brand-primary whitespace-nowrap px-4">BRASILEIRÃO</Link>
              <Link to="/catalog?category=Europeus" className="hover:text-brand-primary whitespace-nowrap px-4">EUROPEUS</Link>
              <Link to="/catalog?category=Seleções" className="hover:text-brand-primary whitespace-nowrap px-4">SELEÇÕES</Link>
              <Link to="/catalog" className="text-brand-primary whitespace-nowrap px-4">LANÇAMENTOS</Link>
              <Link to="/catalog" className="text-red-600 whitespace-nowrap px-4">OFERTAS</Link>
            </nav>
          </div>
        </div>
      
      </div>

      {/* Menu Lateral Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white w-3/4 h-full p-6 shadow-2xl flex flex-col gap-4">
             <div className="flex justify-between items-center mb-4 border-b pb-4">
                <span className="font-bold text-lg text-brand-primary">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 font-bold">X</button>
             </div>
             <Link to="/" className="text-gray-800 font-bold" onClick={() => setIsMenuOpen(false)}>Início</Link>
             <Link to="/catalog" className="text-gray-800" onClick={() => setIsMenuOpen(false)}>Lançamentos</Link>
             <Link to="/catalog?category=Brasileirão" className="text-gray-800" onClick={() => setIsMenuOpen(false)}>Brasileirão</Link>
             <Link to="/catalog?category=Europeus" className="text-gray-800" onClick={() => setIsMenuOpen(false)}>Europeus</Link>
          </div>
          <div className="bg-black/50 w-1/4 h-full" onClick={() => setIsMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};

export default Header;
