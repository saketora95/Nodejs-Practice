import { Module } from '@nestjs/common';
import { GameCharacterController } from './game-character.controller';
import { GameCharacterService } from './game-character.service';

// 引入相關套件
import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [CacheModule.register({
    isGlobal: true,
  })],
  controllers: [GameCharacterController],
  providers: [GameCharacterService]
})
export class GameCharacterModule {}
