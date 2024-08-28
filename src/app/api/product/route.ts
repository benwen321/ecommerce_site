import { NextRequest, NextResponse } from 'next/server';
import { MikroORM } from '@mikro-orm/mysql';
import { Product } from '../../../entities/Product'; // Adjust the path as needed
import config from '../../../../mikro-orm.config'; // Adjust the path as needed

export async function GET(request: NextRequest) {
  try {
    console.log('Initializing ORM');
    const orm = await MikroORM.init(config);
    const em = orm.em.fork();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('Received ID:', id);

    let products;

    if (id) {
      console.log('Fetching product with ID:', Number(id));
      const product = await em.findOne(Product, { id: Number(id) });
      console.log('Found product:', product);
      products = product ? [product] : [];
    } else {
      console.log('Fetching all products');
      products = await em.find(Product, {});
    }

    await orm.close();

    if (products.length > 0) {
      console.log('Returning products:', products);
    
      // Log the type of price for each product
      products.forEach((product) => {
        console.log('Product price type:', typeof product.price); // Should log 'number'
      });
    
      return NextResponse.json(products);
    
    } else {
      console.log('No products found');
      return NextResponse.json({ error: 'No products found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}