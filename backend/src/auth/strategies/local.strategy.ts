import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // super();
    // temporary "more fields" testing
    super();
  }

  async validate(
    username: string,
    password: string,
    email: any,
    phone: string,
  ): Promise<any> {
    console.log('local strat');
    console.log('local username: ', username);
    console.log('local email: ', email);
    console.log('local phone: ', phone, '\n');

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      console.log('if');

      throw new UnauthorizedException();
    }
    return user;
  }
}
