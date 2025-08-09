import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // read and validate secret before calling super()
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      // fail fast so you see a clear runtime error instead of weird TS/Passport errors
      throw new Error('JWT_SECRET is not set in configuration');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const userId = payload.userId ?? payload.sub;
    if (!userId) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { userId };
  }
}
