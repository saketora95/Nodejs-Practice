import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloworldController } from './helloworld/helloworld.controller';
import { VideoInfoModule } from './features/video-info/video-info.module';
import { GameCharacterModule } from './features/game-character/game-character.module';

@Module({
  imports: [VideoInfoModule, GameCharacterModule],
  controllers: [AppController, HelloworldController],
  providers: [AppService],
})
export class AppModule {}
