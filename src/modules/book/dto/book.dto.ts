import { Expose, Transform } from 'class-transformer';
import * as moment from 'moment';

export class BookDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  year: number;

  @Expose()
  available: boolean;

  @Transform(({ value }) => moment(value).format('HH:mm:ss DD/MM/YYYY'))
  updatedAt: string;

  @Transform(({ value }) => moment(value).format('HH:mm:ss DD/MM/YYYY'))
  createdAt: string;
}
