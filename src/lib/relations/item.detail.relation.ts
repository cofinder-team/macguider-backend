import { Item, ItemDetailEntity } from 'src/entities';
import { FindOptionsRelations } from 'typeorm';

const getItemDetailRelation = (
  inner: FindOptionsRelations<ItemDetailEntity>,
): FindOptionsRelations<Item> => ({
  macbook: { ...inner },
  ipad: { ...inner },
  iphone: { ...inner },
});

export { getItemDetailRelation };
