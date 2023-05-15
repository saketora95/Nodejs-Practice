import { Controller, Get } from '@nestjs/common';

@Controller('helloworld')
export class HelloworldController {
    @Get()
    getHelloWorld() {
        return 'Hello World!';
    }
}
