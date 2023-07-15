import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/repositories';

@Injectable()
export class ItemService {
  constructor(private readonly itemrepository: ItemRepository) {}
}
