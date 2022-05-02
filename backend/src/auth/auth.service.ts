import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(password);

    if (user && user.name === username) {
      const { name, ...result } = user;

      return result;
    }

    return null;
  }
}
