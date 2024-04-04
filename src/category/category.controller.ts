import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/utils/user-login';

@ApiBearerAuth()
@ApiCookieAuth()
@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @User() user) {
    return this.categoryService.create(createCategoryDto, user.access_name);
  }

  // ONLY  TEST
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProtectedData(@User() user) {
    // Aquí puedes acceder a la información del usuario autenticado
    console.log(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user) {
    return this.categoryService.findAll(user.access_name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user,
  ) {
    return this.categoryService.update(
      +id,
      updateCategoryDto,
      user.access_name,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
