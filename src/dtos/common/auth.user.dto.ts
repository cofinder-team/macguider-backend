import { Role } from 'src/lib/enums/user.role.enum';

export class AuthUserDto {
  id: number;
  email: string;
  password: string;
  refreshToken: string;
  role: Role;
  uuid: string;
  certified: boolean;
}
