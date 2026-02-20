import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button'; 

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('netfut_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('netfut_cookie_consent', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('netfut_cookie_consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-4 pointer-events-none flex justify-center animate-fade-in-up">
      {/* Container do Banner: Mais largo (max-w-6xl) e com menos altura (py-4) */}
      <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100 py-4 px-6 md:px-8 rounded-xl max-w-6xl w-full pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
        
        {/* Detalhe visual na lateral esquerda */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary"></div>
        
        {/* Texto do Cookie */}
        <div className="flex-1 text-center md:text-left flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pr-6">
          <span className="text-xl shrink-0 hidden md:block">🍪</span>
          <div>
            <h3 className="text-gray-900 font-bold text-sm mb-0.5 flex items-center justify-center md:justify-start gap-1">
              <span className="md:hidden">🍪</span> Nós usamos Cookies
            </h3>
            <p className="text-gray-500 text-xs leading-snug">
              Utilizamos cookies para melhorar sua experiência na NetFut e analisar nosso tráfego. Ao clicar em "Aceitar", você concorda com o uso.
            </p>
          </div>
        </div>

        {/* Botões - Menores e mais compactos */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <button 
            onClick={declineCookies}
            className="flex-1 md:flex-none px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Recusar
          </button>
          
          <Button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-6 py-2 bg-brand-primary hover:bg-yellow-500 text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Aceitar Todos
          </Button>

          {/* Botão X para fechar rapidinho */}
          <button 
            onClick={declineCookies}
            className="absolute top-2 right-2 md:relative md:top-auto md:right-auto text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors ml-1"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
