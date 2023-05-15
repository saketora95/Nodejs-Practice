import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloworldController } from './helloworld/helloworld.controller';
import { VideoInfoModule } from './features/video-info/video-info.module';

@Module({
  imports: [VideoInfoModule],
  controllers: [AppController, HelloworldController],
  providers: [AppService],
})
export class AppModule {}
