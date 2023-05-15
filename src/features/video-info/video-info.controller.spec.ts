import { Test, TestingModule } from '@nestjs/testing';
import { VideoInfoController } from './video-info.controller';

describe('VideoInfoController', () => {
  let controller: VideoInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoInfoController],
    }).compile();

    controller = module.get<VideoInfoController>(VideoInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
