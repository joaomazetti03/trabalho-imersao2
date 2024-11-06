import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '7CFH1ZFK7beiJZQExFjmMfrvOuUPCi6UcsUZllobz8dEH6rOWKKmEQ7p0GjxSGss',  
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
