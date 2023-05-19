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
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: "redis",
      port: "6379",
      // 設置的 user 帳號與密碼
      user: "tora",
      password: "1234",
    }),
    RedisApiModule
  ],
  controllers: [AppController, HelloworldController],
  providers: [AppService],
})
export class AppModule {}
