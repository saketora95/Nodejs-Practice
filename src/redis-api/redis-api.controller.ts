import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RedisApiService } from './redis-api.service';
import { SetDataDto } from './dto/set-data.dto';

@ApiTags('Redis API')
@Controller('redis-api')
export class RedisApiController {
    constructor(private readonly redisAPIService: RedisApiService) {}

    // GET
    @Get(':key')
    async getData(@Param('key') key: string): Promise<string> {
        return await this.redisAPIService.getData(key);
    }
    
    // SET
    @Post()
    setData(@Body() data: SetDataDto) {
        return this.redisAPIService.setData(data['key'], data['value']);
    }

    // DEL
    @Get('DEL/:key')
    deleteData(@Param('key') key: string) {
        return this.redisAPIService.deleteData(key);
    }
}
