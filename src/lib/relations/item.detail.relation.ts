import { Item, ItemDetail } from 'src/entities';
import { FindOptionsRelations } from 'typeorm';

const getItemDetailRelation = (
  inner: FindOptionsRelations<ItemDetail>,
): FindOptionsRelations<Item> => ({
  macbook: { ...inner },
  ipad: { ...inner },
  iphone: { ...inner },
});

export { getItemDetailRelation };
