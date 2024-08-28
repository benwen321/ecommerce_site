/*'use client'

import { useEffect, useState } from 'react';
import ProductDetails from '../../../components/ProductDetails';
import { ProductCard } from '../../../components/ProductCard';
import { Product } from '../../../types/Product';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    }
    async function fetchSimilarProducts() {
      const response = await fetch(`/api/products/similar/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setSimilarProducts(data);
      }
    }
    fetchProduct();
    fetchSimilarProducts();
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <ProductDetails product={product} />
      <h2 className="text-2xl font-bold mt-12 mb-6">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}*/