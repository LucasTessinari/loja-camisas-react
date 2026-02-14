import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="bg-brand-dark border-b border-brand-light sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo (Com link para Home) */}
        <Link to="/" className="text-2xl font-bold text-brand-white tracking-tighter">
          FUT<span className="text-brand-primary">SHOP</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-8 text-brand-text font-medium">
          <Link to="/" className="hover:text-brand-primary transition-colors">Início</Link>
          <Link to="/catalog" className="hover:text-brand-primary transition-colors">Lançamentos</Link>
          <Link to="/catalog" className="hover:text-brand-primary transition-colors">Brasileirão</Link>
          <Link to="/catalog" className="hover:text-brand-primary transition-colors">Europeus</Link>
        </nav>

        {/* Ícones da Direita */}
        <div className="flex items-center gap-6 text-brand-white">
          <Search className="w-5 h-5 cursor-pointer hover:text-brand-primary" />
          
          <Link to="/cart" className="relative cursor-pointer hover:text-brand-primary group">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-primary text-brand-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Botão Menu Mobile */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-light p-4 absolute w-full border-t border-brand-dark">
          <nav className="flex flex-col gap-4 text-brand-text">
            <Link to="/" className="hover:text-brand-primary" onClick={() => setIsMenuOpen(false)}>Início</Link>
            <Link to="/catalog" className="hover:text-brand-primary" onClick={() => setIsMenuOpen(false)}>Lançamentos</Link>
            <Link to="/catalog" className="hover:text-brand-primary" onClick={() => setIsMenuOpen(false)}>Brasileirão</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
