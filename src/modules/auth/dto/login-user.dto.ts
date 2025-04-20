import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Length(8, 20)
  @IsEmail()
  email: string;

  @IsString({ message: 'Password phải là string' })
  @Length(2, 20)
  password: string;
}
