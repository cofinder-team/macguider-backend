import { PaginationDto } from 'src/dtos/common/pagination.dto';
import { FindOptionsPage } from '../types/page.type';

const paginate = ({ page, size }: PaginationDto): FindOptionsPage => ({
  skip: (page - 1) * size,
  take: size,
});

export { paginate };
