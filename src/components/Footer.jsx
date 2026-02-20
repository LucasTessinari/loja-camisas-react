import {
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import visaLogo from '../assets/icons/visa.svg';
import masterLogo from '../assets/icons/mastercard.svg';
import eloLogo from '../assets/icons/elo.svg';
import pixLogo from '../assets/icons/pix.svg';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-primary mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Coluna 1: Sobre */}
          <div>
            <h3 className="text-2xl font-black italic mb-4">
              NET<span className="text-brand-secondary">FUT</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Sua loja especializada em mantos sagrados. Qualidade oficial,
              personalização exclusiva e entrega para todo o Brasil.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-brand-primary transition-colors text-white"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-brand-primary transition-colors text-white"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-brand-primary transition-colors text-white"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Loja (Navegue) - LINKS ATUALIZADOS */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b border-brand-primary/30 pb-2 inline-block">
              Navegue
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/catalog?category=Todos"
                  className="hover:text-brand-secondary transition-colors"
                >
                  Todas as Categorias
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=Brasileirão"
                  className="hover:text-brand-secondary transition-colors"
                >
                  Brasileirão
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=Europeus"
                  className="hover:text-brand-secondary transition-colors"
                >
                  Europeus
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=Seleções"
                  className="hover:text-brand-secondary transition-colors"
                >
                  Seleções
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=Retrô"
                  className="hover:text-brand-secondary transition-colors"
                >
                  Retrô
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=Lançamento"
                  className="hover:text-brand-secondary transition-colors"
                >
                  Lançamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento - LINK DE RASTREIO ADICIONADO */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b border-brand-primary/30 pb-2 inline-block">
              Atendimento
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {/* Novo Link de Rastreio */}
              <li>
                <Link 
                  to="/tracking" 
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer font-bold text-brand-secondary"
                >
                  Acompanhe seu Pedido
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Phone size={16} className="text-brand-secondary" /> (11)
                3028-5355
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Mail size={16} className="text-brand-secondary" />{" "}
                <a href="mailto:sac@netfut.com" className="hover:underline">sac@netfut.com</a>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MapPin size={16} className="text-brand-secondary" /> São Paulo,
                SP
              </li>
            </ul>
          </div>

          {/* Coluna 4: Pagamento */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b border-brand-primary/30 pb-2 inline-block">
              Pagamento Seguro
            </h4>
            <div className="flex gap-2">
              <img src={masterLogo} className="h-10 w-auto" alt="Mastercard" />
              <img src={visaLogo} className="h-10 w-auto" alt="Visa" />
              <img src={eloLogo} className="h-10 w-auto" alt="Elo" />
              <img src={pixLogo} className="h-8 w-auto" alt="Pix" />
            </div>

            <h4 className="text-white font-bold text-lg mt-6 mb-4 border-b border-brand-primary/30 pb-2 inline-block">
              Segurança
            </h4>
            <div className="flex gap-2 items-center text-xs text-gray-400">
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded text-white">
                <span className="text-green-400">🔒</span> Site Seguro
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-xs text-gray-500">
          <p className="mb-2">
            © 2026 NetFut Artigos Esportivos S.A. Todos os direitos reservados.
          </p>
          <p>
            CNPJ: 12.345.678/0001-90 | Av. Magalhães de Castro, 4800 - Cidade
            Jardim, São Paulo - SP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
