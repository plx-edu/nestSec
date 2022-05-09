import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Enable authentication globally (2)
  constructor(private reflector: Reflector){
super();
  }
  // Tutorial follow up
  // Extending guards (1)
  canActivate(context: ExecutionContext){
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    console.log(":: canActivate()");

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if(isPublic){
      return true;
    }

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
