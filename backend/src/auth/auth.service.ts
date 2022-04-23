import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('auth val');
    console.log('auth username: ', username);
    console.log('auth password: ', password);

    const user = await this.usersService.findOne(password);
    // console.log('auth user: ', user);

    if (user && user.name === username) {
      const { name, ...result } = user;
      // console.log('auth if user: ', user);

      return result;
    }

    return null;
  }
}
