const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-light py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Sobre */}
          <div>
            <h3 className="text-xl font-bold text-brand-white mb-4">FUT<span className="text-brand-primary">SHOP</span></h3>
            <p className="text-gray-400 text-sm">
              Sua loja especializada em mantos sagrados. Qualidade oficial e entrega para todo o Brasil.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-brand-white font-bold mb-4">Loja</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-primary">Lançamentos</a></li>
              <li><a href="#" className="hover:text-brand-primary">Ofertas</a></li>
              <li><a href="#" className="hover:text-brand-primary">Brasileirão</a></li>
              <li><a href="#" className="hover:text-brand-primary">Internacional</a></li>
            </ul>
          </div>

          {/* Coluna 3: Suporte */}
          <div>
            <h4 className="text-brand-white font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-primary">Rastrear Pedido</a></li>
              <li><a href="#" className="hover:text-brand-primary">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-brand-primary">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Coluna 4: Pagamento */}
          <div>
            <h4 className="text-brand-white font-bold mb-4">Pagamento Seguro</h4>
            <div className="flex gap-2">
               {/* Simulação de ícones de cartão */}
               <div className="w-10 h-6 bg-gray-700 rounded"></div>
               <div className="w-10 h-6 bg-gray-700 rounded"></div>
               <div className="w-10 h-6 bg-gray-700 rounded"></div>
            </div>
          </div>

        </div>
        
        <div className="border-t border-brand-light mt-8 pt-8 text-center text-sm text-gray-500">
          © 2026 FutShop. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
