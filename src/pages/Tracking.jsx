import { useState } from "react";
import {
  Package,
  Search,
  Phone,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import Button from "../components/Button";

const Tracking = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [error, setError] = useState("");

  // WhatsApp da sua loja
  const WHATSAPP_NUMBER = "5511999999999";
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Olá! Estou com uma dúvida sobre o rastreamento do meu pedido.",
  );

  const handleTrack = (e) => {
    e.preventDefault();

    // Validação básica do código (Correios geralmente tem 13 caracteres: 2 letras, 9 números, 2 letras)
    if (trackingCode.trim().length < 5) {
      setError("Por favor, insira um código de rastreio válido.");
      return;
    }

    setError("");

    // Abre o site de rastreamento oficial sem captcha em uma nova aba
    // Usamos o linkcorreios.com.br ou sitecorreios.com.br que são os melhores pra isso
    const trackingUrl = `https://www.linkcorreios.com.br/?id=${trackingCode.trim().toUpperCase()}`;
    window.open(trackingUrl, "_blank");
  };

  return (
    <div className="animate-fade-in py-12 max-w-4xl mx-auto">
      {/* CABEÇALHO */}
      <div className="text-center mb-10">
        <div className="bg-brand-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package size={40} className="text-brand-primary" />
        </div>
        <h1 className="text-4xl font-black text-gray-800 mb-4">
          Acompanhe seu Pedido
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Insira o código de rastreamento que enviamos para o seu e-mail e
          WhatsApp para saber onde está o seu manto sagrado.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* CARD DE RASTREIO */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Search className="text-brand-primary" /> Rastrear Encomenda
          </h2>

          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Código de Rastreio (Correios)
              </label>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => {
                  setTrackingCode(e.target.value);
                  setError("");
                }}
                placeholder="Ex: NL123456789BR"
                className="w-full py-4 px-5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-brand-primary text-gray-800 font-medium uppercase tracking-wider transition-colors"
                maxLength={20}
              />
              {error && (
                <p className="text-red-500 text-sm font-bold mt-2">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-4 bg-brand-dark hover:bg-black text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Rastrear Pedido <ExternalLink size={20} />
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
            <ShieldCheck size={16} className="text-green-500" />
            Redirecionamento seguro sem captcha
          </div>
        </div>

        {/* CARD DE CONTATO */}
        <div className="bg-gradient-to-br from-brand-primary to-[#395070] p-8 rounded-2xl shadow-xl text-white">
          <h2 className="text-2xl font-black mb-4">Ainda com dúvidas?</h2>
          <p className="mb-8 text-white/90 text-lg leading-relaxed">
            Se o seu código ainda não está aparecendo no sistema ou se você não
            recebeu o código após 3 dias úteis da compra, não se preocupe! Nossa
            equipe está pronta para te ajudar no WhatsApp.
          </p>

          <div className="bg-white/10 p-5 rounded-xl border border-white/20 mb-8 backdrop-blur-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-white/80 mb-1">
              Horário de Atendimento
            </p>
            <p className="font-bold text-lg">Seg a Sex das 09h às 18h</p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white text-brand-dark hover:bg-gray-100 font-black text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Phone size={24} className="text-green-500" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
