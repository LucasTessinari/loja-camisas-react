import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Pega tanto o caminho (ex: /catalog) quanto os parâmetros (ex: ?category=Europeus)
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Isso garante que ele puxe a barra de rolagem (do HTML ou do body) lá pro topo.
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    
    // Fallback de segurança para navegadores antigos
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });

  // O pulo do gato: Colocamos 'pathname' e 'search' na lista de dependências!
  }, [pathname, search]);

  return null; 
};

export default ScrollToTop;
