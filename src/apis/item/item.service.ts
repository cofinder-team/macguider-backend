import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDetailEntity, ItemIpad, ItemMacbook } from 'src/entities';
import { ItemRepository } from 'src/repositories';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemrepository: ItemRepository,
    @InjectRepository(ItemMacbook)
    private readonly itemMacbookRepository: Repository<ItemMacbook>,
    @InjectRepository(ItemIpad)
    private readonly itemIpadRepository: Repository<ItemIpad>,
  ) {}

  private findRepositoryByType(type: string): Repository<ItemDetailEntity> {
    switch (type) {
      case 'M':
        return this.itemMacbookRepository;
      case 'P':
        return this.itemIpadRepository;
      default:
        throw new EntityNotFoundError(ItemDetailEntity, type);
    }
  }

  async getItems(): Promise<ItemDetailEntity[]> {
    const items = await this.itemrepository.find({
      order: { type: 'ASC', id: 'ASC' },
    });
    return Promise.all(items.map(({ type, id }) => this.getItem(type, id)));
  }

  async getItem(type: string, id: number): Promise<ItemDetailEntity> {
    const repository = this.findRepositoryByType(type);
    return repository.findOneOrFail({
      where: { id },
      relations: ['modelEntity'],
    });
  }
}
