import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'videojuegos' })
  category_name: string;

  @ApiProperty({ example: 'car' })
  icon_name: string;
  @ApiProperty({ example: false })
  isDefault: boolean;
}
