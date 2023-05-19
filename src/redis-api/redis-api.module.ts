import { Module } from '@nestjs/common';
import { RedisApiController } from './redis-api.controller';
import { RedisApiService } from './redis-api.service';

@Module({
  controllers: [RedisApiController],
  providers: [RedisApiService]
})
export class RedisApiModule {}
