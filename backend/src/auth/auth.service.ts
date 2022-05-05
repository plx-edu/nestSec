import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(':::: validateUser AuthService');
    const user = await this.usersService.findOne(username, pass);

    if (user && user.username === username) {
      const { password, ...result } = user;

      console.log(':::: validateUser AuthService result', result);
      console.log(':::: validateUser AuthService user', user);
      return result;
    }

    return null;
  }

  async login(user: any) {
    console.log(':::: login AuthService');
    // const payload = { username: user.username, sub: user.userId };
    const payload = { username: user.username, sub: user.id };
    console.log(':::: login AuthService payload', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
