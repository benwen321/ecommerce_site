"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link'; // Import the Link component
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/Product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/product?id=5"); //MODIFY THIS LINE BASED OFF THE ID OF THE PRODUCT ENTRY 
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : [data]);
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

  // Creating duplicate products to populate the grid
  const duplicatedProducts = products.length > 0 ? Array(6).fill(products[0]) : [];

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-[1024px] mx-auto">
        {/* Adjust the padding on the top of the image */}
        <div className="pt-[20px]">
          <Link href="/product-details" passHref>
            <div className="w-full h-[408px] relative overflow-hidden rounded-xl cursor-pointer">
              <img
                src="images/airpod_fullsize_img.png"
                alt="Featured Product"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Centering the grid layout */}
        <div className="flex justify-center pt-[20px]">
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