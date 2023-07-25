import { FindManyOptions } from 'typeorm';

type FindOptionsPage = Pick<FindManyOptions, 'skip' | 'take'>;

export { FindOptionsPage };
