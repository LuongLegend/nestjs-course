import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './interface/class.interface';

@Injectable()
export class ClassService {
  private readonly class: Class[] = [{ name: '12A', id: 1, year: 2014 }];

  findAll() {
    return this.class;
  }

  createClass(data: Class) {
    this.class.push(data);
    return this.class;
  }
}
