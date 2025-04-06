import {
  IsBoolean,
  IsOptional,
  IsString,
  IsNumber,
  Length,
  MaxLength,
  IsPositive,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';

@ValidatorConstraint()
class Uppercase implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return typeof value === 'string' && value === value.toUpperCase();
  }
}

export class CreateProductDto {
  @IsString({ message: 'must be string hihi ' })
  @Length(5, 255)
  @Validate(Uppercase, { message: 'must be uppercase' })
  name: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
