import { ApiProperty } from '@nestjs/swagger';

export class SetDataDto {
    @ApiProperty({
        maxLength: 100,
        description: 'Redis\' key',
    })
    key: string;

    @ApiProperty({
        maxLength: 100,
        description: 'Redis\' value',
    })
    value: string;
}