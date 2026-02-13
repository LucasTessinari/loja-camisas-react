import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Importando as páginas
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product'; // <--- Verifique se esse import existe!
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-brand-dark">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            
            {/* --- ESTA É A LINHA CRUCIAL --- */}
            {/* O ":id" significa que ele aceita /product/1, /product/2, etc */}
            <Route path="/product/:id" element={<Product />} />
            
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
