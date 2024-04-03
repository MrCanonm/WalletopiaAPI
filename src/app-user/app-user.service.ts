import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppUserDto } from './dto/create-app-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUser } from './entities/app-user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AppUserService {
  constructor(
    @InjectRepository(AppUser)
    private readonly appUserRepo: Repository<AppUser>,
  ) {}
  resourceUsing = 'El Usuario Indicado';
  async create(createAppUserDto: CreateAppUserDto) {
    const { userName, password, passwordConfirm } = createAppUserDto;
    const existingUser = await this.appUserRepo.findOne({
      where: { access_name: userName },
    });

    if (existingUser) {
      throw new ConflictException(
        `Conflicto: ${this.resourceUsing} ${userName} ya existe`,
      );
    }
    if (password != passwordConfirm) {
      throw new ConflictException(`Contraseñas no son iguales`);
    }

    const hashedPassword = await hash(password, 10);

    const userToRegister = plainToClass(AppUser, {
      ...createAppUserDto,
      access_name: createAppUserDto.userName,
      access_hash: hashedPassword,
    });

    await this.appUserRepo.save(userToRegister);

    const userResponse = {
      ...userToRegister,
      access_hash: undefined,
      access_name: undefined,
      hash: undefined,
      id: undefined,
    };

    return userResponse;
  }

  // findAll() {
  //   return `This action returns all appUser`;
  // }

  async findOne(id: string) {
    const existingItem = await this.appUserRepo.findOne({
      where: { id: id, deleted: false, status: true },
    });

    if (!existingItem) {
      throw new NotFoundException(`No existe el ${this.resourceUsing}`);
    }
    return existingItem;
  }

  // update(id: number, updateAppUserDto: UpdateAppUserDto) {
  //   return `This action updates a #${id} appUser`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} appUser`;
  // }
}
