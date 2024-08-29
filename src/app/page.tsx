"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link'; 
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/Product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(() => {
    // check if code is running on the client-side
    if (typeof window === "undefined") return [];
    
    // retrieve products from localStorage
    const savedProducts = localStorage.getItem("products");
    // parse and return saved products or an empty array
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // fetch product details from API based on the provided ID
        const response = await fetch("/api/product?id=5"); //modify this line based off the id of the product entry, if the id is 2, change the 5 to 2 
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        // parse the response data
        const data = await response.json();
        // set products state with the fetched data
        setProducts(Array.isArray(data) ? data : [data]);
      } catch (err) {
        // set error message if fetch fails
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        // stop loading state regardless of success or failure
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // creating duplicate products to populate the grid
  const duplicatedProducts = products.length > 0 ? Array(6).fill(products[0]) : [];

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-[1024px] mx-auto">
        {/* adjust the padding on the top of the image */}
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

        {/* centering the grid layout */}
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
