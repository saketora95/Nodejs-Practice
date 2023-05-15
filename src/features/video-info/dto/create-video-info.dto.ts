import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoInfoDto {
    @ApiProperty({
        maxLength: 100,
        description: '影片的完整標題',
    })
    title: string;

    @ApiProperty({
        maxLength: 500,
        description: '影片的連結網址',
    })
    link: string;

    @ApiProperty({
        description: '影片的瀏覽次數',
    })
    views: number;
}