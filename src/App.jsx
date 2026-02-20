import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Importando as páginas
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product'; // <--- Verifique se esse import existe!
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-brand-light font-sans text-brand-text">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
