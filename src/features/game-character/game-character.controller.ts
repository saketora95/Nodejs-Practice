import { Body, Controller, Get, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { GameCharacterService } from './game-character.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SetChatacterDto } from './dto/set-character.dto';

@ApiTags('Game Character')
@Controller('game-character')
export class GameCharacterController {
    constructor(private readonly gameCharacterService: GameCharacterService) {}

    @UseInterceptors(CacheInterceptor)
    @Get(':name')
    async getJobByName(@Param('name') name: string) {
        return await this.gameCharacterService.getJobByName(name);
    }

    // 設置 ApiResponse
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The video info has been successfully created.',
    })
    @Post()
    setCharacter(@Body() data: SetChatacterDto) {
        return this.gameCharacterService.setCharacter(data['name'], data['level']);
    }
}
