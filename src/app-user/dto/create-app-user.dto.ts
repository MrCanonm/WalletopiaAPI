import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAppUserDto {
  @ApiProperty({
    example: 'Luis Daniel',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'user',
  })
  @IsString()
  @IsNotEmpty()
  user_icom_name: string;

  @ApiProperty({
    example: 'Prueba1',
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'PassPrueba2024!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  password: string;

  @ApiProperty({
    example: 'PassPrueba2024!',
  })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;

  @ApiProperty({
    example: 'prueba15@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;
}
