import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor() {
    console.log('new user instance');
  }
  getUser() {
    return 'user';
  }
}
