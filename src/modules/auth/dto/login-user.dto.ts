import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Length(8, 20)
  @IsEmail()
  email: string;

  @IsString({ message: 'Password phải là string' })
  @Length(2, 20)
  //  @Matches(
  //    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  //    {
  //      message:
  //        'Password phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
  //    },
  //  )
  password: string;
}
