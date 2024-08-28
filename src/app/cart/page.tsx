import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Product } from '../../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Convert price from string to number
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.product.price);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item: CartItem) => (
            <div key={item.product.id} className="flex items-center justify-between border-b py-4">
              <div>
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p>${parseFloat(item.product.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
