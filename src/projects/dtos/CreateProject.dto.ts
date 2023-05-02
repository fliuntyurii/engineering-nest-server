import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  photos: string[];
}