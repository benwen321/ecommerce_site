import { MikroORM, EntityManager } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { Product } from '../entities/Product';
import { Cart } from '../entities/Cart';

let orm: MikroORM<MySqlDriver>;

export async function getORM() {
  if (!orm) {
    orm = await MikroORM.init<MySqlDriver>({
      entities: [Product, Cart],
      dbName: 'your_database_name',
      driver: MySqlDriver, // Specify MySqlDriver here
      user: 'your_username',  // Add your database user
      password: 'your_password', // Add your database password
      // Add other necessary configuration options
    });
  }
  return orm;
}

export async function getEntityManager(): Promise<EntityManager<MySqlDriver>> {
  const orm = await getORM();
  return orm.em.fork(); // Creates a forked EntityManager for isolation
}

export async function getAllProducts(): Promise<Product[]> {
  const em = await getEntityManager();
  return em.find(Product, {});
}

export async function getProductById(id: number): Promise<Product | null> {
  const em = await getEntityManager();
  return em.findOne(Product, { id });
}

export async function getSimilarProducts(productId: number, limit: number = 4): Promise<Product[]> {
  const em = await getEntityManager();
  // This is a simple implementation. You might want to improve it based on your specific criteria for similarity
  return em.find(Product, { id: { $ne: productId } }, { limit });
}

// Add more API functions as needed
