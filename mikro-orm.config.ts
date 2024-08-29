import { defineConfig } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Product } from './src/entities/Product';
import { Cart } from './src/entities/Cart';

export default defineConfig({
  entities: [Product, Cart],
  dbName: 'YOUR DB_NAME', //CHANGE THIS TO YOUR DATABASE NAME
  user: 'root', //CHANGE THIS TO YOUR USERNAME
  password: 'YOUR PASSWORD', //CHANGE THIS TO YOUR PASSWORD
  host: 'localhost',
  port: 3306,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,  
});