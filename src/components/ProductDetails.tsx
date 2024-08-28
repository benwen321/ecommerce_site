/*import { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Product } from '../types/Product';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2">
        <img src={product.imageUrl} alt={product.name} className="w-full h-auto" />
      </div>
      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-gray-600 mt-2">${parseFloat(product.price).toFixed(2)}</p>
        <div className="mt-6 flex items-center">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="mx-4">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
        <button 
          onClick={() => addToCart(product, quantity)}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} */