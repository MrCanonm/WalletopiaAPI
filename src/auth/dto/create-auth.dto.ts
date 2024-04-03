import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'Prueba1',
  })
  @IsString()
  @IsNotEmpty()
  userNameOrEmail: string;

  @ApiProperty({
    example: 'PassPrueba2024!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
