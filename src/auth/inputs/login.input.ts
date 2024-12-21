import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInputs {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
