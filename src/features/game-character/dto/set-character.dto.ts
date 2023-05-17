import { ApiProperty } from '@nestjs/swagger';

export class SetChatacterDto {
    @ApiProperty({
        maxLength: 100,
        description: '角色名稱',
    })
    name: string;

    @ApiProperty({
        description: '角色等級',
    })
    level: number;
}