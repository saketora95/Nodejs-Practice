import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloworldController } from './helloworld/helloworld.controller';

@Module({
  imports: [],
  controllers: [AppController, HelloworldController],
  providers: [AppService],
})
export class AppModule {}
