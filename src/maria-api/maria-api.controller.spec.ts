import { Test, TestingModule } from '@nestjs/testing';
import { MariaApiController } from './maria-api.controller';

describe('MariaApiController', () => {
  let controller: MariaApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MariaApiController],
    }).compile();

    controller = module.get<MariaApiController>(MariaApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
