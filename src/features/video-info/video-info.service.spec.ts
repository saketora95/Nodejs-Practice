import { Test, TestingModule } from '@nestjs/testing';
import { VideoInfoService } from './video-info.service';

describe('VideoInfoService', () => {
  let service: VideoInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoInfoService],
    }).compile();

    service = module.get<VideoInfoService>(VideoInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
