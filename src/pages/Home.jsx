import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Shield, Zap, RefreshCw, Truck, ChevronRight, Heart } from "lucide-react"; // Importei o Heart aqui
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext"; // Usando o Contexto de favoritos padrão
import { useProducts } from "../hooks/useProducts";

// Estilos Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import logoBrasileirao from '../../public/images/logos/brasileirao-logo.png';
import logoBundesliga from '../../public/images/logos/bundesliga-logo.png';
import logoLaliga from '../../public/images/logos/laliga-logo.svg';
import logoLigueOne from '../../public/images/logos/ligue1-logo.png';
import logoPremierleague from '../../public/images/logos/premier-league-logo.svg';
import logoSeriea from '../../public/images/logos/serie-a-logo.png';

// --- CSS PERSONALIZADO (Setas Minimalistas) ---
const customStyles = `
    /* Setas do Swiper - Pequenas e Brancas */
  .swiper-button-next, .swiper-button-prev {
    color: white !important;
    background: rgba(0,0,0,0.5);
    width: 32px !important;
    height: 32px !important;
    border-radius: 50%;
    transition: all 0.3s ease;
    opacity: 0; /* Invisível por padrão (como nos banners) */
  }

  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 14px !important;
    font-weight: bold;
  }

  /* Aparecer setas no Hover (para os Banners, se quiser manter) */
  .group:hover .swiper-button-next,
  .group:hover .swiper-button-prev {
    opacity: 1;
  }

  /* FORÇAR AS SETAS A APARECEREM SEMPRE NOS CARDS DE PRODUTO */
  .always-show-arrows .swiper-button-next,
  .always-show-arrows .swiper-button-prev {
    opacity: 1 !important;
  }

  .swiper-button-disabled {
    opacity: 0 !important;
  }
`;

// DADOS MOCK (Banners)
const HERO_SLIDES = [
  {
    id: 1,
    img: "https://i.imgur.com/QkCc5J9.jpeg", // Banner Lançamentos
    link: "/catalog?tag=lancamento",
  },
  {
    id: 2,
    img: "https://i.imgur.com/Pz5x0yL.jpeg", // Banner Champions
    link: "/catalog?tag=europeus",
  },
  {
    id: 3,
    img: "https://i.imgur.com/uFp6XzB.jpeg", // Banner Promoções
    link: "/catalog?tag=oferta",
  },
];

// LOGOS DOS CAMPEONATOS (Links Diretos da Wikipedia - Transparentes)
const LEAGUES = [
  {
    name: "Brasileirão",
    logo: logoBrasileirao,
  },
  {
    name: "Premier League",
    logo: logoPremierleague,
  },
  {
    name: "La Liga",
    logo: logoLaliga,
  },
  {
    name: "Serie A",
    logo: logoSeriea,
  },
  {
    name: "Bundesliga",
    logo: logoBundesliga,
  },
  {
    name: "Ligue 1",
    logo: logoLigueOne,
  }
];

// MOCK DE PRODUTOS (Para Vitrine)
// Em breve substituiremos isso pela chamada da API do Backend
import { products as mockProducts } from "../data/products"; // Renomeei para mockProducts para não conflitar com o do hook

