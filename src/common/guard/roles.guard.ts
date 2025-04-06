import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Roles } from '../decorator/role.decorator';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest<Request>();
    //const user = request.user;
    return true;
    //return matchRole(roles, user.roles);
  }
}
