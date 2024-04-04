import { Injectable, NotFoundException } from '@nestjs/common';
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
  resourceUsing = 'Categoria';

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

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    created_by: string,
  ) {
    const existingItem = await this.categoryRepo.findOne({
      where: { id: id, isDefault: false, created_by },
    });
    if (!existingItem) {
      throw new NotFoundException(`No existe la ${this.resourceUsing}`);
    }
    Object.assign(existingItem, {
      ...updateCategoryDto,
    });
    return await this.categoryRepo.save(existingItem);
  }

  async remove(id: number) {
    const existingItem = await this.categoryRepo.findOne({ where: { id: id } });

    if (!existingItem) {
      throw new NotFoundException(`No se encontro la ${this.resourceUsing}`);
    }

    existingItem.deleted = true;
    await this.categoryRepo.save(existingItem);
  }
}
