import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryDTO } from "./DTO/categories.dto";

@Controller("categories")
export class IndexController {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    @Get()
    async index() {
        const categories = await this.categoryRepository.find();
        return {
            success: true,
            data: categories,
        };
    }

    @Get(":id")
    async find(@Param("id") id: number) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new NotFoundException(`Categoria com id '${id}' não encontrada.`);
        }
        return category;
    }

    @Post()
    async create(@Body() categoryDto: CategoryDTO) {
        try {
            const category = this.categoryRepository.create(categoryDto);
            const savedCategory = await this.categoryRepository.save(category);
            return {
                success: true,
                message: "Categoria criada com sucesso!",
                data: savedCategory,
            };
        } catch (error) {
            throw new HttpException('Erro ao criar categoria', HttpStatus.BAD_REQUEST);
        }
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() categoryDTO: CategoryDTO) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new NotFoundException(`Categoria com id '${id}' não encontrada.`);
        }

        Object.assign(category, categoryDTO); // Atualiza todas as propriedades de uma vez

        const updatedCategory = await this.categoryRepository.save(category);
        return {
            success: true,
            message: "Categoria atualizada com sucesso!",
            data: updatedCategory,
        };
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Categoria com id '${id}' não encontrada.`);
        }
        return {
            success: true,
            message: "Categoria deletada com sucesso!"
        };
    }
}