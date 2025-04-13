import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 20)
  name: string;

  @IsString()
  password: string;
}
