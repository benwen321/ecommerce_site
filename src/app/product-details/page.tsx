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
        // fetch product details from API based on the provided ID
        const response = await fetch("/api/product?id=5");  //modify this line based off the id of the product entry, if the id is 2, change the 5 to 2 
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        // parse the response data
        const data = await response.json();
        // set product state with the first item if data is an array
        setProduct(Array.isArray(data) ? data[0] : data);
        // set similar products state
        setSimilarProducts(Array.isArray(data) ? data : [data]);
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
  if (!product) return <div>No product found</div>;

  // creating duplicate products to populate the grid
  const duplicatedProducts = similarProducts.length > 0 ? Array(6).fill(similarProducts[0]) : [];

  return (
    <div className="bg-white min-h-screen font-sans">
      <main className="max-w-[1024px] mx-auto">
        <div className="flex flex-col md:flex-row pt-4 mb-8 relative">
          {/* main product image */}
          <div className="md:w-1/2 h-[512px] relative overflow-hidden rounded-xl">
            <img
              src="images/square_airpod_card.png"
              alt="Featured Product"
              className="w-full h-full object-contain object-left"
            />
          </div>
          
          {/* product details section */}
          <div className="md:w-1/2 pl-4 flex flex-col">
            {/* product name and description */}
            <div className="mt-[122px] ml-[20px]">
              <h1 className="text-[40pt] font-medium mb-4 text-black">{product.name}</h1>
              <p className="text-sm font-light leading-[var(--Fontline-heightsm)] tracking-[var(--Fontletter-spacingxs)] text-[rgba(161,161,170,1)] mb-4">
                {product.description}
              </p>
              {/* price and add to cart button */}
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

        {/* line under the product section */}
        <div className="flex justify-center mb-8">
          <div className="w-[600px] h-[1px] bg-[rgba(161,161,170,1)]" />
        </div>

        {/* similar products header */}
        <h2 className="text-[32px] font-[500] leading-[var(--Fontline-heightlg)] tracking-[var(--Fontletter-spacingxs)] text-left text-black font-inter mb-5">
          Similar Products
        </h2>

        {/* centering the grid layout */}
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
