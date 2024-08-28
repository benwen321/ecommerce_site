'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function Header() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    setCartItemCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  return (
    <header className="bg-[#FFFFFF] w-full flex justify-center" style={{ height: '64px' }}>
      <div
        className="flex justify-between items-center text-black"
        style={{
          width: '1024px',
          height: '64px',
          borderBottom: '1px solid rgba(229, 231, 235, 0.72)',
          padding: '17px 0 23px 0',
        }}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Store Logo"
            width={127}
            height={32}
            priority
          />
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/cart" className="relative">
                <Image
                  src="/images/cart.png"
                  alt="Cart"
                  width={40}
                  height={40}
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}