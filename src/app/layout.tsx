// src/app/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { CartProvider } from '../contexts/CartContext';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../components/Header'), { ssr: false });
import './globals.css';

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}