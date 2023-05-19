import { Test, TestingModule } from '@nestjs/testing';
import { RedisApiController } from './redis-api.controller';

describe('RedisApiController', () => {
  let controller: RedisApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedisApiController],
    }).compile();

    controller = module.get<RedisApiController>(RedisApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
