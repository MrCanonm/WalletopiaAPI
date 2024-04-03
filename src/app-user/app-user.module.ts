import { Module } from '@nestjs/common';
import { AppUserService } from './app-user.service';
import { AppUserController } from './app-user.controller';
import { AppUser } from './entities/app-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AppUser])],
  controllers: [AppUserController],
  providers: [AppUserService],
})
export class AppUserModule {}
