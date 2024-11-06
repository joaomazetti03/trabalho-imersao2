import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';  
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    PassportModule,  
    JwtModule.register({
      secret: '7CFH1ZFK7beiJZQExFjmMfrvOuUPCi6UcsUZllobz8dEH6rOWKKmEQ7p0GjxSGss',  
      signOptions: { expiresIn: '60s' },  
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy],  
  exports: [AuthService],
})
export class AuthModule {}
