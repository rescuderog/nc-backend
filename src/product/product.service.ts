import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { Producto } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<Producto[]> {
    return this.prisma.producto.findMany();
  }

  async getProductById(id: number): Promise<Producto> {
    return this.prisma.producto.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createProduct(data: Producto): Promise<Producto> {
    return this.prisma.producto.create({
      data,
    });
  }

  async updateProduct(id: number, data: Producto): Promise<Producto> {
    return this.prisma.producto.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deleteProduct(id: number): Promise<Producto> {
    return this.prisma.producto.delete({
      where: {
        id,
      },
    });
  }
}
