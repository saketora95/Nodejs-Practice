import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Practice
import { HelloworldController } from './helloworld/helloworld.controller';
import { VideoInfoModule } from './features/video-info/video-info.module';

// Redis
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisApiModule } from './redis-api/redis-api.module';

// MariaDB & TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { MariaApiModule } from './maria-api/maria-api.module';
import { FruitPrice } from './maria-api/maria-api.entity';

// Socket
import { SocketGateway } from './socket/socket.gateway';
import { SocketModule } from './socket/socket.module';

// Socket.io Chat Room
import { MessageModule } from './message-event/message.module';

// MQTT
import { MQTTModule } from './mqtt/mqtt.module';
import { MQTTService } from './mqtt/mqtt.service';

@Module({
  imports: [
    VideoInfoModule,

    // Redis
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: "redis",
      port: "6379",
      user: "tora",
      password: "1234",
    }),
    RedisApiModule,

    // MariaDB & TypeORM
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'host.docker.internal',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'mysql',
      entities: [FruitPrice],
      synchronize: true,
    }),
    MariaApiModule,

    // Socket
    SocketModule,

    // Socket.io Chat Room
    MessageModule,

    // MQTT
    MQTTModule,
  ],
  controllers: [AppController, HelloworldController],
  providers: [AppService, MQTTService],
})
export class AppModule {}
