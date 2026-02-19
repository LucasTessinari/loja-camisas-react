require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Conexão Mongo
mongoose.connect('mongodb://127.0.0.1:27017/loja-camisas')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

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
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  console.log("👉 ALGUÉM BATEU NA ROTA DE BUSCAR UM PRODUTO");
  console.log("🆔 ID RECEBIDO:", req.params.id);

  try {
    // 1. Testa se o ID tem o formato válido do MongoDB (24 caracteres hex)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("❌ ERRO: O ID passado não é um ObjectId válido do Mongo");
      return res.status(400).json({ error: 'ID com formato inválido' });
    }

    // 2. Busca o produto
    const product = await Product.findById(req.params.id);
    
    // 3. Verifica se achou
    if (!product) {
      console.log("❌ NENHUM PRODUTO FOI ENCONTRADO COM ESSE ID NO BANCO");
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // 4. Se chegou aqui, deu tudo certo!
    console.log("✅ PRODUTO ENCONTRADO:", product.name);
    res.json(product);

  } catch (err) {
    console.error("🔥 ERRO CABULOSO NO SERVIDOR:", err);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});


// 4. Sobe servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
