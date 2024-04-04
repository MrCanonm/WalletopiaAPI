import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  status?: boolean;
}
