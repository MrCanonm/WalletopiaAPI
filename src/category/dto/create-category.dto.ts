import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'videojuegos' })
  category_name: string;

  @ApiProperty()
  icon_name: string;
  isDefault: boolean;
}
