// src/pages/_app.tsx
import '../app/globals.css'; // Import your global CSS here
import { CartProvider } from '../contexts/CartContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
