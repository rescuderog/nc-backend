import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "@prisma/client";


@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('')
    async getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Post('')
    async createCategory(@Body() data: Category) {
        return this.categoryService.addCategory(data);
    }

    @Put(':id')
    async updateCategory(@Param('id') id: string, @Body() data: Category) {
        try {
            return await this.categoryService.updateCategory(Number(id), data);
        } catch (error) {
            throw new NotFoundException('Category does not exists');
        }
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        try {
            return await this.categoryService.deleteCategory(Number(id));
        } catch (error) {
            throw new NotFoundException('Category does not exists');
        }
    }
}