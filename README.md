<div align="center">

# 🛍️ [NOME DA LOJA]

[![Deploy](https://img.shields.io/badge/deploy-vercel-black?style=for-the-badge&logo=vercel)](https://[URL-DO-SITE])
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

**E-commerce full stack de camisas e camisetas desenvolvido do zero,
com arquitetura profissional separada em Frontend, API REST e Banco de Dados em Nuvem.**

[🌐 Ver online](https://[URL-DO-SITE]) • [💼 LinkedIn](https://linkedin.com/in/lucastessinari) • [📧 Contato](mailto:tessinarilucas@gmail.com)

</div>

---

## ✨ Funcionalidades

- 🛒 **Catálogo de Produtos** com listagem dinâmica consumida via API REST
- 🔍 **Filtro e Busca** de produtos por categoria e nome
- 🧾 **Página de Detalhe** do produto com seleção de tamanho e cor
- 🛍️ **Carrinho de Compras** com gerenciamento de estado global
- 💳 **Checkout Integrado** com Mercado Pago (PIX, Cartão e Boleto)
- 📱 **100% Responsivo** com design Mobile-First via Tailwind CSS
- 🔒 **HTTPS** com SSL automático via Vercel
- 🚀 **Deploy Contínuo** via GitHub com CI/CD automático (Vercel + Render)
- ☁️ **API em Nuvem** com servidor Node.js hospedado no Render
- 🗄️ **Banco de Dados em Nuvem** com MongoDB Atlas

---

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Versão | Finalidade |
| --- | --- | --- |
| [React](https://reactjs.org) | 18 | Biblioteca principal de UI |
| [Vite](https://vitejs.dev) | 5 | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Estilização utilitária Mobile-First |
| [React Router DOM](https://reactrouter.com) | 6 | Roteamento client-side |
| [Axios](https://axios-http.com) | latest | Requisições HTTP para a API |
| [Lucide React](https://lucide.dev) | latest | Ícones SVG |
| [Vercel](https://vercel.com) | — | Hospedagem e CI/CD do Frontend |

### Backend
| Tecnologia | Versão | Finalidade |
| --- | --- | --- |
| [Node.js](https://nodejs.org) | 20 | Runtime do servidor |
| [Express](https://expressjs.com) | 4 | Framework da API REST |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | — | Banco de dados NoSQL em nuvem |
| [Mongoose](https://mongoosejs.com) | latest | ODM para modelagem dos dados |
| [Mercado Pago SDK](https://www.mercadopago.com.br/developers) | latest | Processamento de pagamentos |
| [Render](https://render.com) | — | Hospedagem e CI/CD da API |

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura **desacoplada (Decoupled)**, com Frontend e Backend totalmente independentes e se comunicando via API REST:

┌─────────────────────┐ HTTPS / REST API ┌──────────────────────┐
│ FRONTEND (React) │ ─────────────────────────────▶ │ BACKEND (Node.js) │
│ Vercel │ ◀───────────────────────────── │ Render │
└─────────────────────┘ JSON └──────────┬───────────┘
│ Mongoose ODM
┌──────────▼───────────┐
│ MongoDB Atlas │
│ (Banco em Nuvem) │
└──────────────────────┘

text

### Estrutura de Pastas

📦 frontend/
├── src/
│ ├── components/
│ │ ├── Header.jsx # Navegação e carrinho
│ │ ├── ProductCard.jsx # Card reutilizável de produto
│ │ ├── CartDrawer.jsx # Gaveta lateral do carrinho
│ │ └── Footer.jsx # Rodapé
│ ├── pages/
│ │ ├── Home.jsx # Página principal com banner e destaques
│ │ ├── Catalog.jsx # Catálogo completo com filtros
│ │ ├── ProductDetail.jsx # Detalhe do produto
│ │ └── Checkout.jsx # Finalização da compra
│ ├── context/
│ │ └── CartContext.jsx # Estado global do carrinho (Context API)
│ ├── services/
│ │ └── api.js # Instância centralizada do Axios
│ ├── App.jsx # Roteamento principal
│ └── main.jsx # Entry point

📦 backend/
├── models/
│ └── Product.js # Schema do produto no MongoDB
├── routes/
│ ├── products.js # Rotas GET /api/products
│ └── payment.js # Rotas POST /api/payment
├── controllers/
│ ├── productController.js # Lógica dos produtos
│ └── paymentController.js # Lógica do Mercado Pago
└── server.js # Entry point da API

text

---

## 🚀 Como Rodar Localmente

**Pré-requisitos:** Node.js 18+, Git e uma conta no MongoDB Atlas.

### 1. Clone o repositório
```bash
git clone https://github.com/LucasTessinari/[NOME-DO-REPO].git
cd [NOME-DO-REPO]
2. Configure e rode o Backend
bash
cd backend
npm install
Crie um arquivo .env dentro da pasta backend/:

text
MONGO_URI=sua_connection_string_do_mongodb_atlas
MERCADO_PAGO_TOKEN=seu_access_token_do_mercado_pago
PORT=5000
bash
npm run dev
# API rodando em http://localhost:5000
3. Configure e rode o Frontend
bash
cd ../frontend
npm install
Crie um arquivo .env dentro da pasta frontend/:

text
VITE_API_URL=http://localhost:5000
bash
npm run dev
# Loja rodando em http://localhost:5173
📐 Decisões Técnicas
Por que Frontend e Backend separados?
Essa arquitetura permite escalar cada parte de forma independente. Se o volume de requisições na API crescer, posso aumentar apenas o servidor Node.js sem precisar redeploiar o frontend.

Por que MongoDB Atlas?
O catálogo de produtos de uma loja muda constantemente (novos modelos, tamanhos, cores). O MongoDB permite adicionar novos atributos a um produto sem precisar alterar a estrutura do banco, o que aceleraria muito a evolução do projeto.

Por que Mercado Pago?
Por ser o gateway de pagamento líder no Brasil, com suporte nativo a PIX (método de pagamento mais utilizado no país), menor taxa de recusa de transações e SDK oficial para Node.js.

Por que Render para a API?
Permite deploy automático via GitHub com zero configuração de infraestrutura, ideal para APIs Node.js em estágio de crescimento.

📬 Contato
<div align="center">
Desenvolvido por Lucas Tessinari — Desenvolvedor Front-End & Full Stack baseado em Vitória, ES.

LinkedIn
Email
Portfolio

</div> ```