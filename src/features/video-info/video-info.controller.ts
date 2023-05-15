import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { VideoInfoService } from './video-info.service';
import { CreateVideoInfoDto } from './dto/create-video-info.dto';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Video Info')
@Controller('video-info')
export class VideoInfoController {
    constructor(private readonly videoInfoService: VideoInfoService) {}

    // 設置 ApiHeader
    @ApiHeader({
        name: 'X-Custom',
        description: 'Try to set custom header.',
    })
    @Get(':id')
    getVideoInfo(@Param('id') id: string) {
        return this.videoInfoService.getVideoInfo(id);
    }

    // 設置 ApiResponse
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The video info has been successfully created.',
    })
    @Post()
    createVideoInfo(@Body() data: CreateVideoInfoDto) {
        return this.videoInfoService.createVideoInfo(data);
    }
}
