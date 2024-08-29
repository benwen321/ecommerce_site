import { MikroORM } from '@mikro-orm/mysql';
import { Product } from '../src/entities/Product';
import config from '../mikro-orm.config'; // Adjust the path as needed

async function seedDatabase() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  try {
    // Delete all existing products
    await em.nativeDelete(Product, {});
    console.log('All existing products deleted');

    // Define the new product to add
    const newProduct = {
      name: 'Product Name',
      description: 'Product description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, felis ut tempor tempor, tellus eros scelerisque est, quis finibus arcu libero viverra augue. Duis consequat, lacus at ornare faucibus, dolor metus iaculis ipsum, a pellentesque dolor augue vel magna. Donec tristique vel diam eu suscipit. Praesent nec felis risus. Duis consequat, lacus at ornare faucibus, dolor metus iaculis ipsum, a pellentesque dolor augue vel magna. Donec tristique vel diam eu suscipit. Praesent nec felis risus.',
      price: 189.99,
      imageUrl: 'https://www.wsj.com/buyside/content-images/1be62ca6-8c77-4965-9f13-b0612c8e3d84?width=472&height=266&pixel_ratio=2&size=hero_472x266'
    };

    // Add the new product
    const product = em.create(Product, newProduct);
    await em.persistAndFlush(product);
    console.log(`Added product: ${product.name} with ID: ${product.id}`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await orm.close();
  }
}

seedDatabase().catch(console.error);
