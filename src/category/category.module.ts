import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
    imports: [PrismaModule],
    providers: [PrismaService, CategoryService],
    controllers: [CategoryController]
})
export class CategoryModule { }
