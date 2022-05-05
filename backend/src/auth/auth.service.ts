import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log(':::: validateUser AuthService');
    const user = await this.usersService.findOne(password);

    if (user && user.name === username) {
      const { name, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    console.log(':::: login AuthService');
    const payload = { username: user.username, sub: user.userId };
    console.log(':::: login AuthService payload', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
