import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Importei useNavigate
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  AlertCircle,
  Heart, // Import do Heart
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext"; // Import do Contexto de Favoritos
import { formatPrice } from "../utils/formatPrice";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Instanciando useNavigate
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites(); // Hooks de favoritos

  // ESTADOS DO PRODUTO (Vindos do Banco)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ESTADOS DA INTERFACE
  const [mainImage, setMainImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [personalize, setPersonalize] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Opções fixas caso o banco não mande
  const AVAILABLE_SIZES = ["P", "M", "G", "GG", "XG"];
  const KIDS_SIZES = ["2", "4", "6", "8", "10", "12", "14"];

  // 1. BUSCAR PRODUTO DO MONGODB
  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setProduct(null);
          return;
        }

        const data = await res.json();
        setProduct(data);
        setMainImage(0);
      } catch (err) {
        if (err.name !== "AbortError")
          console.error("Erro ao buscar produto:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [id]);

  // SCROLL PARA O TOPO SEMPRE QUE MUDAR DE PRODUTO
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 font-bold animate-pulse text-xl">
          Carregando manto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 font-bold text-xl">
          Produto não encontrado :/
        </p>
        <button
          onClick={() => navigate("/catalog")}
          className="mt-4 underline text-brand-primary font-bold"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  // Define se é infantil pela categoria, ou se a string infantil tá no nome
  const isKids =
    product.category === "Infantil" ||
    product.name.toLowerCase().includes("infantil");
  const displaySizes = isKids
    ? KIDS_SIZES
    : product.sizes?.length > 0
      ? product.sizes
      : AVAILABLE_SIZES;

  // Preço total com personalização
  const finalPrice = product.price + (personalize ? 30 : 0);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho antes de comprar!");
      return;
    }

    if (personalize && (!customName || !customNumber)) {
      alert("Preencha o nome e o número para a personalização.");
      return;
    }

    const customization = personalize
      ? { name: customName, number: customNumber }
      : null;

    // Passamos o product inteiro, o size escolhido e a personalização (se houver)
    addItem(product, selectedSize, customization);

    // Feedback visual (pode ser trocado por um toast)
    alert("Adicionado ao carrinho com sucesso!");
  };

  // Garante que existe array de imagens
  const images =
    product.images?.length > 0
      ? product.images
      : ["https://via.placeholder.com/600x800?text=Sem+Imagem"];

  const isFav = isFavorite(product._id); // Variável para verificar se este produto é favorito

  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in">
      {/* BREADCRUMB */}
      <div className="bg-gray-50 border-b border-gray-100 py-3 hidden md:block">
        <div className="container mx-auto px-4 text-xs text-gray-500 font-medium tracking-wide flex gap-2">
          <Link to="/" className="hover:text-brand-primary">
            HOME
          </Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-brand-primary">
            CATÁLOGO
          </Link>
          <span>/</span>
          <span className="text-brand-primary">
            {product.team || product.league || "CAMISA"}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LADO ESQUERDO: IMAGENS */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails (Lado no Desktop, Baixo no Mobile) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`w-16 h-20 md:w-20 md:h-24 shrink-0 rounded border-2 overflow-hidden transition-all ${
                    mainImage === idx
                      ? "border-brand-primary ring-2 ring-brand-primary/20"
                      : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${idx}`}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </button>
              ))}
            </div>

            {/* Imagem Principal */}
            <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden relative group">
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-yellow-400 text-[#FFFFFF] text-xs font-black px-3 py-1.5 rounded uppercase shadow-sm z-10">
                  Lançamento
                </span>
              )}
              {/* BOTÃO DE FAVORITO EM CIMA DA IMAGEM PRINCIPAL */}
              <button 
                onClick={() => toggleFavorite(product)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white shadow-sm z-20 transition-all hover:scale-110 border border-gray-100"
              >
                <Heart 
                  size={24} 
                  className={`transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} 
                />
              </button>

              <img
                src={images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply transition-opacity duration-300"
              />
            </div>
          </div>

          {/* LADO DIREITO: INFORMAÇÕES DO PRODUTO */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <p className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2">
              {product.team || product.league}
            </p>

            {/* Título */}
            <div className="flex justify-between items-start gap-4 mb-4">
              <h1 className="text-2xl md:text-4xl font-black text-gray-800 leading-tight uppercase italic">
                {product.name}
              </h1>
            </div>

            {/* PREÇO */}
            <div className="flex items-end gap-3 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100 border-l-4 border-l-brand-primary">
              <div className="flex flex-col">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-sm font-medium">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <div className="flex items-end gap-2">
                  <span className="text-4xl md:text-5xl font-black text-gray-800 tracking-tighter">
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="text-sm font-bold text-gray-500 mb-1.5">
                    no PIX
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium mt-1">
                  ou 12x de {formatPrice(finalPrice / 12)} s/ juros no cartão
                </span>
              </div>
            </div>

            {/* SELEÇÃO DE TAMANHO */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-700 text-sm tracking-wide uppercase">
                  Selecione o Tamanho
                </span>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-brand-primary text-xs font-bold hover:underline uppercase tracking-wide flex items-center gap-1"
                >
                  <AlertCircle size={14} /> Tabela de Medidas
                </button>
              </div>

              <div className="grid grid-cols-5 md:grid-cols-5 gap-2">
                {displaySizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded font-black transition-all border-2 ${
                      selectedSize === size
                        ? "border-brand-primary bg-brand-primary/10 text-[#FFFFFF]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Tabela de Medidas Expandível */}
              {showSizeGuide && (
                <div className="mt-3 p-4 bg-gray-50 rounded border border-gray-200 text-sm text-gray-600 animate-fade-in">
                  <p className="font-bold mb-2">
                    Medidas Aproximadas (Largura x Altura):
                  </p>
                  <ul className="space-y-1">
                    {isKids ? (
                      <>
                        <li>
                          <strong>2:</strong> 33x44 cm (1-2 anos)
                        </li>
                        <li>
                          <strong>4:</strong> 35x47 cm (3-4 anos)
                        </li>
                        <li>
                          <strong>6:</strong> 37x50 cm (5-6 anos)
                        </li>
                        <li>
                          <strong>8:</strong> 39x53 cm (7-8 anos)
                        </li>
                        <li>
                          <strong>10:</strong> 41x56 cm (9-10 anos)
                        </li>
                        <li>
                          <strong>12:</strong> 43x59 cm (11-12 anos)
                        </li>
                        <li>
                          <strong>14:</strong> 45x62 cm (13-14 anos)
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <strong>P:</strong> 50x71 cm
                        </li>
                        <li>
                          <strong>M:</strong> 52x73 cm
                        </li>
                        <li>
                          <strong>G:</strong> 54x75 cm
                        </li>
                        <li>
                          <strong>GG:</strong> 56x77 cm
                        </li>
                        <li>
                          <strong>XG (2XL):</strong> 58x80 cm
                        </li>
                      </>
                    )}
                  </ul>
                  <p className="text-xs mt-2 text-gray-400 italic">
                    * Pode haver variação de 1 a 3 cm.
                  </p>
                </div>
              )}
            </div>

            {/* PERSONALIZAÇÃO (+ R$30) */}
            <div className="mb-8 p-5 bg-white border-2 border-dashed border-gray-200 rounded-lg">
              <label className="flex items-center cursor-pointer mb-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={personalize}
                    onChange={(e) => {
                      setPersonalize(e.target.checked);
                      if (!e.target.checked) {
                        setCustomName("");
                        setCustomNumber("");
                      }
                    }}
                  />
                  <div
                    className={`block w-10 h-6 rounded-full transition-colors ${personalize ? "bg-brand-primary" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${personalize ? "transform translate-x-4" : ""}`}
                  ></div>
                </div>
                <div className="ml-3 font-bold text-gray-700 uppercase tracking-wide text-sm">
                  Personalizar Camisa{" "}
                  <span className="text-brand-primary">(+ R$ 30,00)</span>
                </div>
              </label>

              {personalize && (
                <div className="grid grid-cols-2 gap-3 mt-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Nome nas Costas
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: SILVA"
                      maxLength="12"
                      value={customName}
                      onChange={(e) =>
                        setCustomName(e.target.value.toUpperCase())
                      }
                      className="w-full border border-gray-300 rounded p-2 text-sm uppercase outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Número
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 10"
                      maxLength="2"
                      value={customNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setCustomNumber(val);
                      }}
                      className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                    />
                  </div>
                  <p className="col-span-2 text-[10px] text-gray-400 italic mt-1">
                    * Produtos personalizados não podem ser trocados ou
                    devolvidos.
                  </p>
                </div>
              )}
            </div>

            {/* BOTÃO COMPRAR */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-brand-primary hover:bg-yellow-500 text-[#FFFFFF] font-black text-lg uppercase tracking-wider py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mb-6"
            >
              <ShoppingCart size={24} />
              Adicionar ao Carrinho
            </button>

            {/* VANTAGENS (TRUST BADGES) */}
            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6 mt-2">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={28} className="text-gray-400 mb-2" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                  Compra
                  <br />
                  Segura
                </span>
              </div>
              <div className="flex flex-col items-center text-center border-l border-r border-gray-100">
                <Truck size={28} className="text-gray-400 mb-2" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                  Frete Grátis
                  <br />
                  Todo Brasil
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw size={28} className="text-gray-400 mb-2" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                  Garantia de
                  <br />
                  Qualidade
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIÇÃO E DETALHES - ABAS */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="flex gap-8 border-b border-gray-200 mb-6 px-2">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-sm font-black uppercase tracking-widest transition-colors relative ${
                activeTab === "description"
                  ? "text-gray-800"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Descrição do Produto
              {activeTab === "description" && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 text-sm font-black uppercase tracking-widest transition-colors relative ${
                activeTab === "shipping"
                  ? "text-gray-800"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Prazos e Envios
              {activeTab === "shipping" && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary"></span>
              )}
            </button>
          </div>

          <div className="px-2 pb-10">
            {activeTab === "description" && (
              <div className="prose max-w-none text-gray-600 text-sm md:text-base leading-relaxed animate-fade-in">
                <p>
                  {product.description ||
                    "As camisas da versão torcedor (fans) são projetadas para oferecer o máximo de conforto para o uso no dia a dia. Com um corte um pouco mais solto do que as versões de jogador, elas garantem liberdade de movimento, seja na arquibancada ou em casa."}
                </p>
                <ul className="mt-4 space-y-2">
                  <li>
                    <strong>Tecnologia do Tecido:</strong> Absorção de umidade
                    que mantém você seco e confortável.
                  </li>
                  <li>
                    <strong>Escudo e Logos:</strong> Bordados de alta qualidade
                    e durabilidade.
                  </li>
                  <li>
                    <strong>Composição:</strong> 100% Poliéster.
                  </li>
                  <li>
                    <strong>Origem:</strong> Importado (Qualidade Premium
                    Tailandesa).
                  </li>
                  <li>
                    <strong>Indicado para:</strong> Dia a dia e uso casual.
                  </li>
                </ul>
                <p className="mt-4 text-xs italic text-gray-400">
                  As imagens do site são meramente ilustrativas. O produto final
                  pode sofrer pequenas alterações de cor ou detalhes do
                  fornecedor.
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="prose max-w-none text-gray-600 text-sm md:text-base leading-relaxed animate-fade-in">
                <p>
                  Nossos produtos são importados e enviados diretamente das
                  fábricas parceiras para a sua casa (Envio Internacional).
                </p>
                <ul className="mt-4 space-y-2">
                  <li>
                    <strong>Prazo de Processamento:</strong> 3 a 7 dias úteis
                    após a confirmação do pagamento.
                  </li>
                  <li>
                    <strong>Prazo de Entrega:</strong> 15 a 25 dias úteis
                    (geralmente chega antes).
                  </li>
                  <li>
                    <strong>Rastreamento:</strong> O código de rastreio será
                    enviado para o seu e-mail assim que o produto for
                    despachado.
                  </li>
                  <li>
                    <strong>Taxas Alfandegárias:</strong> Quase 100% dos nossos
                    pacotes passam sem taxas. Caso haja taxação, a
                    responsabilidade de pagamento é do comprador.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
