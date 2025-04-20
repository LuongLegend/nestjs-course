import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipes extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    //Nếu k có MetaType như là DTO
    if (!metadata.metatype) {
      return value;
    }
    //Tự validate Tự trả lỗi
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const messageObj = errors[0]?.constraints;
      const errorMessage = messageObj ? Object.values(messageObj)[0] : 'Error';
      throw new BadRequestException(errorMessage);
    }
    return value;
  }
}
