import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Producto } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  async createProduct(@Body() data: Producto) {
    return this.productService.createProduct(data);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.getProductById(Number(id));
    if (!product) throw new NotFoundException('Product does not exists');
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productService.deleteProduct(Number(id));
    } catch (error) {
      throw new NotFoundException('Product does not exists');
    }
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() data: Producto) {
    try {
      return await this.productService.updateProduct(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Product does not exists');
    }
  }
}
