import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Importando os provedores de Autenticação
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

// Importando as páginas
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";

function App() {
  // ID Google Cloud Console
  const GOOGLE_CLIENT_ID = "596970924830-c3juf8d889okplkes2ovvfei1ki4mhvl.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-brand-light font-sans text-brand-text">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />

                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/checkout/sucesso"
                  element={<h1>Pagamento aprovado!</h1>}
                />
                <Route
                  path="/checkout/erro"
                  element={<h1>Houve um erro no pagamento.</h1>}
                />
                <Route
                  path="/checkout/pendente"
                  element={<h1>Pagamento pendente.</h1>}
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
