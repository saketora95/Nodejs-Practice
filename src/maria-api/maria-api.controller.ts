import { Controller } from '@nestjs/common';

// Swagger
import { ApiTags } from '@nestjs/swagger';

// MariaDB & TypeORM
import { Body, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { FruitPrice } from './maria-api.entity';
import { MariaApiService } from './maria-api.service';

@ApiTags('MariaDB API')
@Controller('maria-api')
export class MariaApiController {
    constructor(private readonly mariaApiService: MariaApiService){}

    @Post()
    async createFruit(@Res() response, @Body()fruit: FruitPrice) {
        const newFruit = await this.mariaApiService.createFruit(fruit);
        return response.status(HttpStatus.CREATED).json({
            newFruit
        })
    }

    @Get()
    async fetchAll(@Res() response) {
        const fruits = await this.mariaApiService.findAll();
        return response.status(HttpStatus.OK).json({
            fruits
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const fruit = await this.mariaApiService.findOne(id);
        return response.status(HttpStatus.OK).json({
            fruit
        })
    }

    @Post('/update')
    async updateById(@Res() response, @Body()fruit: FruitPrice) {
        const updateFruitResult = await this.mariaApiService.updateFruit(fruit);
        return response.status(HttpStatus.CREATED).json({
            updateFruitResult
        })
    }

    @Post('/delete')
    async deleteById(@Res() response, @Body('id') fruit_id: number) {
        const deleteFruitResult = await this.mariaApiService.deleteFruit(fruit_id);
        return response.status(HttpStatus.CREATED).json({
            deleteFruitResult
        })
    }

}
