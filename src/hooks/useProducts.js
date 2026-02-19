import { useEffect, useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:5000/api/products');
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
