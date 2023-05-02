import { Body, Controller, Get, Post, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { generateJwt } from 'src/utils/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { BearerGuard } from 'src/bearerGuard/bearerGuard.guard';

@Controller('auth')
export class AuthController extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  @Post('register')
  async register(@Body() userData: User, @Res() res: Response) {  
    const user = await this.authService.createUser(userData);
    if(!user) {
      res.status(HttpStatus.BAD_REQUEST).json({ err: 'Something went wrong' });
    }
    
    const token = await generateJwt({ email: user.email, userId: user.id }, process.env.SECRET, process.env.EXPIRES);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(HttpStatus.CREATED).json({ data: user });
  }

  @Post('login')
  async login(@Body() userData: User, @Res() res: Response) {
    const user = await this.authService.signIn(userData);

    if (!user) {
      res.status(HttpStatus.BAD_REQUEST).json({ err: 'Something went wrong' });
    }

    const token = await generateJwt({ email: user.email, userId: user.id }, process.env.SECRET, process.env.EXPIRES);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(HttpStatus.OK).json({ data: user });
  }

  @Get('logout')
  @UseGuards(BearerGuard)
  async logout(@Res() res: Response, @Req() req: Request) {
    res.setHeader('Authorization', '');
    return { message: 'Logout successful' };
  }
}