const Home = () => {
  const { products, loading } = useProducts();
  const { toggleFavorite, isFavorite } = useFavorites(); // Hooks de favoritos
  
  console.log("products from API", products);
  const showcaseProducts = products.slice(0, 10);
  
  if (loading) return <p className="p-4">Carregando produtos...</p>;

  return (
    <div className="font-sans text-gray-900 bg-gray-50 pb-20">
      <style>{customStyles}</style>

      {/* 1. HERO SLIDER */}
      <div className="w-full h-[180px] md:h-[400px] relative group">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link to={slide.link}>
                <img
                  src={slide.img}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. BARRA DE CONFIANÇA */}
      <div className="bg-white border-b border-gray-200 py-4 shadow-sm relative z-10">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Truck size={24} className="text-brand-primary" />
            <div className="text-xs">
              <p className="font-bold text-gray-800">FRETE GRÁTIS</p>
              <p className="text-gray-500">Consulte condições</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <RefreshCw size={24} className="text-brand-primary" />
            <div className="text-xs">
              <p className="font-bold text-gray-800">TROCA FÁCIL</p>
              <p className="text-gray-500">Sem burocracia</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Shield size={24} className="text-brand-primary" />
            <div className="text-xs">
              <p className="font-bold text-gray-800">SITE SEGURO</p>
              <p className="text-gray-500">Compra protegida</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Zap size={24} className="text-brand-primary" />
            <div className="text-xs">
              <p className="font-bold text-gray-800">ENVIO RÁPIDO</p>
              <p className="text-gray-500">Postagem imediata</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVEGUE POR LIGAS (Logos dos Campeonatos) */}
      <section className="container mx-auto px-4 py-10 group/section">
        <h2 className="text-xl font-black italic uppercase mb-6 text-brand-primary flex items-center gap-2 border-l-4 border-brand-primary pl-3">
          Navegue por Ligas
        </h2>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={16}
            slidesPerView={2.5}
            breakpoints={{
              640: { slidesPerView: 3.5 },
              768: { slidesPerView: 4.5 },
              1024: { slidesPerView: 6 },
            }}
            className="pb-4 px-2"
          >
            {LEAGUES.map((league, idx) => (
              <SwiperSlide key={idx}>
                <Link
                  to={`/catalog?category=${encodeURIComponent(league.name)}`}
                  className="flex items-center justify-center bg-white hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg h-24 w-full transition-all group p-4 shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden"
                >
                  {/* IMAGEM SEMPRE COLORIDA + ZOOM NO HOVER */}
                  <img
                    src={league.logo}
                    alt={league.name}
                    className="max-h-12 max-w-[80%] object-contain transition-transform duration-300 transform group-hover:scale-110"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 4. VITRINE DE PRODUTOS (Mais Vendidos) */}
      <section className="container mx-auto px-4 mb-10 group/section">
        <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-2">
          <h2 className="text-2xl font-black text-brand-primary italic uppercase border-l-4 border-yellow-400 pl-3">
            Mais Vendidos
          </h2>
          <Link
            to="/catalog"
            className="text-sm font-bold text-brand-primary hover:underline flex items-center"
          >
            Ver tudo <ChevronRight size={16} />
          </Link>
        </div>

        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          navigation={true}
          modules={[Navigation]}
          className="pb-10 pt-2 px-2" // <-- Aumentei o pb aqui para dar respiro embaixo
        >
          {showcaseProducts.map((prod) => {
            const favorite = isFavorite(prod._id); // Verifica se este card específico é favorito

            return (
              <SwiperSlide key={prod._id} className="h-auto">
                <div className="group block bg-white rounded-md border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden h-full flex flex-col relative">
                  
                  {/* IMAGEM E MINI-CARROSSEL */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 always-show-arrows shrink-0">
                    
                    {/* Tag Lançamento */}
                    {prod.isNew && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-[#FFFFFF] text-[10px] font-bold px-2 py-1 rounded uppercase z-10 shadow-sm pointer-events-none">
                        Lançamento
                      </span>
                    )}

                    {/* Botão de Favoritar (Fica no canto superior direito) */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault(); // Evita que o Link envolta seja ativado
                        toggleFavorite(prod);
                      }}
                      className="absolute top-2 right-2 p-1.5 md:p-2 rounded-full bg-white/90 hover:bg-white shadow-sm z-20 transition-all hover:scale-110 border border-gray-100/50 group/heart"
                      aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <Heart 
                        size={18} 
                        className={`transition-colors duration-300 ${
                          favorite 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-400 group-hover/heart:text-red-400'
                        }`} 
                      />
                    </button>

                    <Swiper
                      modules={[Navigation]}
                      navigation
                      spaceBetween={0}
                      slidesPerView={1}
                      className="w-full h-full"
                    >
                      {prod.images?.map((img, idx) => (
                        <SwiperSlide key={idx}>
                          <Link
                            to={`/product/${prod._id}`}
                            className="block w-full h-full"
                          >
                            <img
                              src={img}
                              alt={`${prod.name} ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* TEXTOS */}
                  <Link
                    to={`/product/${prod._id}`}
                    className="p-3 pb-4 flex flex-col flex-grow"
                  >
                    {/* min-h-[2.5rem] garante 2 linhas sem cortar o texto */}
                    <h3 className="font-bold text-gray-700 text-sm md:text-base line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-brand-primary transition-colors duration-300">
                      {prod.name}
                    </h3>

                    <div className="flex flex-col gap-0.5 mt-auto">
                      {prod.oldPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          R$ {prod.oldPrice.toFixed(2).replace(".", ",")}
                        </p>
                      )}
                      <p className="text-lg font-black text-brand-primary">
                        R$ {prod.price.toFixed(2).replace(".", ",")}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">
                        10x de R$ {(prod.price / 10).toFixed(2).replace(".", ",")}{" "}
                        s/ juros
                      </p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* 5. ENCOMENDA VIA WHATSAPP */}
      <section className="bg-brand-primary py-10 text-white mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase mb-2 tracking-tighter">
            NÃO ENCONTROU SEU MANTO?
          </h2>
          <p className="opacity-90 mb-6 text-sm md:text-base">
            Digite abaixo o modelo que você procura e nós conseguimos para você.
          </p>

          <div className="max-w-xl mx-auto bg-white p-1 rounded-lg flex shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
            <input
              id="pedido-input-home"
              type="text"
              placeholder="Ex: Camisa Barcelona 2015 Messi..."
              className="flex-1 py-3 px-4 text-gray-800 outline-none rounded-l-md placeholder-gray-400 font-medium w-full text-black"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const text =
                    document.getElementById("pedido-input-home").value;
                  if (text)
                    window.open(
                      `https://wa.me/5511999999999?text=Olá! Estou procurando essa camisa: ${encodeURIComponent(text)}`,
                      "_blank",
                    );
                }
              }}
            />
            <button
              onClick={() => {
                const text = document.getElementById("pedido-input-home").value;
                if (text) {
                  window.open(
                    `https://wa.me/5511999999999?text=Olá! Estou procurando essa camisa: ${encodeURIComponent(text)}`,
                    "_blank",
                  );
                } else {
                  alert("Digite o nome da camisa primeiro!");
                }
              }}
              className="bg-[#25D366] hover:bg-green-500 text-white font-bold py-3 px-4 md:px-6 rounded-r-md transition-colors flex items-center gap-2 uppercase text-xs md:text-sm tracking-wide whitespace-nowrap"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 hidden md:block"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Pedir no Zap
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
