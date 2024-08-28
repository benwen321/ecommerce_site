import { useState } from "react";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const addToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity })
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md w-[300px] h-[338px]">
      <img
        src={'/images/airpod_card.png'}
        alt={product.name}
        className="w-[276px] h-[155px] rounded-lg object-cover mx-auto mt-2"
      />
      <div className="p-4 pt-1">
        <h3 className="font-sans text-[18pt] font-medium leading-[var(--Fontline-heightlg)] tracking-[var(--Fontletter-spacingxs)] text-left text-black">
          {product.name}
        </h3>
        <p className="font-sans text-sm font-light leading-[var(--Fontline-heightsm)] tracking-[var(--Fontletter-spacingxs)] text-left text-[rgba(161,161,170,1)] mt-0 line-clamp-4">
          {product.description}
        </p>
        <div className="mt-1 flex justify-between items-center">
        <span className="font-sans text-[12pt] font-bold text-black pr-[14px] pl-[14px]">
          ${parseFloat(product.price).toFixed(2)}
        </span>
          {quantity === 1 ? (
            <button onClick={addToCart} className="w-[178px] h-[40px] rounded-lg">
              <img
                src="/images/add-to-cart.png"
                alt="Add to Cart"
                className="w-full h-full rounded-lg object-cover"
              />
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button onClick={decrementQuantity} className="bg-gray-200 text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">-</button>
              <span className="w-8 text-center">{quantity}</span>
              <button onClick={incrementQuantity} className="bg-gray-200 text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}