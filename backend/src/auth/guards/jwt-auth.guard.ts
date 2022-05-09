import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Tutorial follow up
  // Extending guards (1)
  canActivate(context: ExecutionContext){
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    console.log(":: canActivate()");
    return super.canActivate(context);
  }
  
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(":: handleRequest()");
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
