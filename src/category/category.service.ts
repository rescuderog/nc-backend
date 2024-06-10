import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async getAllCategories(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }

    async addCategory(data: Category): Promise<Category> {
        return this.prisma.category.create({
            data
        });
    }

    async deleteCategory(id: number): Promise<Category> {
        return this.prisma.category.delete({
            where: {
                id,
            },
        });
    }

    async updateCategory(id: number, data: Category): Promise<Category> {
        return this.prisma.category.update({
            where: {
                id: id,
            },
            data,
        });
    }
}