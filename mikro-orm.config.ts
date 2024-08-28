import { defineConfig } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Product } from './src/entities/Product';
import { Cart } from './src/entities/Cart';

export default defineConfig({
  entities: [Product, Cart],
  dbName: 'wise_cities_db',
  user: 'root',
  password: 'Letmegetin3!',
  host: 'localhost',
  port: 3306,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,  // Set to false in production
});