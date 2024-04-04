import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto, created_by: string) {
    const newCategoria = this.categoryRepo.create({
      ...createCategoryDto,
      created_by,
    });

    return this.categoryRepo.save(newCategoria);
  }

  async findAll(created_by: string) {
    return await this.categoryRepo.find({
      where: { deleted: false, created_by },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
