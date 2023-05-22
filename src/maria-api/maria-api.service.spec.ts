import { Test, TestingModule } from '@nestjs/testing';
import { MariaApiService } from './maria-api.service';

describe('MariaApiService', () => {
  let service: MariaApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MariaApiService],
    }).compile();

    service = module.get<MariaApiService>(MariaApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
