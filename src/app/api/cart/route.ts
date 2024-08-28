import { NextRequest, NextResponse } from 'next/server';
import { MikroORM } from '@mikro-orm/core';
import { Cart } from '../../../entities/Cart'; // Adjust the path as needed
import { Product } from '../../../entities/Product'; // Adjust the path as needed
import config from '../../../../mikro-orm.config'; // Adjust the path as needed

export async function POST(request: NextRequest) {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  try {
    const { productId, quantity } = await request.json();

    // Find the product by ID
    const product = await em.findOne(Product, { id: productId });
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Create a new cart item
    const cartItem = em.create(Cart, { product, quantity });
    await em.persistAndFlush(cartItem);

    return NextResponse.json({ message: 'Product added to cart', cartItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding to cart:', error);
  
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error adding to cart', error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ message: 'Error adding to cart', error: 'Unknown error' }, { status: 500 });
  } finally {
    await orm.close();
  }
}