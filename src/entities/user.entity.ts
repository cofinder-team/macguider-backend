import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'macguider', name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
