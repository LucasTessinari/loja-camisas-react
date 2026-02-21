// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mpRouter = require('./mercadopago');

const app = express();

// Permite que qualquer frontend (Vercel ou Localhost) acesse a API
app.use(cors());
app.use(express.json());

// Rota de pagamentos Mercado Pago
app.use("/api/payments", mpRouter);

// 1. Conexão Mongo (Usa a URL do Render em produção, ou o localhost no seu PC)
const DB_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loja-camisas';

console.log('Tentando conectar no banco de dados...');

mongoose
  .connect(DB_URL)
  .then(() => console.log('✅ MongoDB conectado com sucesso!'))
  .catch(err => {
    console.error('❌ Erro fatal ao conectar no MongoDB:', err);
  });

// 2. Schema igual ao que você usou no Compass
const productSchema = new mongoose.Schema({
  sku: String,
  name: String,
  price: Number,
  oldPrice: Number,
  league: String,
  category: String,
  description: String,
  images: [String],     // lista de base64
  sizes: [String],
  isNew: Boolean
});

const Product = mongoose.model('Product', productSchema);

// 3. Rota para buscar todos os produtos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ sku: 1 }); // em ordem do sku
    res.json(products);
  } catch (err) {
    console.error("Erro ao buscar a lista de produtos:", err);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Rota para buscar UM produto específico pelo ID
app.get('/api/products/:id', async (req, res) => {
  console.log("👉 ALGUÉM BATEU NA ROTA DE BUSCAR UM PRODUTO");
  console.log("🆔 ID RECEBIDO:", req.params.id);

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("❌ ERRO: O ID passado não é um ObjectId válido do Mongo");
      return res.status(400).json({ error: 'ID com formato inválido' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      console.log("❌ NENHUM PRODUTO FOI ENCONTRADO COM ESSE ID NO BANCO");
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    console.log("✅ PRODUTO ENCONTRADO:", product.name);
    res.json(product);
  } catch (err) {
    console.error("🔥 ERRO CABULOSO NO SERVIDOR:", err);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// 4. Sobe servidor (Render define a porta automaticamente pelo process.env.PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
