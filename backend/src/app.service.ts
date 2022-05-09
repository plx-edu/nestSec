import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    // return 'Greetings and Salutations!';
    return {
      Greetings: "Salutations!"
    }
  }
}
