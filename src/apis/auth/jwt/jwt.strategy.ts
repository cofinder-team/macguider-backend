import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/apis/user/user.service';
import { TokenPayloadDto } from 'src/dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(token: TokenPayloadDto): Promise<TokenPayloadDto> {
    const { id } = token;
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자 정보입니다.');
    }
    return token;
  }
}