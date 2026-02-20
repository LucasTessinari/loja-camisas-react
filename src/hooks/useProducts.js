import { useEffect, useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error('Erro ao carregar produtos', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { products, loading };
}
