// src/contexts/CartContext.tsx
'use client'; // this line makes the file a client component

import React, { createContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

// interface for a single item in the cart
interface CartItem {
  product: Product;
  quantity: number;
}

// interface for the context value
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// create a context with default values
export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

// provider component for the cart context
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // state to hold the cart items
  const [cart, setCart] = useState<CartItem[]>([]);

  // load the cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // save the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // function to add a product to the cart
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        // update quantity if the product is already in the cart
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // add new item if it's not already in the cart
      return [...prevCart, { product, quantity }];
    });
  };

  // function to remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // function to update the quantity of a product in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, quantity) } // prevent negative quantity
          : item
      ).filter(item => item.quantity > 0) // remove items with zero quantity
    );
  };

  // function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
