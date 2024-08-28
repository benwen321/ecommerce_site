import { NextApiRequest, NextApiResponse } from 'next';
import { getEntityManager } from '../lib/api';
import { Cart } from '../entities/Cart';
import { Product } from '../entities/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const em = await getEntityManager();

  if (req.method === 'GET') {
    try {
      const cartItems = await em.find(Cart, {}, { populate: ['product'] });
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart' });
    }
  } else if (req.method === 'POST') {
    try {
      const { productId, quantity } = req.body;
      const product = await em.findOne(Product, { id: productId });
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const cartItem = em.create(Cart, { product, quantity });
      await em.persistAndFlush(cartItem);

      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}