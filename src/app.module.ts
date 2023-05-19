import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloworldController } from './helloworld/helloworld.controller';
import { VideoInfoModule } from './features/video-info/video-info.module';
import { RedisApiModule } from './redis-api/redis-api.module';

// 引入相關套件
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    VideoInfoModule,
    // 設置 Redis
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      // 對應於 Redis container 的名字
      host: "redis",
      // 對應於 Redis 使用的 port，預設值為 6379
      port: "6379",
      username: "tora",
      password: "1234",
    }),
    RedisApiModule
  ],
  controllers: [AppController, HelloworldController],
  providers: [AppService],
})
export class AppModule {}
