import { ShoppingCart, Menu, Search } from 'lucide-react'; // Vamos instalar esses ícones já já
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand-dark border-b border-brand-light sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-brand-white tracking-tighter">
          FUT<span className="text-brand-primary">SHOP</span>
        </div>

        {/* Menu Desktop (Escondido no mobile) */}
        <nav className="hidden md:flex gap-8 text-brand-text font-medium">
          <a href="#" className="hover:text-brand-primary transition-colors">Início</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Lançamentos</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Brasileirão</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Europeus</a>
        </nav>

        {/* Ícones da Direita */}
        <div className="flex items-center gap-6 text-brand-white">
          <Search className="w-5 h-5 cursor-pointer hover:text-brand-primary" />
          
          <div className="relative cursor-pointer hover:text-brand-primary group">
            <ShoppingCart className="w-5 h-5" />
            {/* Bolinha de notificação do carrinho */}
            <span className="absolute -top-2 -right-2 bg-brand-primary text-brand-dark text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>

          {/* Botão Menu Mobile (Só aparece em telas pequenas) */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menu Mobile (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-light p-4 absolute w-full border-t border-brand-dark">
          <nav className="flex flex-col gap-4 text-brand-text">
            <a href="#" className="hover:text-brand-primary">Início</a>
            <a href="#" className="hover:text-brand-primary">Lançamentos</a>
            <a href="#" className="hover:text-brand-primary">Brasileirão</a>
            <a href="#" className="hover:text-brand-primary">Europeus</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
