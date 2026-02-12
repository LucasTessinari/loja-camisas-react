import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Importando as páginas
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      {/* O div abaixo força o footer a ficar no final (flex-col e min-h-screen) */}
      <div className="flex flex-col min-h-screen bg-brand-dark">
        <Header />
        
        {/* Main com padding para o conteúdo não colar na borda */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/produto" element={<Product />} />
            <Route path="/carrinho" element={<Cart />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
