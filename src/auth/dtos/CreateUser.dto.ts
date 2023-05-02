import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}