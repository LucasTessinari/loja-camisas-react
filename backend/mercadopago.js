const express = require("express");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const router = express.Router();

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});

router.post("/create_preference", async (req, res) => {
    try {
        const { items, payer } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Carrinho vazio." });
        }

        const preference = new Preference(client);

        // Corpo exato da requisição, conforme a documentação REST API
        const body = {
            items: items.map((item) => ({
                title: item.title || "Produto sem nome",
                unit_price: Number(item.unit_price),
                quantity: Number(item.quantity),
                currency_id: "BRL",
            })),
            payer: {
                name: payer?.name || "Cliente",
                email: payer?.email || "email@teste.com"
            },
            back_urls: {
                success: "http://localhost:5173/checkout/sucesso",
                failure: "http://localhost:5173/checkout/erro",
                pending: "http://localhost:5173/checkout/pendente"
            }
            // auto_return: "approved" -> REMOVIDO!
        };

        console.log("👉 Enviando Preference:", JSON.stringify(body, null, 2));

        const response = await preference.create({ body });

        return res.json({ init_point: response.init_point });

    } catch (error) {
        console.error("🔥 ERRO NO MERCADO PAGO:", error);

        // Mostra o erro detalhado da API, se existir
        if (error.cause) {
            console.error("DETALHE DO ERRO DA API:", error.cause);
        }

        return res.status(500).json({ error: "Erro ao criar preferência" });
    }
});

module.exports = router;
