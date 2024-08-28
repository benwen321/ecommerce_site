// utility_scripts/createSchema.ts
import { MikroORM } from '@mikro-orm/mysql';
import config from '../mikro-orm.config';

(async () => {
  const orm = await MikroORM.init(config);

  const generator = orm.getSchemaGenerator();

  try {
    await generator.updateSchema();
    console.log('Schema updated successfully');
  } catch (error) {
    console.error('Error updating schema:', error);
  } finally {
    await orm.close();
  }
})();