import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class ProductModule { }
