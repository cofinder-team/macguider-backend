import { Role } from 'src/lib/types/role.type';

export class AuthUserDto {
  id: number;
  email: string;
  password: string;
  refreshToken: string;
  role: Role;
  uuid: string;
  certified: boolean;
}
