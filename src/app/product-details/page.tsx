"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { ProductCard } from "../../components/ProductCard";
import { Product } from "../../types/Product";

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/product?id=3");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProduct(Array.isArray(data) ? data[0] : data);
        setSimilarProducts(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  // Creating duplicate products to populate the grid
  const duplicatedProducts = similarProducts.length > 0 ? Array(6).fill(similarProducts[0]) : [];

  return (
    <div className="bg-white min-h-screen font-sans">
      <main className="max-w-[1024px] mx-auto">
        <div className="flex flex-col md:flex-row pt-4 mb-8 relative">
          {/* Main product image */}
          <div className="md:w-1/2 h-[512px] relative overflow-hidden rounded-xl">
            <img
              src="images/square_airpod_card.png"
              alt="Featured Product"
              className="w-full h-full object-contain object-left"
            />
          </div>
          
          {/* Product details section */}
          <div className="md:w-1/2 pl-4 flex flex-col">
            {/* Product name and description */}
            <div className="mt-[122px] ml-[20px]">
              <h1 className="text-[40pt] font-medium mb-4 text-black">{product.name}</h1>
              <p className="text-sm font-light leading-[var(--Fontline-heightsm)] tracking-[var(--Fontletter-spacingxs)] text-[rgba(161,161,170,1)] mb-4">
                {product.description}
              </p>
              {/* Price and Add to Cart Button */}
              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold text-black text-[14pt] pt-[10px] pb-[10px] pr-[14px] pl-[14px]">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
                <button>
                  <img
                    src="/images/add-to-cart.png"
                    alt="Add to Cart"
                    className="w-[178px] h-[40px] object-cover rounded-lg"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Line under the product section */}
        <div className="flex justify-center mb-8">
          <div className="w-[600px] h-[1px] bg-[rgba(161,161,170,1)]" />
        </div>

        {/* Similar Products header */}
        <h2 className="text-[32px] font-[500] leading-[var(--Fontline-heightlg)] tracking-[var(--Fontletter-spacingxs)] text-left text-black font-inter mb-5">
          Similar Products
        </h2>

        {/* Centering the grid layout */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[62px] gap-y-[20px] w-[1024px]">
            {duplicatedProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}