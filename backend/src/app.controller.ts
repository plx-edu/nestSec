import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { Public } from './public.decorator';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Public()
  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    console.log(':::: login AppController');
    console.log(':::: login req.user:', req.user);

    // return req.user;

    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    console.log(':::: getProfile AppController');
    console.log(':::: getProfile req.user:', req.user);
    return req.user;
  }
}
