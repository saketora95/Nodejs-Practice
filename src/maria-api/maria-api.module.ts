import { Module } from '@nestjs/common';
import { MariaApiService } from './maria-api.service';
import { MariaApiController } from './maria-api.controller';

// MariaDB & TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { FruitPrice } from './maria-api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FruitPrice])],
  providers: [MariaApiService],
  controllers: [MariaApiController]
})
export class MariaApiModule {}
