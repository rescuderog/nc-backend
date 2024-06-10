import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Producto } from '@prisma/client';
import * as fs from 'fs';
interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

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

  async createProduct(data: any, file: UploadedFile): Promise<Producto> {
    if (!file || !file.buffer || !file.originalname) {
      throw new Error('El objeto de archivo no es válido');
    }

    // Subir imagen y obtener su ruta
    const imagePath = `uploads/${Date.now()}-${file.originalname}`;
    await this.saveImage(file, imagePath);

    const parsedData = JSON.parse(data.data);

    return this.prisma.producto.create({
      data: {
        ...parsedData,
        precio: parseFloat(parsedData.precio),
        published: parsedData.published === 'true',
        imagen: imagePath,
      },
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

  private async saveImage(file: any, path: string): Promise<void> {
    if (!file || !file.buffer || !file.originalname) {
      throw new Error('El objeto de archivo no es válido');
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(path, file.buffer, (err: NodeJS.ErrnoException | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
