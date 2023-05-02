import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { verifyJwt } from 'src/utils/jwt';

@Injectable()
export class BearerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization?.split(' ')[1];
    
    const isVerify = verifyJwt(bearerToken, process.env.SECRET);
    
    if(!bearerToken || !isVerify) {
      return false;
    }
    return true;
  }
}